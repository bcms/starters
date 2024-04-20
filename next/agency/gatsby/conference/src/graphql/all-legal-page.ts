import { graphql } from 'gatsby';

export const query = graphql`
  fragment AllLegal on BcmsLegal {
    bcms {
      meta {
        en {
          title
          slug
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
