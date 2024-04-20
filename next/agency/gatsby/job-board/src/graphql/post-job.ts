import { graphql } from 'gatsby';

export const query = graphql`
  fragment PostJobPage on BcmsPostJobPage {
    bcms {
      meta {
        en {
          title
          slug
        }
      }
    }
  }
`;
