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
    mutation CreateOrder ($name: String!, $email: String, $total: Int!) {
      createOrder(input: { data: { name: $name, email: $email, total: $total } }) {
        order {
          name
          total
          email
        }
      }
    }
  `;