import * as API from './repository'

export function getPlaylistById(id, { token }) {
  return API.getPlaylistById(id, { token })
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
