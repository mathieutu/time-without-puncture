import 'tailwindcss/tailwind.css'

const PUNCTURE_DATE = new Date('2023-05-21T22:00:00')
const PUNCTURE_START = new Date('2021-09-22T18:00:00')
const PUNCTURE_TIMES = 3

const join = (arr) => {
  const filteredArray = arr.filter(Boolean)
  const last = filteredArray.pop();

  return `${filteredArray.join(', <br>')},<br>and ${last}.`;
}

const showTime = (time, unit) => {
  if (!time) return;

  return `${time} ${unit}${time > 1 ? 's' : ''}`
}

const getDistanceMessage = (date) => {
  const now = new Date().getTime();

  const distance = now - date.getTime();

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);


  return join([
    showTime(days, 'day'),
    showTime(hours, 'hour'),
    showTime(minutes, 'minute'),
    showTime(seconds, 'second'),
  ])
}

const punctureStartFormatted = `since the ${PUNCTURE_START.toLocaleString('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})}`

const punctureMessage = PUNCTURE_TIMES
  ? `Already ${PUNCTURE_TIMES} puncture${PUNCTURE_TIMES > 1 ? 's' : ''} ${punctureStartFormatted}... 😓`
  : `No puncture ${punctureStartFormatted}! 🎉`


document.querySelector('#puncture-times').innerHTML = punctureMessage

setInterval(() => {
  document.querySelector('#puncture-delay').innerHTML = getDistanceMessage(PUNCTURE_DATE)
  document.body.style = ''
}, 1000)