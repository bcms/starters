import { graphql } from 'gatsby';

export const query = graphql`
  fragment LegalPage on BcmsLegalPage {
    bcms {
      meta {
        en {
          seo {
            title
          }
          title
          blocks {
            title
            description {
              type
              value
              name
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
