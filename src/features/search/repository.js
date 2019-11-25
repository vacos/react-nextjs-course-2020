import { fetchAPI } from '@lib/api'

export function getByKeyword(keywords, { token }) {
  return fetchAPI({
    path: `/search/?q=${keywords}&type=album,playlist`,
    token,
  })
}
