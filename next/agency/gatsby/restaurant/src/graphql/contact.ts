import { graphql } from 'gatsby';

export const query = graphql`
  fragment ContactPage on BcmsContactPage {
    bcms {
      meta {
        en {
          title
          slug
          seo {
            title
            description
          }
          description {
            value
            type
            name
          }
          map {
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
`;
