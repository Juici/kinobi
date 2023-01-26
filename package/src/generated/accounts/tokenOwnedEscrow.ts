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
import {
  EscrowAuthority,
  TmKey,
  getEscrowAuthoritySerializer,
  getTmKeySerializer,
} from '../types';

export type TokenOwnedEscrow = Account<TokenOwnedEscrowAccountData>;

export type TokenOwnedEscrowAccountData = {
  key: TmKey;
  baseToken: PublicKey;
  authority: EscrowAuthority;
  bump: number;
};

export type TokenOwnedEscrowAccountArgs = {
  baseToken: PublicKey;
  authority: EscrowAuthority;
  bump: number;
};

export async function fetchTokenOwnedEscrow(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey
): Promise<TokenOwnedEscrow> {
  const maybeAccount = await context.rpc.getAccount(publicKey);
  assertAccountExists(maybeAccount, 'TokenOwnedEscrow');
  return deserializeTokenOwnedEscrow(context, maybeAccount);
}

export async function safeFetchTokenOwnedEscrow(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey
): Promise<TokenOwnedEscrow | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey);
  return maybeAccount.exists
    ? deserializeTokenOwnedEscrow(context, maybeAccount)
    : null;
}

export function deserializeTokenOwnedEscrow(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): TokenOwnedEscrow {
  return deserializeAccount(
    rawAccount,
    getTokenOwnedEscrowAccountDataSerializer(context)
  );
}

export function getTokenOwnedEscrowAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<TokenOwnedEscrowAccountArgs, TokenOwnedEscrowAccountData> {
  const s = context.serializer;
  return mapSerializer<
    TokenOwnedEscrowAccountArgs,
    TokenOwnedEscrowAccountData,
    TokenOwnedEscrowAccountData
  >(
    s.struct<TokenOwnedEscrowAccountData>(
      [
        ['key', getTmKeySerializer(context)],
        ['baseToken', s.publicKey],
        ['authority', getEscrowAuthoritySerializer(context)],
        ['bump', s.u8],
      ],
      'TokenOwnedEscrow'
    ),
    (value) => ({ ...value, key: 10 } as TokenOwnedEscrowAccountData)
  ) as Serializer<TokenOwnedEscrowAccountArgs, TokenOwnedEscrowAccountData>;
}

export function getTokenOwnedEscrowSize(
  context: Pick<Context, 'serializer'>
): number | null {
  return getTokenOwnedEscrowAccountDataSerializer(context).fixedSize;
}
