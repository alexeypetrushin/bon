import { something, md5, hour, stable_json_stringify } from '../base'
import * as fs from '../fs'
import { MultiMap } from '../multi_map'

// cache_fn ------------------------------------------------------------------------------
// Functino should have simple arguments like string, number, boolean
export function cache_fn<Fn extends Function>(fn: Fn): Fn {
  const cache = new MultiMap<something, something>()
  let no_args_cashe: something = undefined
  return ((...args: something[]) => {
    if (args.length == 0) {
      if (!no_args_cashe) no_args_cashe = fn()
      return no_args_cashe
    } else {
      let value = cache.get(args)
      if (!value) {
        value = fn(...args)
        cache.set(args, value)
      }
      return value
    }
  }) as something
}


// cache_fs ------------------------------------------------------------------------------
interface CacheData { value: something, timestamp: number }
export function cache_fs<Fn extends Function>(key: string, fn: Fn, options: {
  cache_path:  string
  expiration?: number
}) {
  let value: something = undefined
  return ((...args: something[]) => {
    if (value === undefined) {
      const expiration = options.expiration || 1 * hour
      const path = fs.resolve(options.cache_path, 'cache', key + '_' + md5(stable_json_stringify(args)))

      // Reading value from file if exists
      if (fs.exists_sync(path)) {
        const data: CacheData = JSON.parse(fs.read_file_sync(path, { encoding: 'utf8' }))
        if ((data.timestamp + expiration) > Date.now()) value = data.value
      }

      // If value doesn't exists on fs - calculating and saving
      if (!value) {
        value = fn(...args)
        const data: CacheData = { value, timestamp: Date.now() }

        // Writing without waiting for success
        fs.write_file(path, JSON.stringify(data))
      }
    }
    return value
  }) as something
}