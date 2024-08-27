import { ModelInit, MutableModel, __modelMeta__, CompositeIdentifier, CustomIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";





type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<Product, ['ProductId', 'Name']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly ProductId: string;
  readonly Name: string;
  readonly Description: string;
  readonly StateId?: string | null;
  readonly Vulnerability?: Vulnerability | null;
  readonly Price: number;
  readonly ProductKey: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<Product, ['ProductId', 'Name']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly ProductId: string;
  readonly Name: string;
  readonly Description: string;
  readonly StateId?: string | null;
  readonly Vulnerability: AsyncItem<Vulnerability | undefined>;
  readonly Price: number;
  readonly ProductKey: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

type EagerVulnerability = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<Vulnerability, 'VulnerabilityId'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly VulnerabilityId: string;
  readonly Installed: number;
  readonly Critical: number;
  readonly High: number;
  readonly Medium: number;
  readonly Low: number;
  readonly Unknown: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyVulnerability = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<Vulnerability, 'VulnerabilityId'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly VulnerabilityId: string;
  readonly Installed: number;
  readonly Critical: number;
  readonly High: number;
  readonly Medium: number;
  readonly Low: number;
  readonly Unknown: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Vulnerability = LazyLoading extends LazyLoadingDisabled ? EagerVulnerability : LazyVulnerability

export declare const Vulnerability: (new (init: ModelInit<Vulnerability>) => Vulnerability) & {
  copyOf(source: Vulnerability, mutator: (draft: MutableModel<Vulnerability>) => MutableModel<Vulnerability> | void): Vulnerability;
}