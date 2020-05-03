// Safe any -----------------------------------------------------------------------
export type something = any

// Global variables for browser and node ------------------------------------------
let uniglobal: something
declare const window: something
declare const global: something
declare const require: something
declare const process: something
let has_windows = false
try {
  uniglobal = window
  has_windows = true
} catch(e) { uniglobal = global }
export { uniglobal }

const console = uniglobal.console

// Useful constants ---------------------------------------------------------------
export const kb = 1024, mb = 1024 * kb
export const sec = 1000, min = 60 * sec, hour = 60 * min, day = 24 * hour

// environment --------------------------------------------------------------------
export const environment: 'development' | 'production' | 'test' =
  (uniglobal.process && uniglobal.process.env && uniglobal.process.env.environment) ||
  (uniglobal.mono && uniglobal.mono.environment) ||
  'development'
if (!['development', 'production', 'test'].includes(environment)) throw new Error('invalid environment!')

// p ------------------------------------------------------------------------------
function map_to_json_if_defined(v: something) { return v && v.toJSON ? v.toJSON() : v }
let util_inspect = (v: something, options: something): string => {
  try { util_inspect = require('util').inspect } catch(_e) {}

  return util_inspect(v, options)
}
export function p(...args: something): void {
  if (has_windows) console.log(...args)
  else {
    const formatted = args.map((v: something) => {
      v = deep_map(v, map_to_json_if_defined)
      return typeof v == 'object' ? util_inspect(v, { breakLength: 80, colors: true }) : v
    })
    // It won't printed properly for multiple arguments
    args.length == 1 ? console.log(...formatted) : console.log(...args)
  }
}

const fetch = uniglobal.fetch || require('node-fetch')
// util.inspect

// inlineTest ---------------------------------------------------------------------
export interface InlineTest {
  (fn: () => void): void
  run(): void
}

const inline_tests: (() => void)[] = []
export const inline_test = <InlineTest>function(fn) { inline_tests.push(fn) }
inline_test.run = async () => {
  try {
    for(const test of inline_tests) await test()
    log('info', 'inline tests passed')
  } catch(e) {
    log('error', e)
    uniglobal.process && uniglobal.process.exit()
  }
}

const run_inline_tests = (uniglobal.process && uniglobal.process.env &&
  uniglobal.process.env.inline_test) == 'true'
if (run_inline_tests) uniglobal.setTimeout(inline_test.run, 0)

// http_call ----------------------------------------------------------------------
interface HttpCallOptions {
  method?:  'post' | 'get'
  headers?: { [key: string]: string | undefined }
  timeout?: number
}
export async function http_call<T>(url: string, body: unknown = {}, options: HttpCallOptions = {})
: Promise<T> {
  async function call_without_timeout() {
    try {
      const copied_ptions = { ...{ method: 'post' }, ...options }
      delete copied_ptions.timeout
      const fetch = uniglobal.fetch || require('node-fetch')
      if (!fetch) throw new Error('global.fetch not defined')
      const result = await fetch(url, {
        ...copied_ptions,
        body: copied_ptions.method == 'get' ? undefined : JSON.stringify(body)
      })
      if (!result.ok) throw new Error(`can't call ${url} ${result.status} ${result.statusText}`)
      return await result.json()
    } catch (e) {

    }
  }
  return new Promise((resolve, reject) => {
    if (options.timeout)
    uniglobal.setTimeout(() => reject(new Error(`request timed out ${url}`)), options.timeout)
    call_without_timeout().then(resolve, reject)
  })
}

// build_url ----------------------------------------------------------------------
export function build_url(
  url: string, query: { [key: string]: string | number | undefined | null } = {}
): string {
  const querystring: string[] = []
  for (const key in query) {
    const value = query[key]
    if (key !== null && key !== undefined && value !== null && value !== undefined)
      querystring.push(`${encodeURIComponent(key)}=${encodeURIComponent('' + query[key])}`)
  }
  if (querystring.length > 0) return `${url}${url.includes('?') ? '&' : '?'}${querystring.join('&')}`
  else                        return url
}

