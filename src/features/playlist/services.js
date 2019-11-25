import * as API from './repository'

export function getPlaylistById(id, { token }) {
  return API.getPlaylistById(id, { token }).then(playlist => {
    const tracks = playlist.tracks.items.map(({ track }, i) => {
      // console.log('track', track)
      return {
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.artists[0].name,
        image: track.album.images[0].url,
        previewUrl: track.preview_url !== null ? track.preview_url : '',
        durationMs: track.duration_ms,
      }
    })
    return {
      title: playlist.name,
      subTitle: playlist.owner.display_name,
      bottomLine: `${playlist.tracks.total} SONGS`,
      image: playlist.images[0].url,
      tracks: tracks,
    }
  })
}

export function getMyPlaylist({ token }) {
  return API.getMyPlaylist({ token }).then(playlists => {
    const items = playlists.items.map((item, i) => ({
      id: item.id,
      images: item.images,
      name: item.name,
    }))
    return {
      items: items,
    }
  })
}
