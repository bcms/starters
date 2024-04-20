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
            description {
              type
              value
              name
            }
            social {
              label
              icon {
                _id
                caption
                alt_text
                height
                name
                src
                svg
                width
              }
              url
            }
            image {
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
