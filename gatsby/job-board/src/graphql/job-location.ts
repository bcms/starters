import { graphql } from 'gatsby';

export const query = graphql`
  fragment JobLocation on BcmsJobLocation {
    bcms {
      meta {
        en {
          title
          slug
        }
      }
      content {
        en {
          type
          name
          value
        }
      }
    }
  }
`;
