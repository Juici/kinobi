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
  u64,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type UtilizeInstructionAccounts = {
  /** Metadata account */
  metadata: PublicKey | Pda;
  /** Token Account Of NFT */
  tokenAccount: PublicKey | Pda;
  /** Mint of the Metadata */
  mint: PublicKey | Pda;
  /** A Use Authority / Can be the current Owner of the NFT */
  useAuthority: Signer;
  /** Owner */
  owner: PublicKey | Pda;
  /** Token program */
  tokenProgram?: PublicKey | Pda;
  /** Associated Token program */
  ataProgram?: PublicKey | Pda;
  /** System program */
  systemProgram?: PublicKey | Pda;
  /** Rent info */
  rent?: PublicKey | Pda;
  /** Use Authority Record PDA If present the program Assumes a delegated use authority */
  useAuthorityRecord?: PublicKey | Pda;
  /** Program As Signer (Burner) */
  burner?: PublicKey | Pda;
};

// Data.
export type UtilizeInstructionData = {
  discriminator: number;
  numberOfUses: bigint;
};

export type UtilizeInstructionDataArgs = { numberOfUses: number | bigint };

export function getUtilizeInstructionDataSerializer(): Serializer<
  UtilizeInstructionDataArgs,
  UtilizeInstructionData
> {
  return mapSerializer<UtilizeInstructionDataArgs, any, UtilizeInstructionData>(
    struct<UtilizeInstructionData>(
      [
        ['discriminator', u8()],
        ['numberOfUses', u64()],
      ],
      { description: 'UtilizeInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 19 })
  ) as Serializer<UtilizeInstructionDataArgs, UtilizeInstructionData>;
}

// Args.
export type UtilizeInstructionArgs = UtilizeInstructionDataArgs;

// Instruction.
export function utilize(
  context: Pick<Context, 'programs'>,
  input: UtilizeInstructionAccounts & UtilizeInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    metadata: { index: 0, isWritable: true, value: input.metadata ?? null },
    tokenAccount: {
      index: 1,
      isWritable: true,
      value: input.tokenAccount ?? null,
    },
    mint: { index: 2, isWritable: true, value: input.mint ?? null },
    useAuthority: {
      index: 3,
      isWritable: true,
      value: input.useAuthority ?? null,
    },
    owner: { index: 4, isWritable: false, value: input.owner ?? null },
    tokenProgram: {
      index: 5,
      isWritable: false,
      value: input.tokenProgram ?? null,
    },
    ataProgram: {
      index: 6,
      isWritable: false,
      value: input.ataProgram ?? null,
    },
    systemProgram: {
      index: 7,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    rent: { index: 8, isWritable: false, value: input.rent ?? null },
    useAuthorityRecord: {
      index: 9,
      isWritable: true,
      value: input.useAuthorityRecord ?? null,
    },
    burner: { index: 10, isWritable: false, value: input.burner ?? null },
  };

  // Arguments.
  const resolvedArgs: UtilizeInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.tokenProgram.value) {
    resolvedAccounts.tokenProgram.value = context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );
    resolvedAccounts.tokenProgram.isWritable = false;
  }
  if (!resolvedAccounts.ataProgram.value) {
    resolvedAccounts.ataProgram.value = context.programs.getPublicKey(
      'splAssociatedToken',
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
    );
    resolvedAccounts.ataProgram.isWritable = false;
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
  const data = getUtilizeInstructionDataSerializer().serialize(
    resolvedArgs as UtilizeInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
