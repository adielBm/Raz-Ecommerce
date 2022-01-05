import client from "./client"
import * as Queries from './queries'

export async function getProductsCategoryBySlug(slug) {
  const { data } = await client.query({
    query: Queries.PRODUCTS_CATEGORY_BY_SLUG,
    variables: { slug: slug }
  })
  const productCategory = data.productCategories.data[0].attributes
  const products = productCategory.products
  return { productCategory, products }
}

export async function getProductBySlug(slug) {
  const { data } = await client.query({
    query: Queries.PRODUCT_BY_SLUG,
    variables: { slug: slug }
  })
  const id = data.products.data[0].id
  const product = data.products.data[0].attributes
  const productCategories = product.product_categories
  return { product, productCategories, id }
}

export async function getDeliveryMethods() {
  const { data } = await client.query({
    query: Queries.DELIVEIES,
  })
  const deliveries = data.deliveries
  return { deliveries }
}

export async function getOrderByCode(code) {
  return await client.query({
    query: Queries.ORDER_BY_CODE,
    variables: { code: code }
  })
}

export async function updateOrderComplated(code) {
  return await client.mutate({
    mutation: Queries.ORDER_COMPLATED,
    variables: { code: code }
  })
}

export async function getProductCategories() {
  const { data: { productCategories: { data } } } = await client.query({
    query: Queries.PRODUCTS_CATEGORIES
  })
  return data
}

export async function getPostBySlug(slug) {
  const { data } = await client.query({
    query: Queries.POST_BY_SLUG,
    variables: { slug: slug }
  })
  const id = data.posts.data[0].id
  const post = data.posts.data[0].attributes
  return { post, id }
}

