import Autolinker from 'autolinker'

const autoLinker = new Autolinker()

const secondPerMinute = 60
const secondPerHour = secondPerMinute * 60
const secondPerDay = secondPerHour * 24
const secondPerMonth = secondPerDay * 30
const secondPerYear = secondPerDay * 365

export default {
  getGenderColor(user) {
    if (Number(user.level) === 999) {
      return '#f1c40f'
    }
    return user.gender === 'M' ? '#3498db' : '#e74c3c'
  },
  getRelativeTime(timestamp) {
    const current = Math.floor(Date.now() / 1000)

    const elapsed = current - timestamp

    if (elapsed < secondPerMinute) {
      return '剛剛'
    } else if (elapsed < secondPerHour) {
      return `${Math.round(elapsed / secondPerMinute)} 分鐘前`
    } else if (elapsed < secondPerDay) {
      return `${Math.round(elapsed / secondPerHour)} 小時前`
    } else if (elapsed < secondPerMonth) {
      return `${Math.round(elapsed / secondPerDay)} 日前`
    } else if (elapsed < secondPerYear) {
      return `${Math.round(elapsed / secondPerMonth)} 個月前`
    }

    return `${Math.round(elapsed / secondPerYear)} 年前`
  },
  parseMessage(html) {
    return autoLinker.link(html)
  },
}
