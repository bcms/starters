import { graphql } from 'gatsby';

export const query = graphql`
  fragment LegalPage on BcmsLegalPage {
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
