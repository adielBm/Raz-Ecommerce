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
  $email: String
  $items: [ComponentOrderItemsInput]
  $delivery: ID
) {
  createOrder(
    data: {
      first_name: $first_name
      last_name: $last_name
      address: $address
      email: $email
      delivery: $delivery
      items: $items
    }
  ) {
    data {
      attributes {
        delivery {
          data {
            id
          }
        }
        code
        first_name
        last_name
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


export const DELIVEIES = gql`
query deliveries {
  deliveries {
    data {
      id
      attributes {
        name
        cost
      }
    }
  }
}
`



export const ORDER_BY_CODE = gql`
query orderByCode($code: String) {
  orderByCode(code: $code) {
    data {
      id
      attributes {
        address
        email
        code
        total
        status
        last_name
        first_name
      }
    }
  }
}
`

export const ORDER_COMPLATED =gql`
mutation updateOrderComplate($code: String) {
  updateOrderComplate(code: $code) {
    data {
      id
      attributes {
        status
        address
      }
    }
  }
}
`
