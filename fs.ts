import { something, assert } from './base'

function withCache<T>(fn: () => T): () => T {
  let cached: T | undefined = undefined
  return function cacheWrapper() {
    cached = cached === undefined ? fn() : cached
    return cached
  }
}
const nodefs = withCache(() => require('fs'))
const nodepath = withCache(() => require('path'))
const fsextra = withCache(() => require('fs-extra'))
export function promisify(fn: Function): something {
  return function (...args: something[]) {
    return new Promise((resolve: something, reject: something) => {
      fn(...[
        ...args,
        function promisifyCallback(err: something, result: something) { err ? reject(err) : resolve(result) }
      ])
    })
  }
}

class Fs {
  resolve(...paths: string[]): string { return require('path').resolve(...paths) }

  async readDirectory(path: string): Promise<string[]> {
    return (await promisify(nodefs().readdir)(path)).map((name: string) => this.resolve(path, name))
  }

  readFile(path: string): Promise<Buffer>
  readFile(path: string, options: { encoding: BufferEncoding }): Promise<string>
  readFile(path: string, options?: something) { return promisify(nodefs().readFile)(path, options) }

  // Creates parent directory automatically
  async writeFile(
    path:     string,
    data:     something,
    options?: { encoding?: BufferEncoding, flag?: string }
  ): Promise<void> {
    // Creating parent directory for to if it's not exist.
    // Could be speed up by handling exception instead of checking for existance.
    const directory = nodepath().dirname(path)
    if (!(await fs.exists(directory))) await fs.makeDirectory(directory)

    await promisify(nodefs().writeFile)(path, data, options)
  }

  async rename(from: string, to: string, options?: { overwrite: boolean }): Promise<void> {
    // Checking if to file already exist
    if ((await fs.exists(to)) && !(options && options.overwrite)) throw new Error(`file ${to} already exists`)

    // Creating parent directory for to if it's not exist
    const toParentDirectory = nodepath().dirname(to)
    if (!(await fs.exists(toParentDirectory))) await fs.makeDirectory(toParentDirectory)

    await promisify(nodefs().rename)(from, to)
  }

  // Creates parent directory automatically
  async makeDirectory(path: string): Promise<void> {
    // Could be speed up by handling exception instead of checking for existance.
    if ((await fs.exists(path))) return
    await promisify(fsextra().ensureDir)(path)
  }

  async exists(path: string): Promise<boolean> {
    try {
      await promisify(nodefs().stat)(path)
      return true
    } catch (e) {
      return false
    }
  }

  async deleteFile(path: string): Promise<void> {
    // Check for existance is optional, probably could be removed
    if (!(await this.exists(path))) return
    await promisify(nodefs().unlink)(path)
  }

  async deleteDirectory(path: string, options?: { recursive?: boolean }): Promise<void> {
    // Reqursive flag requiret for safety.
    if (!(await this.exists(path))) return
    await promisify(options && options.recursive ? fsextra().remove : nodefs().rmdir)(path)
  }

  async deleteTmpDirectory(path: string): Promise<void> {
    // `tmp` in path required for safety so you don't accidentally delete non temp directory.
    assert(/tmp|temp/i.test(path), `temp directory expected to have tmp or temp term in its path`)
    this.deleteDirectory(path, { recursive: true })
  }
}

export const fs = new Fs()