// sleep --------------------------------------------------------------------------
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => uniglobal.setTimeout(resolve, ms))
}


// assert -------------------------------------------------------------------------
export interface Assert {
  (condition: boolean, message?: string | (() => string)): void
  warn(condition: boolean, message?: string | (() => string)): void
  equal(a: unknown, b: unknown, message?: string | (() => string)): void
}
export const assert = <Assert>function(condition, message): void {
  const message_string = message ? (message instanceof Function ? message() : message) : 'Assertion error!'
  if (!condition) throw new Error(message_string)
}
assert.warn = (condition, message) => { if (!condition) log('warn', message || 'Assertion error!') }
assert.equal = (a, b, message) => {
  if (!is_equal(a, b)) {
    const message_string = message ? (message instanceof Function ? message() : message) :
      `Assertion error: ${stable_json_stringify(a, true)} != ${stable_json_stringify(b, true)}`
    throw new Error(message_string)
  }
}

// deep_clone_and_sort ------------------------------------------------------------
// Clone object with object properties sorted, including for nested objects
export function deep_clone_and_sort(obj: something): something {
  if      (obj === null || typeof obj !== 'object') return obj
  else if (Array.isArray(obj))                      return obj.map(deep_clone_and_sort)
  else if ('toJSON' in obj)                         return deep_clone_and_sort(obj.toJSON())
  else                                              return Object.assign({},
      ...Object.entries(obj)
        .sort(([key_a], [key_b]) => key_a.localeCompare(key_b))
        .map(([k, v]) => ({ [k]: deep_clone_and_sort(v) })
    ))
}

// stable_json_stringify ----------------------------------------------------------
// https://stackoverflow.com/questions/42491226/is-json-stringify-deterministic-in-v8
export function stable_json_stringify(obj: unknown, pretty = false): string {
  return pretty ? JSON.stringify(deep_clone_and_sort(obj), null, 2) : JSON.stringify(deep_clone_and_sort(obj))
}

// is_equal -----------------------------------------------------------------------
export function is_equal(a: unknown, b: unknown): boolean {
  return stable_json_stringify(a) === stable_json_stringify(b)
}

// deep_map -----------------------------------------------------------------------
export function deep_map(obj: something, map: (o: something) => something): something {
  obj = map(obj)
  if      (obj === null || typeof obj !== 'object') return obj
  else if ('map' in obj)                            return obj.map((v: something) => deep_map(v, map))
  else                                              return Object.assign({},
      ...Object.entries(obj)
        .map(([k, v]) => ({ [k]: deep_map(v, map) })
    ))
}
inline_test(() => {
  class Wrapper<T> {
    constructor(readonly v: T) {}
    toJSON() { return this.v }
  }
  const a = new Wrapper([1, 2])
  assert.equal(deep_map(a, map_to_json_if_defined), [1, 2])

  const a_l2 = new Wrapper([a, 3])
  assert.equal(deep_map(a_l2, map_to_json_if_defined), [[1, 2], 3])
})

// md5 ----------------------------------------------------------------------------
let md5: (s: string) => string
try {
  const { createHash } = require('crypto')
  md5 = (data: string) => createHash('md5').update(data).digest('hex')
} catch(e) { md5 = () => { throw new Error("md5 not implemented") } }
export { md5 }

// log ----------------------------------------------------------------------------
export const debug_enabled = (uniglobal.process && uniglobal.process.env && uniglobal.process.env.debug) == 'true'
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'
// export interface Log {
//   (message: string, short?: something, detailed?: something): void
//   (level: LogLevel, message: string, short?: something, detailed?: something): void
// }

function pad0(v: string | number) { return v.toString().length < 2 ? '0' + v : v }
export function get_formatted_time(time: number, withSeconds = true) {
  let date = new Date(time)
  // year = date.getFullYear()
  return `${pad0(date.getMonth() + 1)}/${pad0(date.getDate())} `
  + `${pad0(date.getHours())}:${pad0(date.getMinutes())}${withSeconds ? ':' + pad0(date.getSeconds()) : ''}`
}

