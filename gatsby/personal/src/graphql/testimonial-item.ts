import { graphql } from 'gatsby';

export const query = graphql`
  fragment TestimonialItem on BcmsTestimonialItem {
    bcms {
      meta {
        en {
          title
          slug
          author {
            name
            avatar {
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
          content {
            type
            name
            value
          }
        }
      }
    }
  }
`;
