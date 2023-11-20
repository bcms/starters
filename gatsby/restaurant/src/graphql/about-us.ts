import { graphql } from 'gatsby';

export const query = graphql`
  fragment AboutPage on BcmsAboutPage {
    bcms {
      meta {
        en {
          title
          seo {
            title
            description
          }
          hero {
            title {
              value
              type
              name
            }
            subtitle {
              value
              type
              name
            }
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
              svg
              width
            }
          }
          text_image_cols {
            text {
              value
              type
              name
            }
            image {
              _id
              alt_text
              caption
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
