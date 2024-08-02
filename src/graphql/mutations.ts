/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../APIGraphQL";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createProduct = /* GraphQL */ `mutation CreateProduct(
  $input: CreateProductInput!
  $condition: ModelProductConditionInput
) {
  createProduct(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateProductMutationVariables,
  APITypes.CreateProductMutation
>;
export const updateProduct = /* GraphQL */ `mutation UpdateProduct(
  $input: UpdateProductInput!
  $condition: ModelProductConditionInput
) {
  updateProduct(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateProductMutationVariables,
  APITypes.UpdateProductMutation
>;
export const deleteProduct = /* GraphQL */ `mutation DeleteProduct(
  $input: DeleteProductInput!
  $condition: ModelProductConditionInput
) {
  deleteProduct(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteProductMutationVariables,
  APITypes.DeleteProductMutation
>;
export const createVulnerability = /* GraphQL */ `mutation CreateVulnerability(
  $input: CreateVulnerabilityInput!
  $condition: ModelVulnerabilityConditionInput
) {
  createVulnerability(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateVulnerabilityMutationVariables,
  APITypes.CreateVulnerabilityMutation
>;
export const updateVulnerability = /* GraphQL */ `mutation UpdateVulnerability(
  $input: UpdateVulnerabilityInput!
  $condition: ModelVulnerabilityConditionInput
) {
  updateVulnerability(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateVulnerabilityMutationVariables,
  APITypes.UpdateVulnerabilityMutation
>;
export const deleteVulnerability = /* GraphQL */ `mutation DeleteVulnerability(
  $input: DeleteVulnerabilityInput!
  $condition: ModelVulnerabilityConditionInput
) {
  deleteVulnerability(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteVulnerabilityMutationVariables,
  APITypes.DeleteVulnerabilityMutation
>;
