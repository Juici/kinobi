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
  UseAssetArgs,
  UseAssetArgsArgs,
  getUseAssetArgsSerializer,
} from '../types';

// Accounts.
export type UseAssetInstructionAccounts = {
  /** Metadata account */
  metadata: PublicKey | Pda;
  /** Token Account Of NFT */
  tokenAccount: PublicKey | Pda;
  /** Mint of the Metadata */
  mint: PublicKey | Pda;
  /** Use authority or current owner of the asset */
  useAuthority: Signer;
  /** Owner */
  owner: PublicKey | Pda;
  /** SPL Token program */
  splTokenProgram?: PublicKey | Pda;
  /** Associated Token program */
  ataProgram?: PublicKey | Pda;
  /** System program */
  systemProgram?: PublicKey | Pda;
  /** Use Authority Record PDA (if present the program assumes a delegated use authority) */
  useAuthorityRecord?: PublicKey | Pda;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey | Pda;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey | Pda;
};

// Data.
export type UseAssetInstructionData = {
  discriminator: number;
  useAssetArgs: UseAssetArgs;
};

export type UseAssetInstructionDataArgs = { useAssetArgs: UseAssetArgsArgs };

export function getUseAssetInstructionDataSerializer(): Serializer<
  UseAssetInstructionDataArgs,
  UseAssetInstructionData
> {
  return mapSerializer<
    UseAssetInstructionDataArgs,
    any,
    UseAssetInstructionData
  >(
    struct<UseAssetInstructionData>(
      [
        ['discriminator', u8()],
        ['useAssetArgs', getUseAssetArgsSerializer()],
      ],
      { description: 'UseAssetInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 45 })
  ) as Serializer<UseAssetInstructionDataArgs, UseAssetInstructionData>;
}

// Args.
export type UseAssetInstructionArgs = UseAssetInstructionDataArgs;

// Instruction.
export function useAsset(
  context: Pick<Context, 'programs'>,
  input: UseAssetInstructionAccounts & UseAssetInstructionArgs
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
    splTokenProgram: {
      index: 5,
      isWritable: false,
      value: input.splTokenProgram ?? null,
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
    useAuthorityRecord: {
      index: 8,
      isWritable: true,
      value: input.useAuthorityRecord ?? null,
    },
    authorizationRules: {
      index: 9,
      isWritable: false,
      value: input.authorizationRules ?? null,
    },
    authorizationRulesProgram: {
      index: 10,
      isWritable: false,
      value: input.authorizationRulesProgram ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: UseAssetInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.splTokenProgram.value) {
    resolvedAccounts.splTokenProgram.value = context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );
    resolvedAccounts.splTokenProgram.isWritable = false;
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
  const data = getUseAssetInstructionDataSerializer().serialize(
    resolvedArgs as UseAssetInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
