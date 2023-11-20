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
            title {
              type
              name
              value
            }
            description {
              type
              name
              value
            }
            cta_label
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
          recipes {
            title
            cta_label
            recipes {
              recipe {
                meta {
                  en {
                    title
                    slug
                    seo {
                      title
                      description
                    }
                    extended_description {
                      type
                      name
                      value
                    }
                    description {
                      type
                      name
                      value
                    }
                    cover_image {
                      _id
                      caption
                      alt_text
                      height
                      name
                      src
                      svg
                      width
                    }
                    cook_time
                    popular
                    ingredients {
                      value
                      name
                      type
                    }
                    categories {
                      recipeCategory {
                        meta {
                          en {
                            title
                            slug
                          }
                        }
                      }
                    }
                    qa {
                      question
                      answer {
                        type
                        name
                        value
                      }
                    }
                    steps {
                      title
                      description {
                        type
                        value
                        name
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
                  }
                }
              }
            }
          }
          about_us {
            title
            description {
              value
              name
              type
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
            stats {
              label
              value
            }
          }
          lets_talk {
            title
            description {
              type
              value
              name
            }
            links {
              icon {
                _id
                caption
                alt_text
                height
                name
                src
                svg
                width
              }
              label
              link {
                type
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;
