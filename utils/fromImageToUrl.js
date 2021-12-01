import { API_URL } from './api'

export const fromImageToUrl = (image) => {

  if (!image) {
    return "/vercel.svg"; //Or default image here
  }
  if (image.data.attributes.url.indexOf("/") === 0) {
    //It's a relative url, add API URL
    return `${API_URL}${image.data.attributes.url}`;
  }

  return image.url;
};