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
  CandyMachineData,
  CandyMachineDataArgs,
  getCandyMachineDataSerializer,
} from '../types';

export type CandyMachine = Account<CandyMachineAccountData>;

export type CandyMachineAccountData = {
  discriminator: Array<number>;
  /** Features versioning flags. */
  features: bigint;
  /** Authority address. */
  authority: PublicKey;
  /** Authority address allowed to mint from the candy machine. */
  mintAuthority: PublicKey;
  /** The collection mint for the candy machine. */
  collectionMint: PublicKey;
  /** Number of assets redeemed. */
  itemsRedeemed: bigint;
  /** Candy machine configuration data. */
  data: CandyMachineData;
};

export type CandyMachineAccountArgs = {
  /** Features versioning flags. */
  features: number | bigint;
  /** Authority address. */
  authority: PublicKey;
  /** Authority address allowed to mint from the candy machine. */
  mintAuthority: PublicKey;
  /** The collection mint for the candy machine. */
  collectionMint: PublicKey;
  /** Number of assets redeemed. */
  itemsRedeemed: number | bigint;
  /** Candy machine configuration data. */
  data: CandyMachineDataArgs;
};

export async function fetchCandyMachine(
  context: Pick<Context, 'rpc' | 'serializer'>,
  address: PublicKey
): Promise<CandyMachine> {
  const maybeAccount = await context.rpc.getAccount(address);
  assertAccountExists(maybeAccount, 'CandyMachine');
  return deserializeCandyMachine(context, maybeAccount);
}

export async function safeFetchCandyMachine(
  context: Pick<Context, 'rpc' | 'serializer'>,
  address: PublicKey
): Promise<CandyMachine | null> {
  const maybeAccount = await context.rpc.getAccount(address);
  return maybeAccount.exists
    ? deserializeCandyMachine(context, maybeAccount)
    : null;
}

export function deserializeCandyMachine(
  context: Pick<Context, 'serializer'>,
  rawAccount: RpcAccount
): CandyMachine {
  return deserializeAccount(
    rawAccount,
    getCandyMachineAccountDataSerializer(context)
  );
}

export function getCandyMachineAccountDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<CandyMachineAccountArgs, CandyMachineAccountData> {
  const s = context.serializer;
  return mapSerializer<
    CandyMachineAccountArgs,
    CandyMachineAccountData,
    CandyMachineAccountData
  >(
    s.struct<CandyMachineAccountData>(
      [
        ['discriminator', s.array(s.u8, 8)],
        ['features', s.u64],
        ['authority', s.publicKey],
        ['mintAuthority', s.publicKey],
        ['collectionMint', s.publicKey],
        ['itemsRedeemed', s.u64],
        ['data', getCandyMachineDataSerializer(context)],
      ],
      'CandyMachine'
    ),
    (value) =>
      ({
        discriminator: [115, 157, 18, 166, 35, 44, 221, 13],
        ...value,
      } as CandyMachineAccountData)
  ) as Serializer<CandyMachineAccountArgs, CandyMachineAccountData>;
}

export function getCandyMachineSize(): number {
  return 42;
}
