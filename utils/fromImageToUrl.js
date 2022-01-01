import { API_URL } from './api'

export const fromImageToUrl = ({ data }) => {

  const image = data.attributes

  // for local provider
  if (image.provider === "local") {

    return `${API_URL}${image.url}`
  }

  // for remote provider
  return image.url
};