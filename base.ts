// Safe any -----------------------------------------------------------------------
export type something = any

// Global variables for browser and node ------------------------------------------
let uniglobal: something
declare const window: something
declare const global: something
declare const require: something
declare const process: something
try { uniglobal = window } catch(e) { uniglobal = global }
export { uniglobal }

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
function mapToJsonIfDefined(v: something) { return v && v.toJSON ? v.toJSON() : v }
export function p(...args: something): void {
  console.log(...args.map((v: something) => deepMap(v, mapToJsonIfDefined)))
}

// inlineTest ---------------------------------------------------------------------
export interface InlineTest {
  (fn: () => void): void
  run(): void
}

const inlineTests: (() => void)[] = []
export const inlineTest = <InlineTest>function(fn) { inlineTests.push(fn) }
inlineTest.run = async () => {
  try {
    for(const test of inlineTests) await test()
    log('info', 'inline tests passed')
  } catch(e) {
    console.error(e)
    uniglobal.process && uniglobal.process.exit()
  }
}

// let runInlineTestsAutomatically = environment == 'development'
// uniglobal.setTimeout(() => { if (runInlineTestsAutomatically) inlineTest.run() }, 0)

// Call to avoid auto testing
// export function dontRunInlineTestsAutomatically() { runInlineTestsAutomatically = false }

// httpCall -----------------------------------------------------------------------
interface HttpCallOptions {
  method?:  'post' | 'get'
  headers?: { [key: string]: string | undefined }
  timeout?: number
}
export async function httpCall<T>(url: string, body: unknown = {}, options: HttpCallOptions = {})
: Promise<T> {
  async function callWithoutTimeout() {
    const copiedOptions = { ...{ method: 'post' }, ...options }
    delete copiedOptions.timeout
    const fetch = uniglobal.fetch || require('node-fetch')
    if (!fetch) throw new Error('global.fetch not defined')
    const result = await fetch(url, {
      ...copiedOptions,
      body: copiedOptions.method == 'get' ? undefined : JSON.stringify(body)
    })
    if (!result.ok) throw new Error(`can't call ${url} ${result.status} ${result.statusText}`)
    return await result.json()
  }
  return new Promise((resolve, reject) => {
    if (options.timeout)
    uniglobal.setTimeout(() => reject(new Error(`request timed out ${url}`)), options.timeout)
    callWithoutTimeout().then(resolve, reject)
  })
}

// buildUrl -----------------------------------------------------------------------
export function buildUrl(
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
  const messageString = message ? (message instanceof Function ? message() : message) : 'Assertion error!'
  if (!condition) throw new Error(messageString)
}
assert.warn = (condition, message) => { if (!condition) console.warn(message || 'Assertion error!') }
assert.equal = (a, b, message) => {
  if (!isEqual(a, b)) {
    const messageString = message ? (message instanceof Function ? message() : message) :
      `Assertion error: ${stableJsonStringify(a)} != ${stableJsonStringify(b)}`
    throw new Error(messageString)
  }
}

// deepCloneAndSort ---------------------------------------------------------------
// Clone object with object properties sorted, including for nested objects
export function deepCloneAndSort(obj: something): something {
  if      (obj === null || typeof obj !== 'object') return obj
  else if (Array.isArray(obj))                      return obj.map(deepCloneAndSort)
  else if ('toJSON' in obj)                         return deepCloneAndSort(obj.toJSON())
  else                                              return Object.assign({},
      ...Object.entries(obj)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([k, v]) => ({ [k]: deepCloneAndSort(v) })
    ))
}

// stableJsonStringify ------------------------------------------------------------
// https://stackoverflow.com/questions/42491226/is-json-stringify-deterministic-in-v8
export function stableJsonStringify(obj: unknown): string { return JSON.stringify(deepCloneAndSort(obj)) }

// isEqual ------------------------------------------------------------------------
export function isEqual(a: unknown, b: unknown): boolean {
  return stableJsonStringify(a) === stableJsonStringify(b)
}

