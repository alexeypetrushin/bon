export class Hash {
    constructor(collection, to_key) {
        this.length = 0;
        this._map = new Map();
        if (collection) {
            if (Array.isArray(collection)) {
                if (to_key) {
                    const list = collection;
                    for (let i = 0; i < list.length; i++)
                        this._map.set(to_key(list[i]), list[i]);
                }
                else {
                    const list = collection;
                    for (let i = 0; i < list.length; i++)
                        this._map.set(list[i][0], list[i][1]);
                }
            }
            else {
                for (const k in collection)
                    this._map.set(k, collection[k]);
            }
        }
    }
    has(k) { return this._map.has(k); }
    get(k, dv) {
        let v = this._map.get(k);
        if (v !== undefined)
            return v;
        if (dv !== undefined) {
            v = typeof dv == 'function' ? dv(k) : dv;
            this._map.set(k, v);
            return v;
        }
        return undefined;
    }
    ensure_get(k) {
        const v = this._map.get(k);
        if (v === undefined)
            throw new Error(`map expected to have key '${k}'`);
        return v;
    }
    set(k, v) {
        this._map.set(k, v);
        this.length = this._map.size;
    }
    delete(k) {
        const v = this.get(k);
        this._map.delete(k);
        this.length = this._map.size;
        return v;
    }
    each(f) { this._map.forEach(f); }
    map(f) {
        const r = new Hash();
        this.each((v, k) => r.set(k, f(v, k)));
        return r;
    }
    entries() { return Array.from(this._map); }
    keys() { return Array.from(this._map.keys()); }
    values() { return Array.from(this._map.values()); }
    toJSON() { return this._map.toJSON(); }
}
//# sourceMappingURL=map.js.map