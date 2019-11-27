import { observable, action } from 'mobx'
import { convertSecondsToMinutes } from '@features/player/utilities'
export default class PlayerStore {
  @observable
  nowPlaying = {
    title: '',
    subTitle: '',
    image: '',
    url: '',
    durationMs: 0,
  }

  @observable
  isPlaying = false

  @observable
  progressBar = {
    timeElapsed: '0:00',
    progress: 0,
    duration: '0:00',
  }

  @observable
  listsQueue = []

  @action
  play(track) {
    const { previewUrl, name, artist, image, durationMs } = track

    this.onAddQueue(track)

    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artist
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl
    this.nowPlaying.durationMs = durationMs

    this.isPlaying = true
    // console.log('Now Playing:', this.nowPlaying.title)
  }

  @action
  togglePlaying() {
    if (this.listsQueue.length > 0) this.isPlaying = !this.isPlaying
  }

  @action
  onPlayProgressBar({ playedSeconds, played }) {
    this.progressBar.timeElapsed = convertSecondsToMinutes(playedSeconds)
    this.progressBar.progress = played
  }

  @action
  onAddQueue(track) {
    let isAdd = true

    this.listsQueue.forEach(list => {
      if (list.previewUrl === track.previewUrl) {
        isAdd = false
      }
    })

    const newItem = [track]
    if (isAdd) {
      this.listsQueue = this.listsQueue.concat(newItem)
    }
  }

  @action
  onPlayEnded() {}
}
