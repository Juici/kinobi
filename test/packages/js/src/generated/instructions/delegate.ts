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
  DelegateArgs,
  DelegateArgsArgs,
  getDelegateArgsSerializer,
} from '../types';

// Accounts.
export type DelegateInstructionAccounts = {
  /** Delegate account key (pda of [mint id, delegate role, user id, authority id]) */
  delegateRecord: PublicKey | Pda;
  /** Owner of the delegated account */
  delegate: PublicKey | Pda;
  /** Metadata account */
  metadata: PublicKey | Pda;
  /** Master Edition account */
  masterEdition?: PublicKey | Pda;
  /** Mint of metadata */
  mint: PublicKey | Pda;
  /** Owned Token Account of mint */
  token?: PublicKey | Pda;
  /** Authority to approve the delegation */
  authority?: Signer;
  /** Payer */
  payer?: Signer;
  /** System Program */
  systemProgram?: PublicKey | Pda;
  /** Instructions sysvar account */
  sysvarInstructions?: PublicKey | Pda;
  /** SPL Token Program */
  splTokenProgram?: PublicKey | Pda;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey | Pda;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey | Pda;
};

// Data.
export type DelegateInstructionData = {
  discriminator: number;
  delegateArgs: DelegateArgs;
};

export type DelegateInstructionDataArgs = { delegateArgs: DelegateArgsArgs };

export function getDelegateInstructionDataSerializer(): Serializer<
  DelegateInstructionDataArgs,
  DelegateInstructionData
> {
  return mapSerializer<
    DelegateInstructionDataArgs,
    any,
    DelegateInstructionData
  >(
    struct<DelegateInstructionData>(
      [
        ['discriminator', u8()],
        ['delegateArgs', getDelegateArgsSerializer()],
      ],
      { description: 'DelegateInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 48 })
  ) as Serializer<DelegateInstructionDataArgs, DelegateInstructionData>;
}

// Args.
export type DelegateInstructionArgs = DelegateInstructionDataArgs;

// Instruction.
export function delegate(
  context: Pick<Context, 'identity' | 'payer' | 'programs'>,
  input: DelegateInstructionAccounts & DelegateInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    delegateRecord: {
      index: 0,
      isWritable: true,
      value: input.delegateRecord ?? null,
    },
    delegate: { index: 1, isWritable: false, value: input.delegate ?? null },
    metadata: { index: 2, isWritable: true, value: input.metadata ?? null },
    masterEdition: {
      index: 3,
      isWritable: false,
      value: input.masterEdition ?? null,
    },
    mint: { index: 4, isWritable: false, value: input.mint ?? null },
    token: { index: 5, isWritable: true, value: input.token ?? null },
    authority: { index: 6, isWritable: false, value: input.authority ?? null },
    payer: { index: 7, isWritable: true, value: input.payer ?? null },
    systemProgram: {
      index: 8,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    sysvarInstructions: {
      index: 9,
      isWritable: false,
      value: input.sysvarInstructions ?? null,
    },
    splTokenProgram: {
      index: 10,
      isWritable: false,
      value: input.splTokenProgram ?? null,
    },
    authorizationRulesProgram: {
      index: 11,
      isWritable: false,
      value: input.authorizationRulesProgram ?? null,
    },
    authorizationRules: {
      index: 12,
      isWritable: false,
      value: input.authorizationRules ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: DelegateInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }
  if (!resolvedAccounts.sysvarInstructions.value) {
    resolvedAccounts.sysvarInstructions.value = publicKey(
      'Sysvar1nstructions1111111111111111111111111'
    );
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
  const data = getDelegateInstructionDataSerializer().serialize(
    resolvedArgs as DelegateInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
