import { graphql } from 'gatsby';

export const query = graphql`
  fragment ReservationPage on BcmsReservationPage {
    bcms {
      meta {
        en {
          title
          seo {
            title
            description
          }
        }
      }
    }
  }
`;
