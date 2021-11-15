export const API_URL = process.env.API_URL

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

export async function getProductCategories() {
  const productCategories = await fetchAPI("/product-categories");
  return productCategories;
}

export async function getProductCategory(slug) {
  const productCategories = await fetchAPI(`/product-categories?slug=${slug}`);
  return productCategories?.[0];
}

export async function getProducts() {
  const products = await fetchAPI("/products");
  return products;
}

export async function getProduct(slug) {
  const products = await fetchAPI(`/products?slug=${slug}`);
  return products?.[0];
}