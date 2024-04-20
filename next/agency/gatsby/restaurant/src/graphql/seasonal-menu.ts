import { graphql } from 'gatsby';

export const query = graphql`
  fragment SeasonsPage on BcmsSeason {
    bcms {
      meta {
        en {
          title
          description {
            type
            value
            name
          }
        }
      }
    }
  }
`;
