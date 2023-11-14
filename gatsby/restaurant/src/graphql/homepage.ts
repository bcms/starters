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
          hero {
            title
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
            address
            map {
              _id
              alt_text
              caption
              height
              name
              src
              svg
              width
            }
            open_time {
              value
              name
            }
            description {
              text {
                name
                type
                value
              }
              image {
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
          }
          menu {
            title
            description {
              type
              value
              name
            }
            meals {
              mealType {
                meta {
                  en {
                    title
                    description {
                      type
                      value
                      name
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
                  }
                }
              }
            }
          }
          seasons {
            title
            description {
              type
              value
              name
            }
            seasons {
              season {
                meta {
                  en {
                    title
                    description {
                      type
                      value
                      name
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
                  }
                }
              }
            }
          }
          ambience {
            title
            description {
                value
                name
                type
            }
            items {
                title
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
            }
          }
          
          specials {
            title
            description {
                value
                name
                type
            }
          }
          
          events {
            title
            description {
                value
                name
                type
            }
          }
          
          testimonials {
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
