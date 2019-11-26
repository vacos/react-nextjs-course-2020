import React from 'react'
import { Flex, Box } from '@grid'
import { inject } from '@lib/store'

export default inject('playerStore')(ProgressBar)

ProgressBar.defaultProps = {
  timeElapsed: '0:00',
  progress: 0,
  duration: '0:30',
}

function ProgressBar({ playerStore }) {
  return (
    <Flex
      justifyContent="space-between"
      css={{
        background: 'transparent',
        height: '20px',
        alignItems: 'center',
      }}>
      <Box css={{ fontSize: '0.7em', padding: '10px' }}>
        {playerStore.progressBar.timeElapsed}
      </Box>
      <Box
        css={{
          flex: 1,
          height: '4px',
          '&:hover input[type="range"]::-webkit-slider-thumb': {
            visibility: 'visible',
          },
        }}>
        <div css={{ position: 'relative' }}>
          <progress
            css={{
              appearance: 'none',
              position: 'absolute',
              width: '100%',
              height: '4px',
              zIndex: '-1',
              '&::-webkit-progress-bar': {
                borderRadius: '5px',
              },
              '&::-webkit-progress-value': {
                borderRadius: '5px',
              },
            }}
            value={playerStore.progressBar.progress}
            max={1}
          />
          <input
            css={{
              appearance: 'none',
              position: 'absolute',
              width: '100%',
              height: '4px',
              outline: 'none',
              background: 'transparent',
              '&::-webkit-slider-thumb': {
                visibility: 'hidden',
              },
            }}
            type="range"
            min={0}
            max={1}
            step="any"
            value={playerStore.progressBar.progress}
            onClick={() => {}}
            onMouseDown={() => {}}
            onChange={() => {}}
            onMouseUp={() => {}}
          />
        </div>
      </Box>
      <Box css={{ fontSize: '0.7em', padding: '10px' }}>
        {playerStore.progressBar.duration}
      </Box>
    </Flex>
  )
}
