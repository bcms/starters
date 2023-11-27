import { graphql } from 'gatsby';

export const query = graphql`
  fragment ContactPage on BcmsContactPage {
    bcms {
        meta {
          en {
            seo {
              title
              description
            }
            title
            description {
              type
              name
              value
            }
            slug
          }
        }
      }
  }
`;
