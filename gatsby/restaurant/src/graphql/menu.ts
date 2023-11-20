import { graphql } from 'gatsby';

export const query = graphql`
  fragment MenuPage on BcmsMenuPage {
    bcms {
      meta {
        en {
          title
          seo {
            title
            description
          }
        }
      }
    }
  }
`;
