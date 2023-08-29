/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { PublicKey } from '@metaplex-foundation/umi';
import {
  Serializer,
  bool,
  mapSerializer,
  publicKey as publicKeySerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';

export type Creator = { address: PublicKey; verified: boolean; share: number };

export type CreatorArgs = {
  address: PublicKey;
  verified?: boolean;
  share?: number;
};

/** @deprecated Use `getCreatorSerializer()` without any argument instead. */
export function getCreatorSerializer(
  _context: object
): Serializer<CreatorArgs, Creator>;
export function getCreatorSerializer(): Serializer<CreatorArgs, Creator>;
export function getCreatorSerializer(
  _context: object = {}
): Serializer<CreatorArgs, Creator> {
  return mapSerializer<CreatorArgs, any, Creator>(
    struct<Creator>(
      [
        ['address', publicKeySerializer()],
        ['verified', bool()],
        ['share', u8()],
      ],
      { description: 'Creator' }
    ),
    (value) => ({
      ...value,
      verified: value.verified ?? false,
      share: value.share ?? 42,
    })
  ) as Serializer<CreatorArgs, Creator>;
}