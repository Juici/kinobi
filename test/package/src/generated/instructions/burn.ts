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
import { addAccountMeta, addObjectProperty } from '../shared';
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

/** @deprecated Use `getBurnInstructionDataSerializer()` without any argument instead. */
export function getBurnInstructionDataSerializer(
  _context: object
): Serializer<BurnInstructionDataArgs, BurnInstructionData>;
export function getBurnInstructionDataSerializer(): Serializer<
  BurnInstructionDataArgs,
  BurnInstructionData
>;
export function getBurnInstructionDataSerializer(
  _context: object = {}
): Serializer<BurnInstructionDataArgs, BurnInstructionData> {
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
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Resolved inputs.
  const resolvedAccounts = {
    metadata: [input.metadata, true] as const,
    owner: [input.owner, true] as const,
    mint: [input.mint, true] as const,
    tokenAccount: [input.tokenAccount, true] as const,
    masterEditionAccount: [input.masterEditionAccount, true] as const,
  };
  const resolvingArgs = {};
  addObjectProperty(
    resolvedAccounts,
    'splTokenProgram',
    input.splTokenProgram
      ? ([input.splTokenProgram, false] as const)
      : ([
          context.programs.getPublicKey(
            'splToken',
            'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
          ),
          false,
        ] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'collectionMetadata',
    input.collectionMetadata
      ? ([input.collectionMetadata, true] as const)
      : ([programId, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'authorizationRules',
    input.authorizationRules
      ? ([input.authorizationRules, false] as const)
      : ([programId, false] as const)
  );
  addObjectProperty(
    resolvedAccounts,
    'authorizationRulesProgram',
    input.authorizationRulesProgram
      ? ([input.authorizationRulesProgram, false] as const)
      : ([programId, false] as const)
  );
  const resolvedArgs = { ...input, ...resolvingArgs };

  addAccountMeta(keys, signers, resolvedAccounts.metadata, false);
  addAccountMeta(keys, signers, resolvedAccounts.owner, false);
  addAccountMeta(keys, signers, resolvedAccounts.mint, false);
  addAccountMeta(keys, signers, resolvedAccounts.tokenAccount, false);
  addAccountMeta(keys, signers, resolvedAccounts.masterEditionAccount, false);
  addAccountMeta(keys, signers, resolvedAccounts.splTokenProgram, false);
  addAccountMeta(keys, signers, resolvedAccounts.collectionMetadata, false);
  addAccountMeta(keys, signers, resolvedAccounts.authorizationRules, false);
  addAccountMeta(
    keys,
    signers,
    resolvedAccounts.authorizationRulesProgram,
    false
  );

  // Data.
  const data = getBurnInstructionDataSerializer().serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
