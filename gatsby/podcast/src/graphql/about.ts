import { graphql } from 'gatsby';

export const query = graphql`
  fragment AboutPage on BcmsAboutPage {
    bcms {
      meta {
        en {
          title
          slug
          seo {
            title
            description
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
          content {
            type
            value
            name
          }
        }
      }
    }
  }
`;
