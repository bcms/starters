import { graphql } from 'gatsby';

export const query = graphql`
  fragment ServiceItem on BcmsServiceItem {
    bcms {
      meta {
        en {
          title
          slug
          abbreviation
          start_price
          description {
            value
            type
            name
          }
          theme
        }
      }
    }
  }
`;
