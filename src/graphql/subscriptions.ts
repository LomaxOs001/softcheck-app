/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../GraphqlAPI";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateProduct = /* GraphQL */ `subscription OnCreateProduct(
  $filter: ModelSubscriptionProductFilterInput
  $owner: String
) {
  onCreateProduct(filter: $filter, owner: $owner) {
    ProductId
    Name
    Description
    StateId
    Vulnerability {
      VulnerabilityId
      Installed
      Critical
      High
      Medium
      Low
      Unknown
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
` as GeneratedSubscription<
  APITypes.OnCreateProductSubscriptionVariables,
  APITypes.OnCreateProductSubscription
>;
export const onUpdateProduct = /* GraphQL */ `subscription OnUpdateProduct(
  $filter: ModelSubscriptionProductFilterInput
  $owner: String
) {
  onUpdateProduct(filter: $filter, owner: $owner) {
    ProductId
    Name
    Description
    StateId
    Vulnerability {
      VulnerabilityId
      Installed
      Critical
      High
      Medium
      Low
      Unknown
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
` as GeneratedSubscription<
  APITypes.OnUpdateProductSubscriptionVariables,
  APITypes.OnUpdateProductSubscription
>;
export const onDeleteProduct = /* GraphQL */ `subscription OnDeleteProduct(
  $filter: ModelSubscriptionProductFilterInput
  $owner: String
) {
  onDeleteProduct(filter: $filter, owner: $owner) {
    ProductId
    Name
    Description
    StateId
    Vulnerability {
      VulnerabilityId
      Installed
      Critical
      High
      Medium
      Low
      Unknown
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
` as GeneratedSubscription<
  APITypes.OnDeleteProductSubscriptionVariables,
  APITypes.OnDeleteProductSubscription
>;
export const onCreateVulnerability = /* GraphQL */ `subscription OnCreateVulnerability(
  $filter: ModelSubscriptionVulnerabilityFilterInput
  $owner: String
) {
  onCreateVulnerability(filter: $filter, owner: $owner) {
    VulnerabilityId
    Installed
    Critical
    High
    Medium
    Low
    Unknown
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateVulnerabilitySubscriptionVariables,
  APITypes.OnCreateVulnerabilitySubscription
>;
export const onUpdateVulnerability = /* GraphQL */ `subscription OnUpdateVulnerability(
  $filter: ModelSubscriptionVulnerabilityFilterInput
  $owner: String
) {
  onUpdateVulnerability(filter: $filter, owner: $owner) {
    VulnerabilityId
    Installed
    Critical
    High
    Medium
    Low
    Unknown
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateVulnerabilitySubscriptionVariables,
  APITypes.OnUpdateVulnerabilitySubscription
>;
export const onDeleteVulnerability = /* GraphQL */ `subscription OnDeleteVulnerability(
  $filter: ModelSubscriptionVulnerabilityFilterInput
  $owner: String
) {
  onDeleteVulnerability(filter: $filter, owner: $owner) {
    VulnerabilityId
    Installed
    Critical
    High
    Medium
    Low
    Unknown
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    owner
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteVulnerabilitySubscriptionVariables,
  APITypes.OnDeleteVulnerabilitySubscription
>;
