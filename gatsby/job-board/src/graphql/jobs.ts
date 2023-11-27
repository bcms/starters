import { graphql } from 'gatsby';

export const query = graphql`
  fragment Job on BcmsJob {
    bcms {
        meta {
          en {
            title
            slug
            description {
              type
              name
              value
            }
            seo {
              title
              description
            }
            location {
              jobLocation {
                meta {
                  en {
                    title
                    slug
                  }
                }
              }
            }
            type {
              jobType {
                meta {
                  en {
                    title
                    slug
                  }
                }
              }
            }
            cover {
               _id
              src
              name
              width
              height
              caption
              alt_text
              svg
            }
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
            company {
              jobCompany {
                meta {
                  en {
                    title
                    slug
                    logo {
                      _id
                      src
                      name
                      width
                      height
                      caption
                      alt_text
                      svg
                    }
                    description {
                      value
                      type
                      name
                    }
                  }
                }
              }
            }
            description_extended {
              type
              name
              value
            }
            responsibilities {
              type
              name
              value
            }
            details {
              type
              name
              value
            }
            featured
          }
        }
      }
  }
`;
