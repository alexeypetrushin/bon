import { assert, inline_test, sort_by, p } from './base'


// median --------------------------------------------------------------------------------
export function median(values: number[], is_sorted = false): number {
  return quantile(values, .5, is_sorted)
  // if (values.length == 0 ) return 0
  // values = [...values]
  // values.sort(function(a, b) { return a-b })
  // const half = Math.floor(values.length / 2)
  // if (values.length % 2) return values[half]
  // else                   return (values[half - 1] + values[half]) / 2.0
}


// mean ----------------------------------------------------------------------------------
export function mean(values: number[]): number {
  let sum = 0
  for (const v of values) sum += v
  return sum / values.length
}


// quantile ------------------------------------------------------------------------------
export function quantile(values: number[], q: number, is_sorted = false): number {
  const sorted = is_sorted ? values : [...values].sort((a, b) => a - b)
  const pos = (sorted.length - 1) * q
  const base = Math.floor(pos)
  const rest = pos - base
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base])
  } else {
    return sorted[base]
  }
}


// min_max_norm --------------------------------------------------------------------------
export function min_max_norm(values: number[], min: number, max: number): number[] {
  return values.map((v) => (v - min) / (max - min))
}


// map_with_rank -------------------------------------------------------------------------
// Attach to every element its rank in the ordered list, ordered according to `order_by` function.
export function map_with_rank<V, R>(list: V[], order_by: (v: V) => number, map: (v: V, rank: number) => R): R[] {
  // Sorting accourding to rank
  const list_with_index = list.map((v, i) => ({ v, original_i: i, order_by: order_by(v) }))
  const sorted = sort_by(list_with_index, ({ order_by }) => order_by)

  // Adding rank, if values returned by `order_by` are the same, the rank also the same
  const sorted_with_rank: { v: V, original_i: number, order_by: number, rank: number }[] = []
  let rank = 1
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
    [ [ 4, 3 ], [ 2, 1 ], [ 3, 2 ], [ 4, 3 ], [ 5, 4 ], [ 7, 5 ], [ 5, 4 ] ]
  )
})