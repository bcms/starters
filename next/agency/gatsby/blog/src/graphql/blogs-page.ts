import { graphql } from 'gatsby';

export const query = graphql`
  fragment BlogsPage on BcmsBlogsPage {
    bcms {
      meta {
        en {
          seo {
            description
            title
          }
          slug
          subtitle
          title
        }
      }
    }
  }
`;
