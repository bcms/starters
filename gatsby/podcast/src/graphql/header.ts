import { graphql } from 'gatsby';

export const query = graphql`
  fragment Header on BcmsHeader {
    bcms {
      meta {
        en {
          title
          slug
          nav {
            value
            name
            type
          }
          logo {
            _id
            caption
            alt_text
            height
            name
            src
            svg
            width
          }
          nav {
            type
            value
            name
          }
        }
      }
    }
  }
`;