// function pad(v: string, n: number) { return v.substring(0, n).padEnd(n) }

export let inspect: (o: something) => string
try {
  const util = require('util')
  inspect = (o) => util.inspect(o, { depth: null, breakLength: Infinity }).replace(/^'|'$/g, '')
} catch(e) { inspect = (o) => JSON.stringify(o) }

const level_replacements: { [key: string]: string } =
  { debug: 'debug', info: '     ', warn: 'warn ', error: 'error' }

const log_format = has_windows ? ((o: something) => o) : (o: something) => {
  if (o === null || o === undefined || typeof o == 'string' || typeof o == 'number') return o
  return stable_json_stringify(o)
}

// Some errors may contain additional properties with huge data, stripping it
const log_clean_error = (error: Error) => {
  const clean = new Error(error.message)
  clean.stack = error.stack
  return clean
}

function log(message: string, short?: something, detailed?: something): string
function log(
  level: LogLevel, message: string, short?: something, detailed?: something
): string
function log(...args: something[]): string {
  const level = ['info', 'warn', 'error', 'debug'].includes(args[0]) ? args.shift() : 'info'
  if (level == 'debug' && !debug_enabled) return ''
  const [message, short, detailed] = args

  return environment == 'development' ?
    log_in_development(level, message, short, detailed) :
    log_not_in_development(level, message, short, detailed)
}
export { log }

function log_in_development(
  level: LogLevel, message: string, short?: something, detailed?: something
): string {
  let buff: something[] = [level_replacements[level]]
  buff.push(message)

  let error: Error | undefined = undefined
  if (short !== null && short !== undefined) {
    if (short instanceof Error) error = log_clean_error(short)
    else                        buff.push(log_format(short))
  }

  if (detailed !== null && detailed !== undefined) {
    if (detailed instanceof Error) error = log_clean_error(detailed)
    else                           buff.push(log_format(detailed))
  }

  // buff = buff.map((v: something) => deep_map(v, map_to_json_if_defined))

  // Generating id
  let id = ''
  if (level != 'info') {
    id = md5(stable_json_stringify(arguments)).substr(0, 6)
    buff.push(id)
  }

  console[level](...buff)

  // Printing error separately in development
  if (error) {
    const clean_error = ensure_error(error)
    clean_error.stack = clean_stack(error.stack || '')
    console.log('')
    console.error(clean_error)
    console.log('')
  }
  return id
}

function log_not_in_development(
  level: LogLevel, message: string, short?: something, detailed?: something
): string {
  let buff: something[] = [level_replacements[level]]

  buff.push(get_formatted_time(Date.now()))
  buff.push(message)

  if (short !== null && short !== undefined)
    buff.push(log_format(short instanceof Error ? log_clean_error(short) : short))

  if (detailed !== null && detailed !== undefined)
    buff.push(log_format(short instanceof Error ? log_clean_error(detailed) : detailed))

  // Generating id
  let id = ''
  if (level != 'info') {
    id = md5(stable_json_stringify(arguments)).substr(0, 6)
    buff.push(id)
  }

  // Printing
  console[level](...buff)
  return id
}


// export function logWithUser(
//   level: LogLevel, user: string, message: string, short?: something, detailed?: something
// ): string { return log(level, `${pad(user, 8)} ${message}`, short, detailed) }

// Timer
export function timer(): () => number {
  const start = Date.now()
  return function(){ return Date.now() - start }
}

// clean_stack --------------------------------------------------------------------
export let clean_stack: (stack: string) => string
{
  const stack_skip_re = new RegExp([
    '/node_modules/',
    'internal/(modules|bootstrap|process)',
    'at new Promise \\(<anonymous>\\)',
    'at Object.next \\(',
    'at step \\(',
    'at __awaiter \\(',
    'at Object.exports.assert \\('
  ].join('|'))
  clean_stack = (stack) => {
    const lines = stack
      .split("\n")
      .filter((line) => {
        return !stack_skip_re.test(line)
      })
      .map((line, i) =>
        i == 0 ? line : line.replace(/([^\/]*).*(\/[^\/]+\/[^\/]+\/[^\/]+)/, (_match, s1, s2) => s1 + '...' + s2)
      )
    return lines.join("\n")
  }
}

