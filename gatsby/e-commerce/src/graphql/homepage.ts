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
            title
            description
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
          cta {
            title
            description
            cta_label
            cta_link
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
        }
      }
    }
  }
`;