// deepMap ------------------------------------------------------------------------
export function deepMap(obj: something, map: (o: something) => something): something {
  obj = map(obj)
  if      (obj === null || typeof obj !== 'object') return obj
  else if ('map' in obj)                            return obj.map((v: something) => deepMap(v, map))
  else                                              return Object.assign({},
      ...Object.entries(obj)
        .map(([k, v]) => ({ [k]: deepMap(v, map) })
    ))
}
inlineTest(() => {
  class Wrapper<T> {
    constructor(readonly v: T) {}
    toJSON() { return this.v }
  }
  const a = new Wrapper([1, 2])
  assert.equal(deepMap(a, mapToJsonIfDefined), [1, 2])

  const aL2 = new Wrapper([a, 3])
  assert.equal(deepMap(aL2, mapToJsonIfDefined), [[1, 2], 3])
})

// md5 ----------------------------------------------------------------------------
let md5: (s: string) => string
try {
  const { createHash } = require('crypto')
  md5 = (data: string) => createHash('md5').update(data).digest('hex')
} catch(e) { md5 = () => { throw new Error("md5 not implemented") } }
export { md5 }

// log ----------------------------------------------------------------------------
export const debugEnabled = (uniglobal.process && uniglobal.process.env && uniglobal.process.env.debug) == 'true'
export type ErrorLevel = 'debug' | 'info' | 'warn' | 'error'
export interface Log {
  (message: string, short?: something, detailed?: something): void
  (level: ErrorLevel, message: string, short?: something, detailed?: something): void
}

function pad0(v: string | number) { return v.toString().length < 2 ? '0' + v : v }
export function getFormattedTime(time: number, withSeconds = true) {
  let date = new Date(time)
  // year = date.getFullYear()
  return `${pad0(date.getMonth() + 1)}/${pad0(date.getDate())} `
  + `${pad0(date.getHours())}:${pad0(date.getMinutes())}${withSeconds ? ':' + pad0(date.getSeconds()) : ''}`
}

function pad(v: string, n: number) { return v.substring(0, n).padEnd(n) }

export let inspect: (o: something) => void
try {
  const util = require('util')
  inspect = (o) => util.inspect(o, { depth: null, breakLength: Infinity }).replace(/^'|'$/g, '')
} catch(e) { inspect = (o) => o }

const levelReplacements: { [key: string]: string } =
  { debug: 'debug', info: '     ', warn: 'warn ', error: 'error' }
function errorToData(error: something) { return { message: error.message, stack: cleanStack(error.stack || '') } }

// function log(user: string, message: string, short?: something, detailed?: something): string
function log(
  level: ErrorLevel, message: string, short?: something, detailed?: something
): string
function log(...args: something[]): string {
  const level = ['info', 'warn', 'error', 'debug'].includes(args[0]) ? args.shift() : 'info'
  if (level == 'debug' && !debugEnabled) return ''

  let [message, short, detailed] = args
  // user = user || ''
  let buff: something[] = [levelReplacements[level]]

  // buff.push(pad(user, 8))

  if (environment != 'development') buff.push(getFormattedTime(Date.now()))
  buff.push(message)

  // Handling errors
  let error: something = null
  if (short instanceof Error) {
    error = short
    if (environment != 'development') buff.push(inspect(errorToData(error)))
  } else if (short !== null && short !== undefined) buff.push(inspect(short))

  if (detailed instanceof Error) {
    error = detailed
    if (environment != 'development') buff.push(inspect(errorToData(error)))
  } else
    if (detailed !== null && detailed !== undefined && environment != 'development') buff.push(inspect(detailed))

  buff = buff.map((v: something) => deepMap(v, mapToJsonIfDefined))

  // Adding full username in production
  // if (environment != 'development') buff.push(user)

  // Generating id
  let id = ''
  if (level != 'info') {
    id = md5(stableJsonStringify(args)).substr(0, 6)
    buff.push(id)
  }

  // Printing
  ;(uniglobal.console as something)[level].apply(uniglobal.console, buff)

  // Printing error in development
  if (environment == 'development' && error) {
    const cleanError = new Error(error.message)
    cleanError.stack = cleanStack(error.stack || '')
    console.log('')
    console.error(cleanError)
    console.log('')
  }
  return id
}
export { log }

