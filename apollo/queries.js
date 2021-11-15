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
  query ProductCategoryBySlug ($slug: ID!) {
    productCategories(where: {slug: $slug}  ) {
      id,
      title,
      slug,
      products {
        id,
        title,
        content,
        price,
        slug,
        published_at,
        image {
          id,
          url
        }
      }
    }
  }
`;

export const PRODUCTS = gql`
  query {
    products {
      id,
      title,
      content,
      price,
      slug,
      published_at,
      image {
        id,
        url
      },
      product_categories {
        id,
        title,
        slug,
      }
    }
  }
`;



