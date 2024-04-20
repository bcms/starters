import { graphql } from 'gatsby';

export const query = graphql`
  fragment RecipesPage on BcmsRecipesPage {
    bcms {
      meta {
        en {
          title
          slug
          seo {
            title
            description
          }
          headline {
            value
            name
            type
          }
        }
      }
    }
  }
`;
