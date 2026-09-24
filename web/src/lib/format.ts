export function shortenAddress(address: string) {
  if (address.length <= 10) return address
  return `${address.slice(0, 4)}…${address.slice(-4)}`
}

export function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value < 0.01 ? 8 : 2,
  }).format(value)
}

export function formatAmount(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(value)
}

export function formatCompactUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

export function formatChange(value: number) {
  const sign = value > 0 ? "+" : ""
  return `${sign}${value.toFixed(2)}%`
}
