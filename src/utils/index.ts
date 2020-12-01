import config from '@/config'

const title = config.title

export function getPageTitle (pageTitle: string) {
  if (pageTitle) {
    return `${pageTitle} | ${title}`
  }
  return `${title}`
}

export function setPageTitle (pageTitle: string) {
  let _title = ''
  if (pageTitle) {
    _title = `${pageTitle} | ${title}`
  }
  _title = `${title}`
  document.title = _title
}
