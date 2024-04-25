import { graphql } from 'gatsby';

export const query = graphql`
  fragment AllTeam on BcmsTeamMember {
    bcms {
      meta {
        en {
          title
          role
          description {
            type
            name
            value
          }
          image {
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
