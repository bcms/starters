import { graphql } from 'gatsby';

export const query = graphql`
  fragment Footer on BcmsFooter {
    bcms {
      meta {
        en {
          title
          slug
          nav_columns {
            type
            value
            name
          }
        }
      }
    }
  }
`;
