export const API_URL = process.env.STRAPI_HOST || "http://localhost:1337"

export function getStrapiURL(path) {
  return `${API_URL}${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path) {
  const requestUrl = getStrapiURL(path);
  const response = await fetch(requestUrl);
  const data = await response.json();
  return data;
}

export async function getCategories() {
  const categories = await fetchAPI("/categories");
  return categories;
}

export async function getCategory(slug) {
  const categories = await fetchAPI(`/categories?slug=${slug}`);
  return categories?.[0];
}

export async function getProducts() {
  const products = await fetchAPI("/products");
  return products;
}

export async function getProduct(slug) {
  const products = await fetchAPI(`/products?slug=${slug}`);
  return products?.[0];
}