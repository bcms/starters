import { graphql } from 'gatsby';

export const query = graphql`
  fragment Footer on BcmsFooter {
    bcms {
      meta {
        en {
          title
          slug
          email
          social {
            icon {
              _id
              caption
              alt_text
              height
              name
              src
              svg
              width
            }
            url
          }
        }
      }
    }
  }
`;
