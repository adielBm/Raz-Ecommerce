import { API_URL } from './api'

export const fromImageToUrl = (image) => {

  if (!image) {
    console.warn('This is not a Image...')
    return "/vercel.svg"; //Or default image here
  }
  return image.data.attributes.url

};