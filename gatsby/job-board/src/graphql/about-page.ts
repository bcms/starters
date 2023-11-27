import { graphql } from 'gatsby';

export const query = graphql`
  fragment AboutPage on BcmsAboutPage {
    bcms {
      meta {
        en {
          seo {
            title
            description
          }
          title
          slug
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
          content {
            text {
              type
              name
              value
            }
            image {
              _id
              src
              name
              width
              height
              caption
              alt_text
              svg
            }
          }
          team {
            title
            description {
              name
              value
              type
            }
          }
        }
      }
      content {
        en {
          name
          type
          value
        }
      }
    }
  }
`;
