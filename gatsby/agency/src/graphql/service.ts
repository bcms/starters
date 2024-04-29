import { graphql } from 'gatsby';

export const query = graphql`
  fragment Services on BcmsServicesPage {
    bcms {
      meta {
        en {
          seo {
            title
          }
          title
          description {
            type
            name
            value
          }
          contact_block {
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
