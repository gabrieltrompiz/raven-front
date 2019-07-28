export const getDate = (time: number) => {
  const date = new Date(time)
  const minutes = date.getHours() > 12 ? date.getMinutes() + ' PM' : date.getMinutes() + ' AM'
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
  return hours + ':' + minutes
}