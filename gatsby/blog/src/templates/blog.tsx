import { graphql } from 'gatsby';
import React, { FC } from 'react';

const Blog: FC<any> = ({ data }) => {
  return <pre>{JSON.stringify(data, null, '  ')}</pre>;
};

export default Blog;

export const query = graphql`
  query ($id: String!) {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    blog: bcmsBlog(bcms: { _id: { eq: $id } }) {
      bcms {
        content {
          en {
            type
            name
            value
          }
        }
        meta {
          en {
            cover {
              _id
              alt_text
              caption
              height
              name
              src
              svg
              width
            }
            date
            slug
            title
            category {
              selected
              items
            }
            description {
              name
              type
              value
            }
            seo {
              title
              description
            }
          }
        }
      }
    }
  }
`;
