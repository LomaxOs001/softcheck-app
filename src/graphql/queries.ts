/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../GraphqlAPI";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getProduct = /* GraphQL */ `query GetProduct($ProductId: ID!, $Name: String!) {
  getProduct(ProductId: $ProductId, Name: $Name) {
    ProductId
    Name
    Description
    StateId
    Vulnerability {
      VulnerabilityId
      IsVulnerable
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    Price
    ProductKey
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetProductQueryVariables,
  APITypes.GetProductQuery
>;
export const listProducts = /* GraphQL */ `query ListProducts(
  $ProductId: ID
  $Name: ModelStringKeyConditionInput
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listProducts(
    ProductId: $ProductId
    Name: $Name
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      ProductId
      Name
      Description
      StateId
      Price
      ProductKey
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProductsQueryVariables,
  APITypes.ListProductsQuery
>;
export const syncProducts = /* GraphQL */ `query SyncProducts(
  $filter: ModelProductFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncProducts(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      ProductId
      Name
      Description
      StateId
      Price
      ProductKey
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncProductsQueryVariables,
  APITypes.SyncProductsQuery
>;
export const getVulnerability = /* GraphQL */ `query GetVulnerability($VulnerabilityId: ID!) {
  getVulnerability(VulnerabilityId: $VulnerabilityId) {
    VulnerabilityId
    IsVulnerable
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetVulnerabilityQueryVariables,
  APITypes.GetVulnerabilityQuery
>;
export const listVulnerabilities = /* GraphQL */ `query ListVulnerabilities(
  $VulnerabilityId: ID
  $filter: ModelVulnerabilityFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listVulnerabilities(
    VulnerabilityId: $VulnerabilityId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      VulnerabilityId
      IsVulnerable
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListVulnerabilitiesQueryVariables,
  APITypes.ListVulnerabilitiesQuery
>;
export const syncVulnerabilities = /* GraphQL */ `query SyncVulnerabilities(
  $filter: ModelVulnerabilityFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncVulnerabilities(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      VulnerabilityId
      IsVulnerable
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncVulnerabilitiesQueryVariables,
  APITypes.SyncVulnerabilitiesQuery
>;
