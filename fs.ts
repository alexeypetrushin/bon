import { something, assert, p, ensure_error } from './base'
import * as nodefs from 'fs'
import * as nodepath from 'path'
import * as fsextra from 'fs-extra'
import { promisify } from 'util'
import * as os from 'os'

export type EntryType = 'directory' | 'file' | 'link'
export type Entry = { type: EntryType, name: string }


// resolve -------------------------------------------------------------------------------
export function resolve(...paths: string[]): string { return require('path').resolve(...paths) }


// read_directory ------------------------------------------------------------------------
export async function read_directory(path: string, filter?: (entry: Entry) => boolean): Promise<Entry[]> {
  const names = (await promisify(nodefs.readdir)(path))
  const entries: Entry[] = []
  for (const name of names) entries.push({ type: await get_type(resolve(path, name)), name })
  return filter ? entries.filter(filter) : entries
}


// read_file -----------------------------------------------------------------------------
function read_file(path: string): Promise<Buffer>
function read_file(path: string, options: { encoding: BufferEncoding }): Promise<string>
async function read_file(path: string, options?: something) {
  try {
    return await promisify(nodefs.readFile)(path, options) as something
  } catch (e) {
    // Because node.js error doesn't have stack trace
    throw new Error(`can't read file '${path}' because of '${ensure_error(e).message}'`)
  }
}
export { read_file }


// read_file_sync ------------------------------------------------------------------------
function read_file_sync(path: string): Buffer
function read_file_sync(path: string, options: { encoding: BufferEncoding }): string
function read_file_sync(path: string, options?: something) {
  try {
    return nodefs.readFileSync(path, options) as something
  } catch (e) {
    // Because node.js error doesn't have stack trace
    throw new Error(`can't read file '${path}' because of '${ensure_error(e).message}'`)
  }
}
export { read_file_sync }


// write_file ----------------------------------------------------------------------------
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

export async function write_file_sync(
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

// Creates parent directory automatically
export async function append_to_file(
  path:     string,
  data:     something,
  options?: { encoding?: BufferEncoding, mode?: number }
): Promise<void> {
  // Creating parent directory for to if it's not exist.
  // Could be speed up by handling exception instead of checking for existance.
  const directory = nodepath.dirname(path)
  if (!(await exists(directory))) await make_directory(directory)
  options = { ...options }
  options.encoding = options.encoding || 'utf8'
  await promisify(nodefs.appendFile)(path, data, options)
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
export async function copy_file(
  from: string,
  to:   something
): Promise<void> {
  // Creating parent directory for to if it's not exist.
  // Could be speed up by handling exception instead of checking for existance.
  const directory = nodepath.dirname(to)
  if (!(await exists(directory))) await make_directory(directory)
  await promisify(nodefs.copyFile)(from, to)
}

// Creates parent directory automatically
export async function copy_directory(
  from: string,
  to:   something
): Promise<void> {
  const entries = await read_directory(from)
  for (const { type, name } of entries) {
    if      (type == 'file')      await copy_file(resolve(from, name), resolve(to, name))
    else if (type == 'directory') await copy_directory(resolve(from, name), resolve(to, name))
    else                          throw new Error(`unsupported entry type '${type}'`)
  }
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

export function exists_sync(path: string): boolean {
  try {
    nodefs.statSync(path)
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
  try {
    await promisify(options && options.recursive ? fsextra.remove : nodefs.rmdir)(path)
  } catch (e) {
    // Because node fs errors doesn't have stack trace information
    // https://stackoverflow.com/questions/61155350/why-theres-no-stack-trace-in-node-fs-rmdir-error
    throw new Error(`can't delete directory '${path}' because of '${ensure_error(e).message}'`)
  }
}

export function is_tmp_directory(path: string): boolean {
  return /tmp|temp/i.test(path.toLowerCase())
}
export const not_tmp_directory_message = `temp directory expected to have 'tmp' or 'temp' term in its path`

export async function delete_tmp_directory(path: string): Promise<void> {
  // `t` in path required for safety so you don't accidentally delete non temp directory.
  assert(is_tmp_directory(path), not_tmp_directory_message)
  delete_directory(path, { recursive: true })
}

export function create_tmp_directory(prefix: string): string {
  // return promisify(nodefs.mkdtemp)(nodepath.join(os.tmpdir(), prefix))
  return nodepath.join(os.tmpdir(), prefix)
}


export async function get_type(path: string): Promise<EntryType> {
  const stat = await promisify(nodefs.lstat)(path)
  if      (stat.isFile())         return 'file'
  else if (stat.isDirectory())    return 'directory'
  else if (stat.isSymbolicLink()) return 'link'
  else                            throw new Error(`unknown fs entry type for '${path}'`)
}