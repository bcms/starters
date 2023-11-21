import { graphql } from 'gatsby';

export const query = graphql`
  fragment LegalPage on BcmsLegalPage {
    bcms {
      meta {
        en {
          title
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
