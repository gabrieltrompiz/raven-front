export const getTime = (time: number) => {
  const date = new Date(time)
  const minutes = date.getHours() > 12 ? date.getMinutes() + ' PM' : date.getMinutes() + ' AM'
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
  return hours + ':' + minutes
}

export const getDate = (time: number) => {
  const date = new Date(time)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const current = new Date(Date.now())
  const completeDate = months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
  const diff = diffDays(current, date)
  if(diff === 0) { return 'Today' } 
  else if(diff === 1) { return 'Yesterday' }
  else if(diff < 7) { return days[date.getDay()] }
  else { return completeDate }
}

export const diffDays = (date1: Date, date2: Date) => {
  const oneDay = 24 * 60 * 60 * 1000
  return Math.round(Math.abs((date1.getTime() - date2.getTime()) / oneDay))
}