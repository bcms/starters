import { graphql } from 'gatsby';

export const query = graphql`
  fragment PortfolioItem on BcmsPortfolioItem {
    bcms {
      meta {
        en {
          title
          slug
          project_no
          brand_name
          role
          year
          description {
            type
            name
            value
          }
          gallery {
            _id
            alt_text
            caption
            height
            name
            src
            svg
            width
          }
          theme
        }
      }
    }
  }
`;
