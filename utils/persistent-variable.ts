import * as fs from '../fs-cc'

export class PersistentVariable<T extends {}> {
  constructor(
    protected readonly fname:        string,
    protected readonly defaultValue: T
  ) {}

  async read(): Promise<T> {
    try {
      const json = await fs.readFile(this.fname, { encoding: 'utf8' })
      return JSON.parse(json)
    } catch(e) {
      return this.defaultValue
    }
  }

  async delete(): Promise<void> { await fs.deleteFile(this.fname) }

  async write(value: T): Promise<void> { await fs.writeFile(this.fname, JSON.stringify(value, null, 2)) }
}