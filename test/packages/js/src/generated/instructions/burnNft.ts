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

// Accounts.
export type BurnNftInstructionAccounts = {
  /** Metadata (pda of ['metadata', program id, mint id]) */
  metadata: PublicKey | Pda;
  /** NFT owner */
  owner: Signer;
  /** Mint of the NFT */
  mint: PublicKey | Pda;
  /** Token account to close */
  tokenAccount: PublicKey | Pda;
  /** MasterEdition2 of the NFT */
  masterEditionAccount: PublicKey | Pda;
  /** SPL Token Program */
  splTokenProgram?: PublicKey | Pda;
  /** Metadata of the Collection */
  collectionMetadata?: PublicKey | Pda;
};

// Data.
export type BurnNftInstructionData = { discriminator: number };

export type BurnNftInstructionDataArgs = {};

export function getBurnNftInstructionDataSerializer(): Serializer<
  BurnNftInstructionDataArgs,
  BurnNftInstructionData
> {
  return mapSerializer<BurnNftInstructionDataArgs, any, BurnNftInstructionData>(
    struct<BurnNftInstructionData>([['discriminator', u8()]], {
      description: 'BurnNftInstructionData',
    }),
    (value) => ({ ...value, discriminator: 29 })
  ) as Serializer<BurnNftInstructionDataArgs, BurnNftInstructionData>;
}

// Instruction.
export function burnNft(
  context: Pick<Context, 'programs'>,
  input: BurnNftInstructionAccounts
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
  };

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
  const data = getBurnNftInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
