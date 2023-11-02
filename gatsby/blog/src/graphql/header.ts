import { graphql } from 'gatsby';

export const query = graphql`
  fragment Header on BcmsHeader {
    bcms {
      meta {
        en {
          title
          nav {
            value
          }
          logo {
            _id
            caption
            alt_text
            height
            name
            src
            width
          }
        }
      }
    }
  }
`;
