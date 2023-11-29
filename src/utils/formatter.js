import currency from 'currency.js'
import dayjs from 'dayjs';
export const moneyFormatter = (value, option = {}) => {
  return currency(
    value || 0,
    { separator: ',',  precision: 2, ...option }
  )
  .format()
  .replace('$', '')
}

export const dateFormatter = (date, format = 'YYYY/MM/DD') => {
  return dayjs(date).format(format)
}