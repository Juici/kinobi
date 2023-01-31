/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Account,
  Context,
  PublicKey,
  RpcAccount,
  Serializer,
  assertAccountExists,
  deserializeAccount,
  gpaBuilder,
  mapSerializer,
} from '@lorisleiva/js-core';
import { TmKey, getTmKeySerializer } from '../types';

export type EditionMarker = Account<EditionMarkerAccountData>;

export type EditionMarkerAccountData = { key: TmKey; ledger: Array<number> };

export type EditionMarkerAccountArgs = { ledger: Array<number> };

export async function fetchEditionMarker(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey
): Promise<EditionMarker> {
  const maybeAccount = await context.rpc.getAccount(publicKey);
  assertAccountExists(maybeAccount, 'EditionMarker');
  return deserializeEditionMarker(context, maybeAccount);
}

export async function safeFetchEditionMarker(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey
): Promise<EditionMarker | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey);
  return maybeAccount.exists
    ? deserializeEditionMarker(context, maybeAccount)
    : null;
}

export async function getEditionMarkerGpaBuilder(
  context: Pick<Context, 'rpc' | 'serializer' | 'programs'>,
  publicKey: PublicKey
) {
  const s = context.serializer;
  return gpaBuilder<{ key: TmKey; ledger: Array<number> }>(
    context,
    context.programs.get('mplTokenMetadata').publicKey,
    [
      ['key', getTmKeySerializer(context)],
      ['ledger', s.array(s.u8, 31)],
    ]
  ).whereField('key', TmKey.EditionMarker);
}

export function deserializeEditionMarker(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): EditionMarker {
  return deserializeAccount(
    rawAccount,
    getEditionMarkerAccountDataSerializer(context)
  );
}

export function getEditionMarkerAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<EditionMarkerAccountArgs, EditionMarkerAccountData> {
  const s = context.serializer;
  return mapSerializer<
    EditionMarkerAccountArgs,
    EditionMarkerAccountData,
    EditionMarkerAccountData
  >(
    s.struct<EditionMarkerAccountData>(
      [
        ['key', getTmKeySerializer(context)],
        ['ledger', s.array(s.u8, 31)],
      ],
      'EditionMarker'
    ),
    (value) =>
      ({ ...value, key: TmKey.EditionMarker } as EditionMarkerAccountData)
  ) as Serializer<EditionMarkerAccountArgs, EditionMarkerAccountData>;
}

export function getEditionMarkerSize(_context = {}): number {
  return 32;
}
