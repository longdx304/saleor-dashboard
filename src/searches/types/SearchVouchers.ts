/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchVouchers
// ====================================================

export interface SearchVouchers_search_edges_node {
  __typename: "Voucher";
  id: string;
  code: string;
}

export interface SearchVouchers_search_edges {
  __typename: "VoucherCountableEdge";
  node: SearchVouchers_search_edges_node;
}

export interface SearchVouchers_search_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface SearchVouchers_search {
  __typename: "VoucherCountableConnection";
  edges: SearchVouchers_search_edges[];
  pageInfo: SearchVouchers_search_pageInfo;
}

export interface SearchVouchers {
  search: SearchVouchers_search | null;
}

export interface SearchVouchersVariables {
  after?: string | null;
  first: number;
  query: string;
}
