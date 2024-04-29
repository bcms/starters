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
            subtitle
          }

          hero {
            title {
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
          capabilities {
            title
            subtitle
            description {
              type
              name
              value
            }
            portfolio_items {
              portfolio {
                meta {
                  en {
                    title
                    slug
                    subtitle
                    description {
                      type
                      name
                      value
                    }
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
                    project_cover {
                      _id
                      caption
                      alt_text
                      height
                      name
                      src
                      svg
                      width
                    }
                    url
                  }
                }
              }
            }
          }
          services {
            title
            subtitle
            description {
              type
              name
              value
            }
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
          }
          team {
            title
            subtitle
            description {
              type
              name
              value
            }
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
            members_title
            members_description {
              type
              name
              value
            }
            members {
              teamMember {
                meta {
                  en {
                    title
                    role
                    slug
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
              }
            }
          }
          contact_block {
            title
            description {
              type
              name
              value
            }
          }
        }
      }
    }
  }
`;
