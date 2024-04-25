import { graphql } from 'gatsby';

export const query = graphql`
  fragment PortfolioPage on BcmsPortfolioPage {
    bcms {
      meta {
        en {
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
