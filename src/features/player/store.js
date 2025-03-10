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
    nowPlaying: false,
  }

  @observable
  nowMusicOnQueue = 0

  @observable
  playAutoInQueue = false

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
  play(track, isQ, key, nextPlay) {
    if (key !== 'undefined' && this.playAutoInQueue === false) {
      this.playAutoInQueue = false
    }

    if (nextPlay === 'undefined' && this.playAutoInQueue === false) {
      this.playAutoInQueue = true
    }

    // console.log('playAutoInQueue', this.playAutoInQueue)

    if (!isQ) {
      this.listsQueue = []
      this.nowMusicOnQueue = 0
    } else {
      if (this.playAutoInQueue) {
        if (nextPlay) {
          this.nowMusicOnQueue = nextPlay
        } else {
          this.nowMusicOnQueue = key
        }
      } else {
        this.nowMusicOnQueue = key
      }
    }

    // console.log(key, this.nowMusicOnQueue)

    const { previewUrl, name, artist, image, durationMs } = track

    this.onAddQueue(track)

    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artist
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl
    this.nowPlaying.durationMs = durationMs
    this.progressBar.duration = '0:30'
    this.nowPlaying.nowPlaying = true
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
  onPlayEnded() {
    const nextPlay = this.nowMusicOnQueue + 1
    this.controllPlay(nextPlay)
  }

  @action
  onForward() {
    const nextPlay = this.nowMusicOnQueue + 1
    this.controllPlay(nextPlay, true)
  }

  @action
  onBackward() {
    const nextPlay = this.nowMusicOnQueue - 1
    if (nextPlay >= 0) {
      this.controllPlay(nextPlay, true)
    }
  }

  controllPlay(nextPlay, isClick = false) {
    const lengthOfList = this.listsQueue.length

    if (nextPlay < lengthOfList) {
      this.playAutoInQueue = true
      this.play(this.listsQueue[nextPlay], true, true, nextPlay)
    } else {
      if (!isClick) this.isPlaying = false
    }
  }
}
