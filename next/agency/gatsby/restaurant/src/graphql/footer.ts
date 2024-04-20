import { graphql } from 'gatsby';

export const query = graphql`
  fragment Footer on BcmsFooter {
    bcms {
      meta {
        en {
          title
          location {
            value
          }
          nav {
            value
          }
        }
      }
    }
  }
`;
