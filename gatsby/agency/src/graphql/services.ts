import { graphql } from 'gatsby';

export const query = graphql`
  fragment AllServices on BcmsService {
    bcms {
      meta {
        en {
          title
          theme
          slug
          description {
            type
            name
            value
          }
          cover {
            _id
            caption
            alt_text
            height
            name
            src
            svg
            width
          }
        }
      }
      content {
        en {
          value
          type
          name
        }
      }
    }
  }
`;