uniglobal.process && uniglobal.process.on('uncaughtException', function(error: something) {
  error.stack = clean_stack(error.stack)
  console.log('')
  console.error(error)
  process.exit()
})

// Promise ------------------------------------------------------------------------
export function once<F extends Function>(f: F): F {
  let called = false, result: something = undefined
  return function (this: something) {
    if (called) return result
    result = f.apply(this, arguments)
    called = true
  } as something
}

// Promise ------------------------------------------------------------------------
// For better logging, by default promise would be logged as `{}`
;(Promise.prototype as something).toJSON = function() { return 'Promise' }
Object.defineProperty(Promise.prototype, "cmap", { configurable: false, enumerable: false })





















// --------------------------------------------------------------------------------
// Extensions ---------------------------------------------------------------------
// --------------------------------------------------------------------------------


type Predicate<V, K> = (value: V, key: K) => boolean

// type OMap<T> = { [key: string]: T }


// length -------------------------------------------------------------------------
export function length<T>(o: Array<T> | { [key: string]: T } | String | string): number {
  if (o instanceof Array)                               return o.length
  else if (o instanceof String || typeof o == 'string') return o.length
  else {
    let i = 0
    for (const k in o) if (o.hasOwnProperty(k)) i++
    return i
  }
}


// is_empty -----------------------------------------------------------------------
export function is_empty<T>(o: Array<T> | { [key: string]: T } | String | string): boolean {
  return length(o) == 0
}


// take ---------------------------------------------------------------------------
function take<T>(s: string, n: number): string
function take<T>(list: Array<T>, n: number): Array<T>
function take<T>(list: string | Array<T>, n: number) {
  return list.slice(0, n)
}
export { take }


// last ---------------------------------------------------------------------------
export function last<T>(list: Array<T>): T
export function last<T>(list: Array<T>, n: number): T[]
export function last<T>(list: Array<T>, n?: number) {
  if (n === undefined) {
    if (list.length < 1) throw new Error(`can't get last elements from empty list`)
    return list[list.length - 1]
  } else {
    if (list.length < n) throw new Error(`can't get last ${n} elements from list of length ${list.length}`)
    else return list.slice(list.length - n, list.length)
  }
}


// each ---------------------------------------------------------------------------
function each<T>(list: T[], f: (v: T, i: number) => void): void
function each<K, V>(map: Map<K, V>, f: (v: V, k: K) => void): void
function each<M extends {}, K extends keyof M>(map: M, f: (v: M[K], k: K) => void): void
function each<T>(o: T[] | { [key: string]: T }, f: (v: T, i: something) => void): void {
  if      (o instanceof Array) for(let i = 0; i < o.length; i++) f(o[i], i)
  else if (o instanceof Map)   for(const [k, v] of o) f(v, k)
  else                         for(const k in o) if (o.hasOwnProperty(k)) f(o[k], k)
}
export { each }


// find ---------------------------------------------------------------------------
function find<T>(list: T[], v: T): T | undefined
function find<T>(list: T[], f: (v: T, i: number) => boolean): T | undefined
function find<T>(map: { [key: string]: T }, f: (v: T, k: string) => boolean): T | undefined
function find<T>(o: T[] | { [key: string]: T }, finder: T | ((v: T, i: something) => boolean)): T | undefined {
  const predicate = finder instanceof Function ? finder : (v: T) => v == finder
  if (o instanceof Array) for(let i = 0; i < o.length; i++) if (predicate(o[i], i)) return o[i]
  else                    for(const k in o) if (o.hasOwnProperty(k)) if (predicate(o[k], k)) return o[k]
  return undefined
}
export { find }

// has ----------------------------------------------------------------------------
function has<T>(list: T[], v: T): boolean
function has<T>(list: T[], f: (v: T, i: number) => boolean): boolean
function has<T>(map: { [key: string]: T }, f: (v: T, k: string) => boolean): boolean
function has(o: something, finder: something): boolean { return !!find(o, finder) }
export { has }


