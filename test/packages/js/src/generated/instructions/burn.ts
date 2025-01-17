/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
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
import { BurnArgs, BurnArgsArgs, getBurnArgsSerializer } from '../types';

// Accounts.
export type BurnInstructionAccounts = {
  /** Metadata (pda of ['metadata', program id, mint id]) */
  metadata: PublicKey | Pda;
  /** Asset owner */
  owner: Signer;
  /** Mint of token asset */
  mint: PublicKey | Pda;
  /** Token account to close */
  tokenAccount: PublicKey | Pda;
  /** MasterEdition of the asset */
  masterEditionAccount: PublicKey | Pda;
  /** SPL Token Program */
  splTokenProgram?: PublicKey | Pda;
  /** Metadata of the Collection */
  collectionMetadata?: PublicKey | Pda;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey | Pda;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey | Pda;
};

// Data.
export type BurnInstructionData = { discriminator: number; burnArgs: BurnArgs };

export type BurnInstructionDataArgs = { burnArgs: BurnArgsArgs };

export function getBurnInstructionDataSerializer(): Serializer<
  BurnInstructionDataArgs,
  BurnInstructionData
> {
  return mapSerializer<BurnInstructionDataArgs, any, BurnInstructionData>(
    struct<BurnInstructionData>(
      [
        ['discriminator', u8()],
        ['burnArgs', getBurnArgsSerializer()],
      ],
      { description: 'BurnInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 44 })
  ) as Serializer<BurnInstructionDataArgs, BurnInstructionData>;
}

// Args.
export type BurnInstructionArgs = BurnInstructionDataArgs;

// Instruction.
export function burn(
  context: Pick<Context, 'programs'>,
  input: BurnInstructionAccounts & BurnInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    metadata: { index: 0, isWritable: true, value: input.metadata ?? null },
    owner: { index: 1, isWritable: true, value: input.owner ?? null },
    mint: { index: 2, isWritable: true, value: input.mint ?? null },
    tokenAccount: {
      index: 3,
      isWritable: true,
      value: input.tokenAccount ?? null,
    },
    masterEditionAccount: {
      index: 4,
      isWritable: true,
      value: input.masterEditionAccount ?? null,
    },
    splTokenProgram: {
      index: 5,
      isWritable: false,
      value: input.splTokenProgram ?? null,
    },
    collectionMetadata: {
      index: 6,
      isWritable: true,
      value: input.collectionMetadata ?? null,
    },
    authorizationRules: {
      index: 7,
      isWritable: false,
      value: input.authorizationRules ?? null,
    },
    authorizationRulesProgram: {
      index: 8,
      isWritable: false,
      value: input.authorizationRulesProgram ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: BurnInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.splTokenProgram.value) {
    resolvedAccounts.splTokenProgram.value = context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );
    resolvedAccounts.splTokenProgram.isWritable = false;
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
  const data = getBurnInstructionDataSerializer().serialize(
    resolvedArgs as BurnInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
