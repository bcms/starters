import { graphql } from 'gatsby';

export const query = graphql`
  fragment Testimonials on BcmsTestimonial {
    bcms {
        meta {
          en {
            title
            slug
            author {
              name
              avatar {
                _id
                src
                name
                width
                height
                caption
                alt_text
                svg
              }
            }
            review {
              type
              name
              value
            }
          }
        }
      }
  }
`;
