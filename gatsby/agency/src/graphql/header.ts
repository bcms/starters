import { graphql } from 'gatsby';

export const query = graphql`
  fragment Header on BcmsHeader {
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
        }
      }
    }
  }
`;
