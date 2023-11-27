import { graphql } from 'gatsby';

export const query = graphql`
  fragment TeamMember on BcmsTeamMember {
    bcms {
      meta {
        en {
          title
          slug
          image {
            _id
            src
            name
            width
            height
            caption
            alt_text
            svg
          }
          role
          description {
            value
            name
            type
          }
        }
      }
    }
  }
`;
