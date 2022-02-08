export function truncate(str, no_words) {
  return str.split(' ').splice(0, no_words).join(' ')
}

export function splitByCommaa(str) {
  return str.split(',').map((r, i, a) => (`${r.trim()}${i + 1 !== a.length ? `, ` : ''}`))
}


export function getStrapiMedia({ attributes }) {
  const { url, provider } = attributes
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url
  return imageUrl
}

export function getStrapiURL(path = '') {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`
}

// Local Storage
export const setLocalStorage = (contextName, contextState) => {
  for (const [key, value] of Object.entries(contextState)) {
    localStorage.setItem(`${contextName}:${key}`, JSON.stringify(value))
  }
}

export const getLocalStorage = (contextName) => {
  const storage = {}
  for (const storageKey of Object.keys(localStorage)) {
    const [spaceName, key] = storageKey.split(':')
    if (spaceName == contextName && key) {
      storage[key] = JSON.parse(localStorage.getItem(storageKey))
    }
  }
  return storage
}