// partition ----------------------------------------------------------------------
function partition<T>(list: Array<T>, f: Predicate<T, number>): [Array<T>, Array<T>]
function partition<T>(list: Array<T>, keys: number[]): [Array<T>, Array<T>]
function partition<M extends {}, K extends keyof M>(map: M, f: Predicate<M[keyof M], keyof M>): [M, M]
function partition<M extends {}, K extends keyof M>(map: M, keys: (keyof M)[]): [Pick<M, K>, Exclude<M, K>]
function partition(o: something, splitter: something) {
  if (o instanceof Array) {
    const selected = new Array(), rejected = new Array()
    const f = splitter instanceof Function ? splitter : (_v: something, i: something) => splitter.includes(i)
    each(o, (v, i) => f(v, i) ? selected.push(v) : rejected.push(v))
    return [selected, rejected]
  } else {
    const selected = {} as something, rejected = {} as something
    const f = splitter instanceof Function ? splitter : (_v: something, k: something) => splitter.includes(k)
    each(o, (v, k) => f(v, k) ? selected[k] = v : rejected[k] = v)
    return [selected, rejected]
  }
}
export { partition }


// sort ---------------------------------------------------------------------------
function sort(list: string[], comparator?: (a: string, b: string) => number): string[]
function sort(list: number[], comparator?: (a: number, b: number) => number): number[]
function sort<V>(list: V[], comparator?: (a: V, b: V) => number): V[] {
  if (list.length == 0) return list
  else {
    if (comparator) {
      list = [...list]
      list.sort(comparator)
      return list
    } else {
      if      (typeof list[0] == 'number')
        comparator = function(a: number, b: number) { return a - b } as something
      else if (typeof list[0] == 'string')
        comparator = function(a: string, b: string) { return a.localeCompare(b) } as something
      else
        throw new Error(`the 'comparator' required to sort a list of non numbers or strings`)

      list = [...list]
      list.sort(comparator)
      return list
    }
  }
}
export { sort }


// sort_by -------------------------------------------------------------------------------
function sort_by<V>(list: V[], by: (v: V) => string): V[]
function sort_by<V>(list: V[], by: (v: V) => number): V[]
function sort_by<V>(list: V[], by: (v: V) => string | number): V[] {
  if (list.length == 0) return list
  else {
    let comparator: (a: V, b: V) => number
    if      (typeof by(list[0]) == 'number')
      comparator = function(a, b) { return (by(a) as number) - (by(b) as number) }
    else if (typeof by(list[0]) == 'string')
      comparator = function(a, b) { return (by(a) as string).localeCompare(by(b) as string) }
    else
      throw new Error(`invalid return type for 'by'`)

    list = [...list]
    list.sort(comparator)
    return list
  }
}
export { sort_by }


// map_with_rank -------------------------------------------------------------------------
// Attach to every element its rank in the ordered list, ordered according to `order_by` function.
export function map_with_rank<V, R>(list: V[], order_by: (v: V) => number, map: (v: V, rank: number) => R): R[] {
  // Sorting accourding to rank
  const list_with_index = list.map((v, i) => ({ v, original_i: i, order_by: order_by(v) }))
  const sorted = sort_by(list_with_index, ({ order_by }) => order_by)

  // Adding rank, if values returned by `order_by` are the same, the rank also the same
  const sorted_with_rank: { v: V, original_i: number, order_by: number, rank: number }[] = []
  let rank = 0
  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i]
    if (i > 0 && current.order_by != sorted[i - 1].order_by) rank++
    sorted_with_rank.push({ ...current, rank })
  }

  // Restoring original order and mapping
  const original_with_rank = sort_by(sorted_with_rank, ({ original_i }) => original_i)
  return original_with_rank.map(({ v, rank }) => map(v, rank))
}
inline_test(() => {
  assert.equal(
    map_with_rank(
      [ 4,        2,        3,        4,        5,        7,        5], (v) => v, (v, r) => [v, r]
    ),
    [ [ 4, 2 ], [ 2, 0 ], [ 3, 1 ], [ 4, 2 ], [ 5, 3 ], [ 7, 4 ], [ 5, 3 ] ]
  )
})


