import { something, assert } from './base'
import * as nodefs from 'fs'
import * as nodepath from 'path'
import * as fsextra from 'fs-extra'
import { promisify } from 'util'

export type EntryType = 'directory' | 'file' | 'link'

export function resolve(...paths: string[]): string { return require('path').resolve(...paths) }

export async function read_directory(path: string, type?: EntryType): Promise<string[]> {
  const list = (await promisify(nodefs.readdir)(path)).map((name: string) => resolve(path, name))
  if (!type) return list

  const filtered = []
  for (const path of list) if ((await get_type(path)) == type) filtered.push(path)
  return filtered
}

function read_file(path: string): Promise<Buffer>
function read_file(path: string, options: { encoding: BufferEncoding }): Promise<string>
function read_file(path: string, options?: something) {
  return promisify(nodefs.readFile)(path, options) as something
}
export { read_file }

// Creates parent directory automatically
export async function write_file(
  path:     string,
  data:     something,
  options?: { encoding?: BufferEncoding, flag?: string }
): Promise<void> {
  // Creating parent directory for to if it's not exist.
  // Could be speed up by handling exception instead of checking for existance.
  const directory = nodepath.dirname(path)
  if (!(await exists(directory))) await make_directory(directory)
  options = { ...options }
  options.encoding = options.encoding || 'utf8'

  await promisify(nodefs.writeFile)(path, data, options)
}

export async function read_json<T = something>(path: string): Promise<T> {
  return JSON.parse(await read_file(path, { encoding: 'utf8' }))
}

export async function write_json<T>(path: string, data: T): Promise<void> {
  await write_file(path, JSON.stringify(data), { encoding: 'utf8' })
}

export async function rename(from: string, to: string, options?: { overwrite: boolean }): Promise<void> {
  // Checking if to file already exist
  if ((await exists(to)) && !(options && options.overwrite)) throw new Error(`file ${to} already exists`)

  // Creating parent directory for to if it's not exist
  const to_parent_directory = nodepath.dirname(to)
  if (!(await exists(to_parent_directory))) await make_directory(to_parent_directory)

  await promisify(nodefs.rename)(from, to)
}

// Creates parent directory automatically
export async function make_directory(path: string): Promise<void> {
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

export async function delete_file(path: string): Promise<void> {
  // Check for existance is optional, probably could be removed
  if (!(await exists(path))) return
  await promisify(nodefs.unlink)(path)
}

export async function delete_directory(path: string, options?: { recursive?: boolean }): Promise<void> {
  // Reqursive flag requiret for safety.
  if (!(await exists(path))) return
  await promisify(options && options.recursive ? fsextra.remove : nodefs.rmdir)(path)
}

export async function delete_tmp_directory(path: string): Promise<void> {
  // `tmp` in path required for safety so you don't accidentally delete non temp directory.
  assert(/tmp|temp/i.test(path), `temp directory expected to have tmp or temp term in its path`)
  delete_directory(path, { recursive: true })
}

export async function get_type(path: string): Promise<EntryType> {
  const stat = await promisify(nodefs.lstat)(path)
  if      (stat.isFile())         return 'file'
  else if (stat.isDirectory())    return 'directory'
  else if (stat.isSymbolicLink()) return 'link'
  else                            throw new Error(`unknown fs entry type for '${path}'`)
}