import { graphql } from 'gatsby';

export const query = graphql`
  fragment AboutPage on BcmsAboutPage {
    bcms {
      meta {
        en {
          title
          seo {
            title
            description
          }
          description {
            type
            name
            value
          }
          cover {
            _id
            alt_text
            caption
            height
            name
            src
            svg
            width
          }
          awards {
            title {
              type
              name
              value
            }
            items {
              place
              title
              year
            }
          }
          work_history {
            title
            description {
              type
              name
              value
            }
            items {
              company_name
              from
              to
            }
          }
          education {
            title
            description {
              type
              name
              value
            }
            degrees
          }
        }
      }
    }
  }
`;