// select -------------------------------------------------------------------------
function select<T>(list: Array<T>, f: Predicate<T, number>): Array<T>
function select<T>(list: Array<T>, keys: number[]): Array<T>
function select<T>(map: { [key: string]: T }, f: Predicate<T, string>): { [key: string]: T }
function select<T>(map: { [key: string]: T }, keys: string[]): { [key: string]: T }
function select(o: something, f: something) { return partition(o, f)[0] }
export { select }


// reject -------------------------------------------------------------------------
function reject<T>(list: Array<T>, f: Predicate<T, number>): Array<T>
function reject<T>(list: Array<T>, keys: number[]): Array<T>
function reject<T>(map: { [key: string]: T }, f: Predicate<T, string>): { [key: string]: T }
function reject<T>(map: { [key: string]: T }, keys: string[]): { [key: string]: T }
function reject(o: something, f: something) { return partition(o, f)[1] }
export { reject }

// uniq ---------------------------------------------------------------------------
export function uniq<V, Key>(list: Array<V>, to_key?: (v: V) => Key): Array<V> {
  const set = new Set<something>()
  const _to_key = to_key || ((v: V) => v)
  return list.filter((v) => {
    const key = _to_key(v)
    if (set.has(key)) return false
    else {
      set.add(key)
      return true
    }
  })
}

// // pick ---------------------------------------------------------------------------
// function pick<T>(list: Array<T>, keys: number[]): Array<T>
// function pick<T extends {}, K extends keyof T>(map: T, k: K[]): Pick<T, K>
// function pick(o: something, keys: (string | number)[]) {
//   return partition(o, (i: something) => keys.includes(i))[0]
// }
// export { pick }


// remove -------------------------------------------------------------------------
// function remove<V>(list: Array<V>, i: number): V | undefined
// function remove<V>(list: Array<V>, f: Predicate<V, number>): Array<V>
// function remove<V, K>(map: Map<K, V>, k: K): V | undefined
// function remove<V, K>(map: Map<K, V>, f: Predicate<V, K>): Map<K, V>
// function remove<V, K>(o: Array<V> | Map<K, V>, f: something) {
//   if (o instanceof Array) {
//     if (f instanceof Function) {
//       const [deleted, remained] = partition(o, f)
//       o.splice(0, remained.length, ...remained)
//       return deleted
//     } else {
//       if (f >= o.length) return undefined
//       const v = o[f]
//       o.splice(f, 1)
//       return v
//     }
//   } else {
//     if (f instanceof Function) {
//       const [deleted] = partition(o, f)
//       each(deleted, (_v, k) => delete o[k])
//       return deleted
//     } else {
//       if (!o.hasOwnProperty(f)) return undefined
//       const v = o[f]
//       delete o[f]
//       return v
//     }
//   }
// }
// export { remove }


// reduce -------------------------------------------------------------------------
function reduce<A, V>(list: V[], accumulator: A, f: (accumulator: A, v: V, key: number) => A): A
function reduce<A, V, K>(map: Map<K, V>, accumulator: A, f: (accumulator: A, v: V, key: number) => A): A
function reduce<A, V>(map: { [key: string]: V }, accumulator: A, f: (accumulator: A, v: V, key: string) => A): A
function reduce<A, V>(
  o: something, accumulator: A, f: (accumulator: A, v: V, key: something) => A
) {
  each(o as something, (v: something, i) => accumulator = f(accumulator, v, i))
  return accumulator
}
export { reduce }


// keys ---------------------------------------------------------------------------
function keys<V>(list: Array<V>): number[]
function keys<V, K>(map: Map<K, V>): K[]
// Adding `& string` because otherwise it would infer the type as `(string | number)[]`
// see https://stackoverflow.com/questions/51808160/keyof-inferring-string-number-when-key-is-only-a-string
function keys<T, O extends { [key: string]: T }>(map: O): (keyof O & string)[]
function keys<T>(o: something) {
  return reduce(o, [], (list: something, _v, k: something) => { list.push(k); return list })
}
export { keys }


