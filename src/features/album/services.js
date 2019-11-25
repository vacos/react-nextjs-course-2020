import * as API from './repository'

export function getNewReleases({ token, limit }) {
  return API.getNewReleases({ token, limit })
}

export function getAlbumById(id, { token }) {
  return API.getAlbumById(id, { token }).then(album => {
    // return response
    const albumRelease = album.release_date.split('-')
    const tracks = album.tracks.items.map((track, i) => ({
      name: track.name,
      artist: album.name,
      album: album.artists[0].name,
      image: album.images[0].url,
      previewUrl: track.preview_url !== null ? track.preview_url : '',
      durationMs: track.duration_ms,
    }))
    return {
      title: album.name,
      subTitle: album.label,
      bottomLine: `${albumRelease[0]} • ${album.total_tracks} Tracks`,
      image: album.images[0].url,
      tracks: tracks,
    }
  })
}
