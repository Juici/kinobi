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
  publicKey,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';
import {
  CreateMasterEditionArgs,
  CreateMasterEditionArgsArgs,
  getCreateMasterEditionArgsSerializer,
} from '../types';

// Accounts.
export type CreateMasterEditionInstructionAccounts = {
  /** Unallocated edition V2 account with address as pda of ['metadata', program id, mint, 'edition'] */
  edition: PublicKey | Pda;
  /** Metadata mint */
  mint: PublicKey | Pda;
  /** Update authority */
  updateAuthority: Signer;
  /** Mint authority on the metadata's mint - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY */
  mintAuthority: Signer;
  /** payer */
  payer?: Signer;
  /** Metadata account */
  metadata: PublicKey | Pda;
  /** Token program */
  tokenProgram?: PublicKey | Pda;
  /** System program */
  systemProgram?: PublicKey | Pda;
  /** Rent info */
  rent?: PublicKey | Pda;
};

// Data.
export type CreateMasterEditionInstructionData = {
  discriminator: number;
  createMasterEditionArgs: CreateMasterEditionArgs;
};

export type CreateMasterEditionInstructionDataArgs = {
  createMasterEditionArgs: CreateMasterEditionArgsArgs;
};

export function getCreateMasterEditionInstructionDataSerializer(): Serializer<
  CreateMasterEditionInstructionDataArgs,
  CreateMasterEditionInstructionData
> {
  return mapSerializer<
    CreateMasterEditionInstructionDataArgs,
    any,
    CreateMasterEditionInstructionData
  >(
    struct<CreateMasterEditionInstructionData>(
      [
        ['discriminator', u8()],
        ['createMasterEditionArgs', getCreateMasterEditionArgsSerializer()],
      ],
      { description: 'CreateMasterEditionInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 10 })
  ) as Serializer<
    CreateMasterEditionInstructionDataArgs,
    CreateMasterEditionInstructionData
  >;
}

// Args.
export type CreateMasterEditionInstructionArgs =
  CreateMasterEditionInstructionDataArgs;

// Instruction.
export function createMasterEdition(
  context: Pick<Context, 'programs' | 'payer'>,
  input: CreateMasterEditionInstructionAccounts &
    CreateMasterEditionInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    edition: { index: 0, isWritable: true, value: input.edition ?? null },
    mint: { index: 1, isWritable: true, value: input.mint ?? null },
    updateAuthority: {
      index: 2,
      isWritable: false,
      value: input.updateAuthority ?? null,
    },
    mintAuthority: {
      index: 3,
      isWritable: false,
      value: input.mintAuthority ?? null,
    },
    payer: { index: 4, isWritable: true, value: input.payer ?? null },
    metadata: { index: 5, isWritable: false, value: input.metadata ?? null },
    tokenProgram: {
      index: 6,
      isWritable: false,
      value: input.tokenProgram ?? null,
    },
    systemProgram: {
      index: 7,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    rent: { index: 8, isWritable: false, value: input.rent ?? null },
  };

  // Arguments.
  const resolvedArgs: CreateMasterEditionInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.tokenProgram.value) {
    resolvedAccounts.tokenProgram.value = context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );
    resolvedAccounts.tokenProgram.isWritable = false;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }
  if (!resolvedAccounts.rent.value) {
    resolvedAccounts.rent.value = publicKey(
      'SysvarRent111111111111111111111111111111111'
    );
    resolvedAccounts.rent.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getCreateMasterEditionInstructionDataSerializer().serialize(
    resolvedArgs as CreateMasterEditionInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
