/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  AccountMeta,
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import { addAccountMeta, addObjectProperty } from '../shared';
import {
  CandyMachineData,
  CandyMachineDataArgs,
  getCandyMachineDataSerializer,
} from '../types';

// Accounts.
export type InitializeInstructionAccounts = {
  candyMachine: PublicKey | Pda;
  authorityPda: PublicKey | Pda;
  authority?: PublicKey | Pda;
  payer?: Signer;
  collectionMetadata: PublicKey | Pda;
  collectionMint: PublicKey | Pda;
  collectionMasterEdition: PublicKey | Pda;
  collectionUpdateAuthority: Signer;
  collectionAuthorityRecord: PublicKey | Pda;
  tokenMetadataProgram?: PublicKey | Pda;
  systemProgram?: PublicKey | Pda;
};

// Data.
export type InitializeInstructionData = {
  discriminator: Array<number>;
  data: CandyMachineData;
};

export type InitializeInstructionDataArgs = { data: CandyMachineDataArgs };

/** @deprecated Use `getInitializeInstructionDataSerializer()` without any argument instead. */
export function getInitializeInstructionDataSerializer(
  _context: object
): Serializer<InitializeInstructionDataArgs, InitializeInstructionData>;
export function getInitializeInstructionDataSerializer(): Serializer<
  InitializeInstructionDataArgs,
  InitializeInstructionData
>;
export function getInitializeInstructionDataSerializer(
  _context: object = {}
): Serializer<InitializeInstructionDataArgs, InitializeInstructionData> {
  return mapSerializer<
    InitializeInstructionDataArgs,
    any,
    InitializeInstructionData
  >(
    struct<InitializeInstructionData>(
      [
        ['discriminator', array(u8(), { size: 8 })],
        ['data', getCandyMachineDataSerializer()],
      ],
      { description: 'InitializeInstructionData' }
    ),
    (value) => ({
      ...value,
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
    })
  ) as Serializer<InitializeInstructionDataArgs, InitializeInstructionData>;
}

// Args.
export type InitializeInstructionArgs = InitializeInstructionDataArgs;

// Instruction.
export function initialize(
  context: Pick<Context, 'programs' | 'identity' | 'payer'>,
  input: InitializeInstructionAccounts & InitializeInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCandyMachineCore',
    'CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR'
  );

  // Resolved inputs.
  const resolvedAccounts = {
    candyMachine: [input.candyMachine, true] as const,
    authorityPda: [input.authorityPda, true] as const,
    collectionMetadata: [input.collectionMetadata, false] as const,
    collectionMint: [input.collectionMint, false] as const,
    collectionMasterEdition: [input.collectionMasterEdition, false] as const,
    collectionUpdateAuthority: [input.collectionUpdateAuthority, true] as const,
    collectionAuthorityRecord: [input.collectionAuthorityRecord, true] as const,
  };
  const resolvingArgs = {};
  addObjectProperty(
    resolvedAccounts,
    'authority',
    input.authority
      ? ([input.authority, false] as const)
      : ([context.identity.publicKey, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'payer',
    input.payer
      ? ([input.payer, false] as const)
      : ([context.payer, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'tokenMetadataProgram',
    input.tokenMetadataProgram
      ? ([input.tokenMetadataProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'mplTokenMetadata',
            'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'systemProgram',
    input.systemProgram
      ? ([input.systemProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'splSystem',
            '11111111111111111111111111111111'
          ),
          false,
        ] as const)
  );
  const resolvedArgs = { ...input, ...resolvingArgs };

  addAccountMeta(keys, signers, resolvedAccounts.candyMachine, false);
  addAccountMeta(keys, signers, resolvedAccounts.authorityPda, false);
  addAccountMeta(keys, signers, resolvedAccounts.authority, false);
  addAccountMeta(keys, signers, resolvedAccounts.payer, false);
  addAccountMeta(keys, signers, resolvedAccounts.collectionMetadata, false);
  addAccountMeta(keys, signers, resolvedAccounts.collectionMint, false);
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.collectionMasterEdition,
    false
  );
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.collectionUpdateAuthority,
    false
  );
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.collectionAuthorityRecord,
    false
  );
  addAccountMeta(keys, signers, resolvedAccounts.tokenMetadataProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.systemProgram, false);

  // Data.
  const data = getInitializeInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}