import { graphql } from 'gatsby';

export const query = graphql`
  fragment Portfolio on BcmsPortfolioPage {
    bcms {
      meta {
        en {
          title
          seo {
            title
            description
          }
          description {
            type
            name
            value
          }
          slug
        }
      }
    }
  }
`;
