import { something, assert } from './base'
import * as nodefs from 'fs'
import * as nodepath from 'path'
import * as fsextra from 'fs-extra'
import { promisify } from 'util'

export type EntryType = 'directory' | 'file' | 'link'

export function resolve(...paths: string[]): string { return require('path').resolve(...paths) }

export async function readDirectory(path: string, type?: EntryType): Promise<string[]> {
  const list = (await promisify(nodefs.readdir)(path)).map((name: string) => resolve(path, name))
  if (!type) return list

  const filtered = []
  for (const path of list) if ((await getType(path)) == type) filtered.push(path)
  return filtered
}

function readFile(path: string): Promise<Buffer>
function readFile(path: string, options: { encoding: BufferEncoding }): Promise<string>
function readFile(path: string, options?: something) {
  return promisify(nodefs.readFile)(path, options) as something
}
export { readFile }

// Creates parent directory automatically
export async function writeFile(
  path:     string,
  data:     something,
  options?: { encoding?: BufferEncoding, flag?: string }
): Promise<void> {
  // Creating parent directory for to if it's not exist.
  // Could be speed up by handling exception instead of checking for existance.
  const directory = nodepath.dirname(path)
  if (!(await exists(directory))) await makeDirectory(directory)
  options = { ...options }
  options.encoding = options.encoding || 'utf8'

  await promisify(nodefs.writeFile)(path, data, options)
}

export async function rename(from: string, to: string, options?: { overwrite: boolean }): Promise<void> {
  // Checking if to file already exist
  if ((await exists(to)) && !(options && options.overwrite)) throw new Error(`file ${to} already exists`)

  // Creating parent directory for to if it's not exist
  const toParentDirectory = nodepath.dirname(to)
  if (!(await exists(toParentDirectory))) await makeDirectory(toParentDirectory)

  await promisify(nodefs.rename)(from, to)
}

// Creates parent directory automatically
export async function makeDirectory(path: string): Promise<void> {
  // Could be speed up by handling exception instead of checking for existance.
  if ((await exists(path))) return
  await (promisify(fsextra.ensureDir) as something)(path)
}

export async function exists(path: string): Promise<boolean> {
  try {
    await promisify(nodefs.stat)(path)
    return true
  } catch (e) {
    return false
  }
}

export async function deleteFile(path: string): Promise<void> {
  // Check for existance is optional, probably could be removed
  if (!(await exists(path))) return
  await promisify(nodefs.unlink)(path)
}

export async function deleteDirectory(path: string, options?: { recursive?: boolean }): Promise<void> {
  // Reqursive flag requiret for safety.
  if (!(await exists(path))) return
  await promisify(options && options.recursive ? fsextra.remove : nodefs.rmdir)(path)
}

export async function deleteTmpDirectory(path: string): Promise<void> {
  // `tmp` in path required for safety so you don't accidentally delete non temp directory.
  assert(/tmp|temp/i.test(path), `temp directory expected to have tmp or temp term in its path`)
  deleteDirectory(path, { recursive: true })
}

export async function getType(path: string): Promise<EntryType> {
  const stat = await promisify(nodefs.lstat)(path)
  if      (stat.isFile())         return 'file'
  else if (stat.isDirectory())    return 'directory'
  else if (stat.isSymbolicLink()) return 'link'
  else                            throw new Error(`unknown fs entry type for '${path}'`)
}