import * as API from './repository'

export function getByKeyword(keyword, { token }) {
  if (keyword === '') {
    return []
  }
  return API.getByKeyword(keyword, { token }).then(data => {
    return {
      albums: data.albums.items.map((playlist, i) => {
        return {
          id: playlist.id,
          name: playlist.name,
          images: playlist.images,
        }
      }),
      playlists: data.playlists.items.map((playlist, i) => {
        return {
          id: playlist.id,
          name: playlist.name,
          images: playlist.images,
        }
      }),
    }
  })
}
