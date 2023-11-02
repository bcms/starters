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
            subtitle
            featured_blogs {
              blog {
                meta {
                  en {
                    slug
                    date
                    title
                    description {
                      value
                      type
                      name
                    }
                    cover {
                      _id
                      alt_text
                      caption
                      height
                      name
                      src
                      width
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
