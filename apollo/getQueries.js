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
  const product = data.products.data[0].attributes
  const productCategories = product.product_categories
  return { product, productCategories }
}

