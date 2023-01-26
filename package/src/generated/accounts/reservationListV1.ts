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
  Option,
  PublicKey,
  RpcAccount,
  Serializer,
  assertAccountExists,
  deserializeAccount,
  mapSerializer,
} from '@lorisleiva/js-core';
import {
  ReservationV1,
  TmKey,
  getReservationV1Serializer,
  getTmKeySerializer,
} from '../types';

export type ReservationListV1 = Account<ReservationListV1AccountData>;

export type ReservationListV1AccountData = {
  key: TmKey;
  masterEdition: PublicKey;
  supplySnapshot: Option<bigint>;
  reservations: Array<ReservationV1>;
};

export type ReservationListV1AccountArgs = {
  masterEdition: PublicKey;
  supplySnapshot: Option<number | bigint>;
  reservations: Array<ReservationV1>;
};

export async function fetchReservationListV1(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey
): Promise<ReservationListV1> {
  const maybeAccount = await context.rpc.getAccount(publicKey);
  assertAccountExists(maybeAccount, 'ReservationListV1');
  return deserializeReservationListV1(context, maybeAccount);
}

export async function safeFetchReservationListV1(
  context: Pick<Context, 'rpc' | 'serializer'>,
  publicKey: PublicKey
): Promise<ReservationListV1 | null> {
  const maybeAccount = await context.rpc.getAccount(publicKey);
  return maybeAccount.exists
    ? deserializeReservationListV1(context, maybeAccount)
    : null;
}

export function deserializeReservationListV1(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): ReservationListV1 {
  return deserializeAccount(
    rawAccount,
    getReservationListV1AccountDataSerializer(context)
  );
}

export function getReservationListV1AccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<ReservationListV1AccountArgs, ReservationListV1AccountData> {
  const s = context.serializer;
  return mapSerializer<
    ReservationListV1AccountArgs,
    ReservationListV1AccountData,
    ReservationListV1AccountData
  >(
    s.struct<ReservationListV1AccountData>(
      [
        ['key', getTmKeySerializer(context)],
        ['masterEdition', s.publicKey],
        ['supplySnapshot', s.option(s.u64)],
        ['reservations', s.vec(getReservationV1Serializer(context))],
      ],
      'ReservationListV1'
    ),
    (value) => ({ ...value, key: 3 } as ReservationListV1AccountData)
  ) as Serializer<ReservationListV1AccountArgs, ReservationListV1AccountData>;
}

export function getReservationListV1Size(
  context: Pick<Context, 'serializer'>
): number | null {
  return getReservationListV1AccountDataSerializer(context).fixedSize;
}
