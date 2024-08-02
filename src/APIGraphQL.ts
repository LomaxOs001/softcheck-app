/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateProductInput = {
  ProductId: string,
  Name: string,
  Description: string,
  StateId?: string | null,
  Price: number,
  ProductKey: string,
  _version?: number | null,
};

export type ModelProductConditionInput = {
  Name?: ModelStringInput | null,
  Description?: ModelStringInput | null,
  StateId?: ModelIDInput | null,
  Price?: ModelIntInput | null,
  ProductKey?: ModelStringInput | null,
  and?: Array< ModelProductConditionInput | null > | null,
  or?: Array< ModelProductConditionInput | null > | null,
  not?: ModelProductConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Product = {
  __typename: "Product",
  ProductId: string,
  Name: string,
  Description: string,
  StateId?: string | null,
  Vulnerability?: Vulnerability | null,
  Price: number,
  ProductKey: string,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type Vulnerability = {
  __typename: "Vulnerability",
  VulnerabilityId: string,
  IsVulnerable: boolean,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  owner?: string | null,
};

export type UpdateProductInput = {
  ProductId: string,
  Name?: string | null,
  Description?: string | null,
  StateId?: string | null,
  Price?: number | null,
  ProductKey?: string | null,
  _version?: number | null,
};

export type DeleteProductInput = {
  ProductId: string,
  _version?: number | null,
};

export type CreateVulnerabilityInput = {
  VulnerabilityId: string,
  IsVulnerable: boolean,
  _version?: number | null,
};

export type ModelVulnerabilityConditionInput = {
  IsVulnerable?: ModelBooleanInput | null,
  and?: Array< ModelVulnerabilityConditionInput | null > | null,
  or?: Array< ModelVulnerabilityConditionInput | null > | null,
  not?: ModelVulnerabilityConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  owner?: ModelStringInput | null,
};

export type UpdateVulnerabilityInput = {
  VulnerabilityId: string,
  IsVulnerable?: boolean | null,
  _version?: number | null,
};

export type DeleteVulnerabilityInput = {
  VulnerabilityId: string,
  _version?: number | null,
};

export type ModelProductFilterInput = {
  ProductId?: ModelIDInput | null,
  Name?: ModelStringInput | null,
  Description?: ModelStringInput | null,
  StateId?: ModelIDInput | null,
  Price?: ModelIntInput | null,
  ProductKey?: ModelStringInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelProductFilterInput | null > | null,
  or?: Array< ModelProductFilterInput | null > | null,
  not?: ModelProductFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelProductConnection = {
  __typename: "ModelProductConnection",
  items:  Array<Product | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelVulnerabilityFilterInput = {
  VulnerabilityId?: ModelIDInput | null,
  IsVulnerable?: ModelBooleanInput | null,
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelVulnerabilityFilterInput | null > | null,
  or?: Array< ModelVulnerabilityFilterInput | null > | null,
  not?: ModelVulnerabilityFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
};

export type ModelVulnerabilityConnection = {
  __typename: "ModelVulnerabilityConnection",
  items:  Array<Vulnerability | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelSubscriptionProductFilterInput = {
  ProductId?: ModelSubscriptionIDInput | null,
  Name?: ModelSubscriptionStringInput | null,
  Description?: ModelSubscriptionStringInput | null,
  StateId?: ModelSubscriptionIDInput | null,
  Price?: ModelSubscriptionIntInput | null,
  ProductKey?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProductFilterInput | null > | null,
  or?: Array< ModelSubscriptionProductFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionVulnerabilityFilterInput = {
  VulnerabilityId?: ModelSubscriptionIDInput | null,
  IsVulnerable?: ModelSubscriptionBooleanInput | null,
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionVulnerabilityFilterInput | null > | null,
  or?: Array< ModelSubscriptionVulnerabilityFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
  owner?: ModelStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type CreateProductMutationVariables = {
  input: CreateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type CreateProductMutation = {
  createProduct?:  {
    __typename: "Product",
    ProductId: string,
    Name: string,
    Description: string,
    StateId?: string | null,
    Vulnerability?:  {
      __typename: "Vulnerability",
      VulnerabilityId: string,
      IsVulnerable: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    Price: number,
    ProductKey: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateProductMutationVariables = {
  input: UpdateProductInput,
  condition?: ModelProductConditionInput | null,
};

export type UpdateProductMutation = {
  updateProduct?:  {
    __typename: "Product",
    ProductId: string,
    Name: string,
    Description: string,
    StateId?: string | null,
    Vulnerability?:  {
      __typename: "Vulnerability",
      VulnerabilityId: string,
      IsVulnerable: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    Price: number,
    ProductKey: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteProductMutationVariables = {
  input: DeleteProductInput,
  condition?: ModelProductConditionInput | null,
};

export type DeleteProductMutation = {
  deleteProduct?:  {
    __typename: "Product",
    ProductId: string,
    Name: string,
    Description: string,
    StateId?: string | null,
    Vulnerability?:  {
      __typename: "Vulnerability",
      VulnerabilityId: string,
      IsVulnerable: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    Price: number,
    ProductKey: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type CreateVulnerabilityMutationVariables = {
  input: CreateVulnerabilityInput,
  condition?: ModelVulnerabilityConditionInput | null,
};

export type CreateVulnerabilityMutation = {
  createVulnerability?:  {
    __typename: "Vulnerability",
    VulnerabilityId: string,
    IsVulnerable: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type UpdateVulnerabilityMutationVariables = {
  input: UpdateVulnerabilityInput,
  condition?: ModelVulnerabilityConditionInput | null,
};

export type UpdateVulnerabilityMutation = {
  updateVulnerability?:  {
    __typename: "Vulnerability",
    VulnerabilityId: string,
    IsVulnerable: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type DeleteVulnerabilityMutationVariables = {
  input: DeleteVulnerabilityInput,
  condition?: ModelVulnerabilityConditionInput | null,
};

export type DeleteVulnerabilityMutation = {
  deleteVulnerability?:  {
    __typename: "Vulnerability",
    VulnerabilityId: string,
    IsVulnerable: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type GetProductQueryVariables = {
  ProductId: string,
};

export type GetProductQuery = {
  getProduct?:  {
    __typename: "Product",
    ProductId: string,
    Name: string,
    Description: string,
    StateId?: string | null,
    Vulnerability?:  {
      __typename: "Vulnerability",
      VulnerabilityId: string,
      IsVulnerable: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    Price: number,
    ProductKey: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListProductsQueryVariables = {
  ProductId?: string | null,
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListProductsQuery = {
  listProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      ProductId: string,
      Name: string,
      Description: string,
      StateId?: string | null,
      Price: number,
      ProductKey: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncProductsQueryVariables = {
  filter?: ModelProductFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncProductsQuery = {
  syncProducts?:  {
    __typename: "ModelProductConnection",
    items:  Array< {
      __typename: "Product",
      ProductId: string,
      Name: string,
      Description: string,
      StateId?: string | null,
      Price: number,
      ProductKey: string,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetVulnerabilityQueryVariables = {
  VulnerabilityId: string,
};

export type GetVulnerabilityQuery = {
  getVulnerability?:  {
    __typename: "Vulnerability",
    VulnerabilityId: string,
    IsVulnerable: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type ListVulnerabilitiesQueryVariables = {
  VulnerabilityId?: string | null,
  filter?: ModelVulnerabilityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListVulnerabilitiesQuery = {
  listVulnerabilities?:  {
    __typename: "ModelVulnerabilityConnection",
    items:  Array< {
      __typename: "Vulnerability",
      VulnerabilityId: string,
      IsVulnerable: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncVulnerabilitiesQueryVariables = {
  filter?: ModelVulnerabilityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncVulnerabilitiesQuery = {
  syncVulnerabilities?:  {
    __typename: "ModelVulnerabilityConnection",
    items:  Array< {
      __typename: "Vulnerability",
      VulnerabilityId: string,
      IsVulnerable: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
  owner?: string | null,
};

export type OnCreateProductSubscription = {
  onCreateProduct?:  {
    __typename: "Product",
    ProductId: string,
    Name: string,
    Description: string,
    StateId?: string | null,
    Vulnerability?:  {
      __typename: "Vulnerability",
      VulnerabilityId: string,
      IsVulnerable: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    Price: number,
    ProductKey: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
  owner?: string | null,
};

export type OnUpdateProductSubscription = {
  onUpdateProduct?:  {
    __typename: "Product",
    ProductId: string,
    Name: string,
    Description: string,
    StateId?: string | null,
    Vulnerability?:  {
      __typename: "Vulnerability",
      VulnerabilityId: string,
      IsVulnerable: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    Price: number,
    ProductKey: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteProductSubscriptionVariables = {
  filter?: ModelSubscriptionProductFilterInput | null,
  owner?: string | null,
};

export type OnDeleteProductSubscription = {
  onDeleteProduct?:  {
    __typename: "Product",
    ProductId: string,
    Name: string,
    Description: string,
    StateId?: string | null,
    Vulnerability?:  {
      __typename: "Vulnerability",
      VulnerabilityId: string,
      IsVulnerable: boolean,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      owner?: string | null,
    } | null,
    Price: number,
    ProductKey: string,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnCreateVulnerabilitySubscriptionVariables = {
  filter?: ModelSubscriptionVulnerabilityFilterInput | null,
  owner?: string | null,
};

export type OnCreateVulnerabilitySubscription = {
  onCreateVulnerability?:  {
    __typename: "Vulnerability",
    VulnerabilityId: string,
    IsVulnerable: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnUpdateVulnerabilitySubscriptionVariables = {
  filter?: ModelSubscriptionVulnerabilityFilterInput | null,
  owner?: string | null,
};

export type OnUpdateVulnerabilitySubscription = {
  onUpdateVulnerability?:  {
    __typename: "Vulnerability",
    VulnerabilityId: string,
    IsVulnerable: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};

export type OnDeleteVulnerabilitySubscriptionVariables = {
  filter?: ModelSubscriptionVulnerabilityFilterInput | null,
  owner?: string | null,
};

export type OnDeleteVulnerabilitySubscription = {
  onDeleteVulnerability?:  {
    __typename: "Vulnerability",
    VulnerabilityId: string,
    IsVulnerable: boolean,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    owner?: string | null,
  } | null,
};
