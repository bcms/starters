import { graphql } from 'gatsby';

export const query = graphql`
  fragment LegalPage on BcmsLegal {
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
