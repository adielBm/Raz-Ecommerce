import { gql } from "@apollo/client";

export const PRODUCTS_CATEGORIES = gql`
  query {
    productCategories {
      id,
      title,
      slug,
    }
  }
`;

export const PRODUCTS_CATEGORY_BY_SLUG = gql`
query ProductCategoryBySlug($slug: String!) {
  productCategories(filters: { slug: { eq: $slug } }) {
    data {
      id
      attributes {
        title
        slug
        products {
          data {
            id
            attributes {
              title
              content
              price
              slug
              publishedAt
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

`;

export const PRODUCTS = gql`
  query {
    products {
    	data {
        id
        attributes {
          title
          content
          price
          slug
          publishedAt
          image {
            data {
              attributes {
                url
              }
            }
          }
          product_categories {
            data {
              id
              attributes {
                title
                slug
              }
            }
          }
        }
      }
    }
  }
`;


export const PRODUCT_BY_SLUG = gql`
query productBySlug($slug: String) {
  products(filters: { slug: { eq: $slug } }) {
    data {
      id
      attributes {
        title
        content
        price
        slug
        publishedAt
        image {
          data {
            attributes {
              url
            }
          }
        }
        product_categories {
          data {
            id
            attributes {
              title
              slug
            }
          }
        }
      }
    }
  }
}
`;


export const CREATE_ORDER = gql`
mutation createOrder(
  $first_name: String!
  $last_name: String
  $address: String
  $total: Int!
  $email: String
  $items: [ComponentOrderItemsInput]
) {
  createOrder(
    data: {
      first_name: $first_name
      last_name: $last_name
      address: $address
      email: $email
      total: $total
      items: $items
    }
  ) {
    data {
      attributes {
        first_name
        last_name
        total
				... on Order {
          items {
            count
            product {
              data {
                id
              }
            }
          }
        }
        address
        email
      }
    }
  }
}
`;