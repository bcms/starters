import { graphql } from 'gatsby';

export const query = graphql`
  fragment Footer on BcmsFooter {
    bcms {
      meta {
        en {
          title
          slug
          nav {
            type
            name
            value
          }
          social {
            type
            name
            value
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
