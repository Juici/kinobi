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
  mapSerializer,
} from '@lorisleiva/js-core';
import { TaKey, getTaKeySerializer } from '../types';

export type FrequencyAccount = Account<FrequencyAccountAccountData>;

export type FrequencyAccountAccountData = {
  /** Test with only one line. */
  key: TaKey;
  /**
   * Test with multiple lines
   * and this is the second line.
   */
  lastUpdate: bigint;
  period: bigint;
};

export type FrequencyAccountAccountArgs = {
  /**
   * Test with multiple lines
   * and this is the second line.
   */
  lastUpdate: number | bigint;
  period: number | bigint;
};

export async function fetchFrequencyAccount(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey
): Promise<FrequencyAccount> {
  const maybeAccount = await context.rpc.getAccount(publicKey);
  assertAccountExists(maybeAccount, 'FrequencyAccount');
  return deserializeFrequencyAccount(context, maybeAccount);
}

export async function safeFetchFrequencyAccount(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey
): Promise<FrequencyAccount | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey);
  return maybeAccount.exists
    ? deserializeFrequencyAccount(context, maybeAccount)
    : null;
}

export function deserializeFrequencyAccount(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): FrequencyAccount {
  return deserializeAccount(
    rawAccount,
    getFrequencyAccountAccountDataSerializer(context)
  );
}

export function getFrequencyAccountAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<FrequencyAccountAccountArgs, FrequencyAccountAccountData> {
  const s = context.serializer;
  return mapSerializer<
    FrequencyAccountAccountArgs,
    FrequencyAccountAccountData,
    FrequencyAccountAccountData
  >(
    s.struct<FrequencyAccountAccountData>(
      [
        ['key', getTaKeySerializer(context)],
        ['lastUpdate', s.i64],
        ['period', s.i64],
      ],
      'FrequencyAccount'
    ),
    (value) => ({ key: 1, ...value } as FrequencyAccountAccountData)
  ) as Serializer<FrequencyAccountAccountArgs, FrequencyAccountAccountData>;
}

export function getFrequencyAccountSize(_context = {}): number {
  return 17;
}