export function median(values: number[]): number {
  if (values.length == 0 ) return 0
  values = [...values]
  values.sort(function(a, b) { return a-b })
  const half = Math.floor(values.length / 2)
  if (values.length % 2) return values[half]
  else                   return (values[half - 1] + values[half]) / 2.0
}

export function round(v: number, decimals: number) {
  if (decimals != 2) throw new Error(`round not supported`)
  return Math.round((v + Number.EPSILON) * 100) / 100
}