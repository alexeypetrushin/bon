type SimpleTypes = number | string | boolean

export class Map<V, K extends SimpleTypes = string> {
  public  readonly length = 0
  private readonly _map = new global.Map<K, V>()


  has(k: K): boolean { return this._map.has(k) }


  get(k: K): V | undefined
  get(k: K, dv: V): V
  get(k: K, dv: (k: K) => V): V
  get(k: K, dv?: V | ((k: K) => V)): V | undefined {
    let v = this._map.get(k)
    if (v !== undefined) return v

    if (dv !== undefined) {
      v = typeof dv == 'function' ? (dv as (k: K) => V)(k) : dv
      this._map.set(k, v)
      return v
    }

    return undefined
  }


  set(k: K, v: V): void {
    this._map.set(k, v)
    ;(<{ length: number }>this).length = this._map.size
  }


  delete(k: K): V | undefined {
    const v = this.get(k)
    this._map.delete(k)
    ;(<{ length: number }>this).length = this._map.size
    return v
  }


  each(f: (v: V, k: K) => void): void { this._map.forEach(f) }


  map<R>(f: (v: V, k: K) => R): Map<R, K> {
    const r = new Map<R, K>()
    this.each((v, k) => r.set(k, f(v, k)))
    return r
  }


  entries(): [K, V][] { return Array.from(this._map) }


  keys(): K[] { return Array.from(this._map.keys()) }


  values(): V[] { return Array.from(this._map.values()) }
}