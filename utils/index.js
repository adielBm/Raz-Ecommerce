export function truncate(str, no_words) {
  return str.split(" ").splice(0, no_words).join(" ");
}

export function getStrapiMedia({attributes}) {
  const { url, provider } = attributes
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url
  return imageUrl
}

export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`
}