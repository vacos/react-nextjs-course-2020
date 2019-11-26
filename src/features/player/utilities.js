export function convertSecondsToMinutes(totalSeconds = 0) {
  totalSeconds = Math.round(totalSeconds)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const addLeadingZero = number => `${number <= 9 ? '0' : ''}${number}`

  return `${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`
}
