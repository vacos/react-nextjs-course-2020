import React from 'react'
import ReactPlayer from 'react-player'

import { inject } from '@lib/store'

export default inject('playerStore')(Player)

function Player({ playerStore }) {
  const { url } = playerStore.nowPlaying

  return (
    <ReactPlayer
      css={{ display: 'none' }}
      playing={playerStore.isPlaying}
      url={url}
      progressInterval={50}
      volume={0.8}
      muted={false}
      onProgress={data => playerStore.onPlayProgressBar(data)}
      onEnded={() => {
        playerStore.onPlayEnded()
      }}
    />
  )
}
