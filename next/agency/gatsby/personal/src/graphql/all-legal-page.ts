import { graphql } from 'gatsby';

export const query = graphql`
  fragment AllLegalPage on BcmsLegalPage {
    bcms {
      meta {
        en {
          title
          slug
        }
      }
      content {
        en {
          name
          type
          value
        }
      }
    }
  }
`;