export function logWithUser(
  level: ErrorLevel, user: string, message: string, short?: something, detailed?: something
): string { return log(level, `${pad(user, 8)} ${message}`, short, detailed) }

// Timer
export function timer(): () => number {
  const start = Date.now()
  return function(){ return Date.now() - start }
}

// cleanStack ---------------------------------------------------------------------
export let cleanStack: (stack: string) => string
{
  const stackSkipRe = new RegExp([
    '/node_modules/',
    'internal/(modules|bootstrap|process)',
    'at new Promise \\(<anonymous>\\)',
    'at Object.next \\(',
    'at step \\(',
    'at __awaiter \\(',
    'at Object.exports.assert \\('
  ].join('|'))
  cleanStack = (stack) => {
    const lines = stack
      .split("\n")
      .filter((line) => {
        return !stackSkipRe.test(line)
      })
      .map((line, i) =>
        i == 0 ? line : line.replace(/([^\/]*).*(\/[^\/]+\/[^\/]+\/[^\/]+)/, (_match, s1, s2) => s1 + '...' + s2)
      )
    return lines.join("\n")
  }
}

uniglobal.process && uniglobal.process.on('uncaughtException', function(error: something) {
  error.stack = cleanStack(error.stack)
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

type OMap<T> = { [key: string]: T }


// length -------------------------------------------------------------------------
export function length<T>(o: Array<T> | OMap<T> | String | string): number {
  if (o instanceof Array)                               return o.length
  else if (o instanceof String || typeof o == 'string') return o.length
  else {
    let i = 0
    for (const k in o) if (o.hasOwnProperty(k)) i++
    return i
  }
}


// isEmpty ------------------------------------------------------------------------
export function isEmpty<T>(o: Array<T> | OMap<T> | String | string): boolean { return length(o) == 0 }


// take ---------------------------------------------------------------------------
export function take<T>(list: Array<T>, n: number) { return list.slice(0, n) }


// last ---------------------------------------------------------------------------
export function last<T>(list: Array<T>) {
  if (list.length == 0) throw new Error("can't get last on empty list")
  else return list[list.length - 1]
}


// each ---------------------------------------------------------------------------
function each<T>(list: T[], f: (v: T, i: number) => void): void
function each<M extends {}, K extends keyof M>(map: M, f: (v: M[K], k: K) => void): void
function each<T>(o: T[] | OMap<T>, f: (v: T, i: something) => void): void {
  if (o instanceof Array) for(let i = 0; i < o.length; i++) f(o[i], i)
  else                    for(const k in o) if (o.hasOwnProperty(k)) f(o[k], k)
}
export { each }


// partition ----------------------------------------------------------------------
function partition<T>(list: Array<T>, f: Predicate<T, number>): [Array<T>, Array<T>]
function partition<T>(list: Array<T>, keys: number[]): [Array<T>, Array<T>]
function partition<M extends {}, K extends keyof M>(map: M, f: Predicate<M[keyof M], keyof M>): [M, M]
function partition<M extends {}, K extends keyof M>(map: M, keys: (keyof M)[]): [Pick<M, K>, Exclude<M, K>]
function partition(o: something, fOrList: something) {
  if (o instanceof Array) {
    const selected = new Array(), rejected = new Array()
    const f = fOrList instanceof Function ? fOrList : (_v: something, i: something) => fOrList.includes(i)
    each(o, (v, i) => f(v, i) ? selected.push(v) : rejected.push(v))
    return [selected, rejected]
  } else {
    const selected = {} as something, rejected = {} as something
    const f = fOrList instanceof Function ? fOrList : (_v: something, k: something) => fOrList.includes(k)
    each(o, (v, k) => f(v, k) ? selected[k] = v : rejected[k] = v)
    return [selected, rejected]
  }
}
export { partition }


// select -------------------------------------------------------------------------
function select<T>(list: Array<T>, f: Predicate<T, number>): Array<T>
function select<T>(list: Array<T>, keys: number[]): Array<T>
function select<M extends {}>(map: M, f: Predicate<M[keyof M], keyof M>): M
function select<M extends {}, K extends keyof M>(map: M, keys: (keyof M)[]): Pick<M, K>
function select(o: something, f: something) { return partition(o, f)[0] }
export { select }


// uniq ---------------------------------------------------------------------------
export function uniq<T>(list: Array<T>): Array<T> { return list.filter((v, i, a) => a.indexOf(v) === i) }

// // pick ---------------------------------------------------------------------------
// function pick<T>(list: Array<T>, keys: number[]): Array<T>
// function pick<T extends {}, K extends keyof T>(map: T, k: K[]): Pick<T, K>
// function pick(o: something, keys: (string | number)[]) {
//   return partition(o, (i: something) => keys.includes(i))[0]
// }
// export { pick }


// remove -------------------------------------------------------------------------
function remove<T>(list: Array<T>, i: number): T | undefined
function remove<T>(list: Array<T>, f: Predicate<T, number>): Array<T>
function remove<T>(map: OMap<T>, i: string): T | undefined
function remove<T>(map: OMap<T>, f: Predicate<T, string>): OMap<T>
function remove<T>(o: Array<T> | OMap<T>, f: something) {
  if (o instanceof Array) {
    if (f instanceof Function) {
      const [deleted, remained] = partition(o, f)
      o.splice(0, remained.length, ...remained)
      return deleted
    } else {
      if (f >= o.length) return undefined
      const v = o[f]
      o.splice(f, 1)
      return v
    }
  } else {
    if (f instanceof Function) {
      const [deleted] = partition(o, f)
      each(deleted, (_v, k) => delete o[k])
      return deleted
    } else {
      if (!o.hasOwnProperty(f)) return undefined
      const v = o[f]
      delete o[f]
      return v
    }
  }
}
export { remove }


// reduce -------------------------------------------------------------------------
function reduce<A, T>(list: T[], accumulator: A, f: (accumulator: A, v: T, key: number) => A): A
function reduce<A, T>(map: OMap<T>, accumulator: A, f: (accumulator: A, v: T, key: string) => A): A
function reduce<A, T>(o: T[] | OMap<T>, accumulator: A, f: (accumulator: A, v: T, key: something) => A) {
  each(o as something, (v: something, i) => accumulator = f(accumulator, v, i))
  return accumulator
}
export { reduce }


// keys ---------------------------------------------------------------------------
function keys<T>(list: Array<T>): number[]
function keys<T, O extends OMap<T>>(map: O): (keyof O)[]
function keys<T>(o: something) {
  return reduce(o, [], (list: something, _v, k: something) => { list.push(k); return list })
}
export { keys }


// map ----------------------------------------------------------------------------
function map<T, R>(list: T[], f: (v: T, i: number) => R): R[]
function map<M extends {}, K extends keyof M, R>(map: M, f: (v: M[K], k: K) => R): { [key in K]: R }
function map<T, R>(o: T[] | OMap<T>, f: (v: T, k: something) => R) {
  if (o instanceof Array) return o.map(f)
  else {
    const mapped = {} as something
    each(o, (v, k) => mapped[k] = f(v, k))
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


// seedrandom ---------------------------------------------------------------------
let seedrandom: (seed: number | string) => (() => number)
{
  let seedrandomLib: something = undefined
  seedrandom = (seed) => {
    // Code for proper random generator is not simple, the library needed
    if (seedrandomLib === undefined) seedrandomLib = require('seedrandom')
    return seedrandomLib('' + seed)
  }
}
export { seedrandom }