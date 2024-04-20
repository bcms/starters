import { graphql } from 'gatsby';

export const query = graphql`
  fragment Footer on BcmsFooter {
    bcms {
      meta {
        en {
          title
          slug
          nav {
            type
            name
            value
          }
          social {
            label
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
        }
      }
    }
  }
`;
