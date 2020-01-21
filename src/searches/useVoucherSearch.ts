import gql from "graphql-tag";

import makeTopLevelSearch from "@saleor/hooks/makeTopLevelSearch";
import { pageInfoFragment } from "@saleor/queries";
import {
  SearchVouchers,
  SearchVouchersVariables
} from "./types/SearchVouchers";

export const searchVouchers = gql`
  ${pageInfoFragment}
  query SearchVouchers($after: String, $first: Int!, $query: String!) {
    search: vouchers(after: $after, first: $first, query: $query) {
      edges {
        node {
          id
          code
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;

export default makeTopLevelSearch<SearchVouchers, SearchVouchersVariables>(
  searchVouchers
);
