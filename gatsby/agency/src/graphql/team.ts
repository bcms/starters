import { graphql } from 'gatsby';

export const query = graphql`
  fragment TeamPage on BcmsTeamPage {
    bcms {
      meta {
        en {
          title
          description {
            type
            name
            value
          }
          contact_block {
            title
            description {
              type
              value
              name
            }
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
