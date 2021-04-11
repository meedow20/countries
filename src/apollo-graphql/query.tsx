import {gql} from "@apollo/client";

export const LIST_COUNTRIES = gql`
  {
      countries {
          code
          name
          continent {
              name
          }
      }
  }
`;