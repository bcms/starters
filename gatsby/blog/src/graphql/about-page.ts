import { graphql } from 'gatsby';

export const query = graphql`
  fragment AboutPage on BcmsAboutPage {
    bcms {
      content {
        en {
          value
          type
          name
        }
      }
      meta {
        en {
          description {
            name
            type
            value
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
          seo {
            description
            title
          }
          slug
          subtitle
          title
        }
      }
    }
  }
`;
