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
  const id =  data.products.data[0].id
  const product = data.products.data[0].attributes
  const productCategories = product.product_categories
  return { product, productCategories, id }
}

export async function getDeliveryMethods() {
  const { data } = await client.query({
    query: Queries.DELIVEIES,
  })
  console.log('🚛', data)
  const deliveries = data.deliveries
  return { deliveries }
}
