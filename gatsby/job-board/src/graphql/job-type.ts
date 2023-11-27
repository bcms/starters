import { graphql } from 'gatsby';

export const query = graphql`
  fragment JobType on BcmsJobType {
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
