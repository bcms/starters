import { graphql } from 'gatsby';

export const query = graphql`
  fragment HomePage on BcmsHomePage {
    bcms {
      meta {
        en {
          title
          slug
          seo {
            title
            description
          }
          about {
            title
            cover {
              _id
              caption
              alt_text
              height
              name
              src
              svg
              width
            }
            description {
              type
              value
              name
            }
            topics
          }
          speakers {
            title
            cover {
              _id
              caption
              alt_text
              height
              name
              src
              svg
              width
            }
            description {
              type
              value
              name
            }
            speakers {
              name
              role
              avatar {
                _id
                caption
                alt_text
                height
                name
                src
                svg
                width
              }
              biography {
                name
                type
                value
              }
              topic {
                type
                name
                value
              }
            }
          }
          sponsors {
            title
            sponsors {
              cover {
                _id
                caption
                alt_text
                height
                name
                src
                svg
                width
              }
              description {
                type
                value
                name
              }
              tier
            }
          }
          tickets {
            title
            description {
              name
              type
              value
            }
            tickets {
              title
              price
              discount_price
              background {
                _id
                caption
                alt_text
                height
                name
                src
                svg
                width
              }
              theme {
                items
                selected
              }
            }
          }
          agenda {
            title
            days {
              label
              items {
                hours
                title
                description {
                  name
                  type
                  value
                }
                location
              }
            }
          }
          hero {
            cover {
              _id
              caption
              alt_text
              height
              name
              src
              svg
              width
            }
            description {
              type
              value
              name
            }
            gallery {
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
      }
    }
  }
`;
