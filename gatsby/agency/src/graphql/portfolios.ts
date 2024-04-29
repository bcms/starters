import { graphql } from 'gatsby';

export const query = graphql`
  fragment AllPortfolio on BcmsPortfolio {
    bcms {
      meta {
        en {
          title
          subtitle
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
          project_cover {
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
