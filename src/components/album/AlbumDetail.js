import React from 'react'
import { Flex, Box } from '@grid'
import withPage from '@lib/page/withPage'
import { useMember } from '@lib/auth'
import { useRouter } from 'next/router'

import DetailPageHeader from '@components/_common/DetailPageHeader'
import SongList from '@common/SongList'

import { Fetch } from '@lib/api'
import * as AlbumListService from '@features/album/services'

AlbumDetailPage.defaultProps = {
  data: {
    title: 'KILL THIS LOVE',
    subTitle: 'BLACKPINK',
    bottomLine: '2019 • 5 Tracks',
    image: 'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
    tracks: [
      {
        name: 'Kill This Love',
        artist: 'BLACKPINK',
        album: 'KILL THIS LOVE',
        image:
          'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
        previewUrl:
          'https://p.scdn.co/mp3-preview/554bf24c1e0cccc09000c6fce75f08d30dc91967?cid=e4abb1ea8fdf4926a463960abd146fcb',
        durationMs: 189052,
      },
      {
        name: "Don't Know What To Do",
        artist: 'BLACKPINK',
        album: 'KILL THIS LOVE',
        image:
          'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
        previewUrl:
          'https://p.scdn.co/mp3-preview/9303f5daa53b082b9b09a78925fcbde3ad6668dc?cid=e4abb1ea8fdf4926a463960abd146fcb',
        durationMs: 201081,
      },
      {
        name: 'DDU-DU DDU-DU (Remix)',
        artist: 'BLACKPINK',
        album: 'KILL THIS LOVE',
        image:
          'https://i.scdn.co/image/ab67616d0000b273adf560d7d93b65c10b58ccda',
        previewUrl:
          'https://p.scdn.co/mp3-preview/05cc17469ea45e8d928251e472e85c22226d60da?cid=e4abb1ea8fdf4926a463960abd146fcb',
        durationMs: 201225,
      },
    ],
  },
}

function AlbumDetailPage({ data }) {
  const { token } = useMember()
  const {
    query: { id },
  } = useRouter()

  if (token === null) {
    return null
  }

  return (
    <Fetch
      service={() =>
        AlbumListService.getAlbumById(id, {
          token: token,
        })
      }>
      {({ data }) => (
        <Flex flexWrap="wrap" css={{ padding: '60px 120px' }}>
          <Box width={1 / 3}>
            <DetailPageHeader data={data} />
          </Box>
          <Box width={2 / 3}>
            <SongList tracks={data.tracks} />
          </Box>
        </Flex>
      )}
    </Fetch>
  )
}

export default withPage()(AlbumDetailPage)