// values -------------------------------------------------------------------------
function values<T>(list: Array<T>): T[]
function values<T>(map: { [key: string]: T }): T[]
function values(o: something) {
  return reduce(o, [], (list: something, v) => { list.push(v); return list })
}
export { values }

// map ----------------------------------------------------------------------------
// function map<T, R>(list: T[], f: (v: T, i: number) => R): R[]
// function map<M extends {}, K extends keyof M, R>(map: M, f: (v: M[K], k: K) => R): { [key in K]: R }
// function map<T, R>(o: T[] | { [key: string]: T }, f: (v: T, k: something) => R) {
//   if (o instanceof Array) return o.map(f)
//   else {
//     const mapped = {} as something
//     each(o, (v, k) => mapped[k] = f(v, k))
//     return mapped
//   }
// }
// export { map }
function map<V, R>(list: V[], f: (v: V, i: number) => R): R[]
function map<K, V, R>(map: Map<K, V>, f: (v: V, k: K) => R): Map<K, R>
function map<M extends {}, K extends keyof M, R>(map: M, f: (v: M[K], k: K) => R): { [key in K]: R }
function map<K, V, R>(o: something, f: (v: V, k: something) => R) {
  if        (o instanceof Array) {
    return o.map(f)
  } else if (o instanceof Map) {
    const mapped = new Map<K, R>()
    each(o, (v, k) => mapped.set(k, f(v, k)))
    return mapped
  } else {
    const mapped = {} as something
    each(o, (v: something, k) => mapped[k] = f(v, k))
    return mapped
  }
}
export { map }


// round --------------------------------------------------------------------------
export function round(v: number, digits: number = 0): number {
  return digits == 0 ? Math.round(v) : Math.round(v * Math.pow(10, digits)) / Math.pow(10, digits)
}


// shuffle ------------------------------------------------------------------------
export function shuffle<T>(list: T[], seed?: number | string): T[] {
  const random = seed !== undefined ? seedrandom(seed) : () => Math.random()
  list = [...list]
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]]
  }
  return list
}


// debounce -----------------------------------------------------------------------
export function debounce<F extends ((...args: something[]) => void)>(fn: F, timeout: number): F {
  let timer: something = undefined
  return ((...args: something[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), timeout)
  }) as F
}

// seedrandom ---------------------------------------------------------------------
let seedrandom: (seed: number | string) => (() => number)
{
  let seedrandom_lib: something = undefined
  seedrandom = (seed) => {
    // Code for proper random generator is not simple, the library needed
    if (seedrandom_lib === undefined) seedrandom_lib = require('seedrandom')
    return seedrandom_lib('' + seed)
  }
}
export { seedrandom }


// CustomError --------------------------------------------------------------------
export class CustomError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}


// NeverError ---------------------------------------------------------------------
export class NeverError extends Error {
  constructor(message: never) { super(`NeverError: ${message}`) }
}


// ensure_error -------------------------------------------------------------------
export function ensure_error(error: something, default_message = "Unknown error"): Error {
  if (error && (typeof error == 'object') && (error instanceof Error)) {
    if (!error.message) error.message = default_message
    return error
  } else {
    return new Error('' + (error || default_message))
  }
  // return '' + ((error && (typeof error == 'object') && error.message) || default_message)
}


// Error.toJSON -------------------------------------------------------------------
// Otherwise JSON will be empty `{}`
;(Error.prototype as something).toJSON = function(this: something) {
  return { message: this.message, stack: this.stack }
}

// Map.toJSON ---------------------------------------------------------------------
// Otherwise JSON will be empty `{}`
;(Map.prototype  as something).toJSON = function(this: something) {
  return reduce(this, {}, (map: something, v, k) => { map[k] = v; return map })
}


// Test ---------------------------------------------------------------------------
export async function test(title: string, fn: () => Promise<void> | void): Promise<void> {
  try       { await fn() }
  catch (e) {
    log('error', title)
    throw e
  }
}