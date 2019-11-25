import React from 'react'
import ReactPlayer from 'react-player'

import { inject } from '@lib/store'

export default inject('playerStore')(Player)

function Player({ playerStore }) {
  const { url, playing } = playerStore.nowPlaying

  return (
    <ReactPlayer
      css={{ display: 'none' }}
      playing={playing}
      url={url}
      progressInterval={50}
      volume={0.8}
      muted={false}
      onProgress={data => console.log('onProgress', data)}
      onEnded={() => {
        console.log('onEnded')
      }}
    />
  )
}
