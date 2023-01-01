/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Context, Serializer } from '@lorisleiva/js-core';

export type SetCollectionSizeArgs = { size: bigint };
export type SetCollectionSizeArgsArgs = { size: number | bigint };

export function getSetCollectionSizeArgsSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<SetCollectionSizeArgsArgs, SetCollectionSizeArgs> {
  const s = context.serializer;
  return s.struct<SetCollectionSizeArgs>(
    [['size', s.u64]],
    'SetCollectionSizeArgs'
  ) as Serializer<SetCollectionSizeArgsArgs, SetCollectionSizeArgs>;
}