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
              text {
                type
                value
                name
              }
              image {
                _id
                src
                name
                width
                height
                caption
                alt_text
              }
            }
            description {
              type
              name
              value
            }
            cover {
              _id
              src
              name
              width
              height
              caption
              alt_text
              svg
            }
            cta_label
          }

          about {
            title
            description {
              type
              name
              value
            }
            features
          }
          jobs {
            title
            description {
              type
              name
              value
            }
          }
        }
      }
      content {
        en {
          value
          type
          name
        }
      }
    }
  }
`;
