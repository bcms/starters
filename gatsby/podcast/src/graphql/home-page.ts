import { graphql } from 'gatsby';

export const query = graphql`
  fragment HomePage on BcmsHomePage {
    bcms {
      meta {
        en {
          title
          slug
          seo {
            title
            description
          }
          hero {
            title {
              type
              name
              value
            }
            description {
              type
              name
              value
            }
            cover {
              _id
              caption
              alt_text
              height
              name
              src
              svg
              width
            }
          }
          episodes {
            title {
              name
              value
              type
            }
            description {
              name
              value
              type
            }
          }
        }
      }
    }
  }
`;
