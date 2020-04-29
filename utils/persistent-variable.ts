import * as fs from '../fs'
import { stable_json_stringify } from '../base'

export class PersistentVariable<T extends {}> {
  constructor(
    protected readonly fname:         string,
    protected readonly default_value: () => T
  ) {}

  async read(): Promise<T> {
    try {
      const json = await fs.read_file(this.fname, { encoding: 'utf8' })
      return JSON.parse(json)
    } catch(e) {
      // A new default value should be created every time, because
      // otherwise equality would fail `changed_value == await variable.read()`
      return this.default_value()
    }
  }

  async delete(): Promise<void> { await fs.delete_file(this.fname) }

  async write(value: T): Promise<void> { await fs.write_file(this.fname, stable_json_stringify(value, true)) }
}