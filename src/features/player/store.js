import { observable, action } from 'mobx'
import { convertSecondsToMinutes } from '@features/player/utilities'
export default class PlayerStore {
  @observable
  nowPlaying = {
    playing: false,
    title: 'Loyal (feat. Drake)',
    subTitle: 'PARTYNEXTDOOR',
    image: 'https://i.scdn.co/image/ace9f6f3986fb0eb0d5cddca5f11c0ee3df38675',
    url:
      'https://p.scdn.co/mp3-preview/9cd34e105748351edc7aa6deb0e05b3d6ffd4c7f?cid=749acd814ecc4422be3cb0f4b526d957',
  }

  @observable
  isPlaying = false

  @observable
  progressBar = {
    timeElapsed: '0:00',
    progress: 0.2,
    duration: '0:30',
  }

  @observable
  listsQueue = []

  @action
  play(track) {
    const { previewUrl, name, artist, image } = track

    this.nowPlaying.playing = true
    this.nowPlaying.title = name
    this.nowPlaying.subTitle = artist
    this.nowPlaying.image = image
    this.nowPlaying.url = previewUrl
    this.isPlaying = true
    // console.log('Now Playing:', this.nowPlaying.title)
  }

  @action
  togglePlaying() {
    this.isPlaying = !this.isPlaying
    this.nowPlaying.playing = this.isPlaying
  }

  @action
  onPlayProgressBar({ playedSeconds, played }) {
    this.progressBar.timeElapsed = convertSecondsToMinutes(playedSeconds)
    this.progressBar.progress = played
  }

  @action
  onAddQueue(track) {
    console.log('addQueue', track)
    let isAdd = true

    this.listsQueue.forEach(list => {
      if (list.previewUrl === track.previewUrl) {
        isAdd = false
      }
    })

    let newItem = [track]
    if (isAdd) {
      this.listsQueue = this.listsQueue.concat(newItem)
    }
  }
}
