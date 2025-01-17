/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { SolAmount, mapAmountSerializer } from '@metaplex-foundation/umi';
import {
  GetDataEnumKind,
  GetDataEnumKindContent,
  Serializer,
  dataEnum,
  struct,
  u64,
  unit,
} from '@metaplex-foundation/umi/serializers';

export type DelegateArgs =
  | { __kind: 'CollectionV1' }
  | { __kind: 'SaleV1'; amount: SolAmount }
  | { __kind: 'TransferV1'; amount: bigint };

export type DelegateArgsArgs =
  | { __kind: 'CollectionV1' }
  | { __kind: 'SaleV1'; amount: SolAmount }
  | { __kind: 'TransferV1'; amount: number | bigint };

export function getDelegateArgsSerializer(): Serializer<
  DelegateArgsArgs,
  DelegateArgs
> {
  return dataEnum<DelegateArgs>(
    [
      ['CollectionV1', unit()],
      [
        'SaleV1',
        struct<GetDataEnumKindContent<DelegateArgs, 'SaleV1'>>([
          ['amount', mapAmountSerializer(u64(), 'SOL', 9)],
        ]),
      ],
      [
        'TransferV1',
        struct<GetDataEnumKindContent<DelegateArgs, 'TransferV1'>>([
          ['amount', u64()],
        ]),
      ],
    ],
    { description: 'DelegateArgs' }
  ) as Serializer<DelegateArgsArgs, DelegateArgs>;
}

// Data Enum Helpers.
export function delegateArgs(
  kind: 'CollectionV1'
): GetDataEnumKind<DelegateArgsArgs, 'CollectionV1'>;
export function delegateArgs(
  kind: 'SaleV1',
  data: GetDataEnumKindContent<DelegateArgsArgs, 'SaleV1'>
): GetDataEnumKind<DelegateArgsArgs, 'SaleV1'>;
export function delegateArgs(
  kind: 'TransferV1',
  data: GetDataEnumKindContent<DelegateArgsArgs, 'TransferV1'>
): GetDataEnumKind<DelegateArgsArgs, 'TransferV1'>;
export function delegateArgs<K extends DelegateArgsArgs['__kind']>(
  kind: K,
  data?: any
): Extract<DelegateArgsArgs, { __kind: K }> {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}
export function isDelegateArgs<K extends DelegateArgs['__kind']>(
  kind: K,
  value: DelegateArgs
): value is DelegateArgs & { __kind: K } {
  return value.__kind === kind;
}
