import { graphql } from 'gatsby';

export const query = graphql`
  fragment EventsPage on BcmsEventsPage {
    bcms {
      meta {
        en {
          title
          description {
            value
            name
            type
          }
          seo {
            title
            description
          }
        }
      }
    }
  }
`;
