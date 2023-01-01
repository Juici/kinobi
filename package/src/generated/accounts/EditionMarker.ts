/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Key, getKeySerializer } from '../types';
import {
  Account,
  Context,
  PublicKey,
  RpcAccount,
  Serializer,
  assertAccountExists,
  deserializeAccount,
} from '@lorisleiva/js-core';

export type EditionMarker = { key: Key; ledger: Array<number> };

export async function fetchEditionMarker(
  context: Pick<Context, 'rpc' | 'serializer'>,
  address: PublicKey
): Promise<Account<EditionMarker>> {
  const maybeAccount = await context.rpc.getAccount(address);
  assertAccountExists(maybeAccount, 'EditionMarker');
  return deserializeEditionMarker(context, maybeAccount);
}

export async function safeFetchEditionMarker(
  context: Pick<Context, 'rpc' | 'serializer'>,
  address: PublicKey
): Promise<Account<EditionMarker> | null> {
  const maybeAccount = await context.rpc.getAccount(address);
  return maybeAccount.exists
    ? deserializeEditionMarker(context, maybeAccount)
    : null;
}

export function deserializeEditionMarker(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): Account<EditionMarker> {
  return deserializeAccount(rawAccount, getEditionMarkerSerializer(context));
}

export function getEditionMarkerSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<EditionMarker> {
  const s = context.serializer;
  return s.struct<EditionMarker>(
    [
      ['key', getKeySerializer(context)],
      ['ledger', s.array(s.u8, 31)],
    ],
    'EditionMarker'
  );
}