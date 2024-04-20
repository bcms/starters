import { graphql } from 'gatsby';

export const query = graphql`
  fragment Footer on BcmsFooter {
    bcms {
      meta {
        en {
          title
          social {
            url
            icon {
              _id
              alt_text
              caption
              height
              name
              src
              svg
              width
            }
          }
          description {
            name
            type
            value
          }
        }
      }
    }
  }
`;
