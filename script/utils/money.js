export function formmatCurrency(priceCents){
  return (Math.round(priceCents/100)).toFixed(2)
}