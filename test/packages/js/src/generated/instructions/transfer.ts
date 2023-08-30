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
import { resolveMasterEditionFromTokenStandard } from '../../hooked';
import {
  PickPartial,
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';
import {
  TokenStandard,
  TokenStandardArgs,
  TransferArgs,
  TransferArgsArgs,
  getTransferArgsSerializer,
} from '../types';

// Accounts.
export type TransferInstructionAccounts = {
  /** Transfer authority (token or delegate owner) */
  authority?: Signer;
  /** Delegate record PDA */
  delegateRecord?: PublicKey | Pda;
  /** Token account */
  token: PublicKey | Pda;
  /** Token account owner */
  tokenOwner: PublicKey | Pda;
  /** Destination token account */
  destination: PublicKey | Pda;
  /** Destination token account owner */
  destinationOwner: PublicKey | Pda;
  /** Mint of token asset */
  mint: PublicKey | Pda;
  /** Metadata (pda of ['metadata', program id, mint id]) */
  metadata: PublicKey | Pda;
  /** Master Edition of token asset */
  masterEdition?: PublicKey | Pda;
  /** SPL Token Program */
  splTokenProgram?: PublicKey | Pda;
  /** SPL Associated Token Account program */
  splAtaProgram?: PublicKey | Pda;
  /** System Program */
  systemProgram?: PublicKey | Pda;
  /** Instructions sysvar account */
  sysvarInstructions?: PublicKey | Pda;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey | Pda;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey | Pda;
};

// Data.
export type TransferInstructionData = {
  discriminator: number;
  transferArgs: TransferArgs;
};

export type TransferInstructionDataArgs = { transferArgs: TransferArgsArgs };

export function getTransferInstructionDataSerializer(): Serializer<
  TransferInstructionDataArgs,
  TransferInstructionData
> {
  return mapSerializer<
    TransferInstructionDataArgs,
    any,
    TransferInstructionData
  >(
    struct<TransferInstructionData>(
      [
        ['discriminator', u8()],
        ['transferArgs', getTransferArgsSerializer()],
      ],
      { description: 'TransferInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 46 })
  ) as Serializer<TransferInstructionDataArgs, TransferInstructionData>;
}

// Extra Args.
export type TransferInstructionExtraArgs = { tokenStandard: TokenStandardArgs };

// Args.
export type TransferInstructionArgs = PickPartial<
  TransferInstructionDataArgs & TransferInstructionExtraArgs,
  'tokenStandard'
>;

// Instruction.
export function transfer(
  context: Pick<Context, 'programs' | 'eddsa' | 'identity' | 'payer'>,
  input: TransferInstructionAccounts & TransferInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    authority: { index: 0, isWritable: true, value: input.authority ?? null },
    delegateRecord: {
      index: 1,
      isWritable: true,
      value: input.delegateRecord ?? null,
    },
    token: { index: 2, isWritable: true, value: input.token ?? null },
    tokenOwner: {
      index: 3,
      isWritable: false,
      value: input.tokenOwner ?? null,
    },
    destination: {
      index: 4,
      isWritable: true,
      value: input.destination ?? null,
    },
    destinationOwner: {
      index: 5,
      isWritable: false,
      value: input.destinationOwner ?? null,
    },
    mint: { index: 6, isWritable: false, value: input.mint ?? null },
    metadata: { index: 7, isWritable: true, value: input.metadata ?? null },
    masterEdition: {
      index: 8,
      isWritable: false,
      value: input.masterEdition ?? null,
    },
    splTokenProgram: {
      index: 9,
      isWritable: false,
      value: input.splTokenProgram ?? null,
    },
    splAtaProgram: {
      index: 10,
      isWritable: false,
      value: input.splAtaProgram ?? null,
    },
    systemProgram: {
      index: 11,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    sysvarInstructions: {
      index: 12,
      isWritable: false,
      value: input.sysvarInstructions ?? null,
    },
    authorizationRulesProgram: {
      index: 13,
      isWritable: false,
      value: input.authorizationRulesProgram ?? null,
    },
    authorizationRules: {
      index: 14,
      isWritable: false,
      value: input.authorizationRules ?? null,
    },
  };

  // Arguments.
  const resolvedArgs: TransferInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.authority.value) {
    resolvedAccounts.authority.value = context.identity;
  }
  if (!resolvedArgs.tokenStandard) {
    resolvedArgs.tokenStandard = TokenStandard.NonFungible;
  }
  if (!resolvedAccounts.masterEdition.value) {
    resolvedAccounts.masterEdition = {
      ...resolvedAccounts.masterEdition,
      ...resolveMasterEditionFromTokenStandard(
        context,
        resolvedAccounts,
        resolvedArgs,
        programId,
        false
      ),
    };
  }
  if (!resolvedAccounts.splTokenProgram.value) {
    resolvedAccounts.splTokenProgram.value = context.programs.getPublicKey(
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    );
    resolvedAccounts.splTokenProgram.isWritable = false;
  }
  if (!resolvedAccounts.splAtaProgram.value) {
    resolvedAccounts.splAtaProgram.value = context.programs.getPublicKey(
      'splAssociatedToken',
      'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
    );
    resolvedAccounts.splAtaProgram.isWritable = false;
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
    resolvedAccounts.sysvarInstructions.isWritable = false;
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
  const data = getTransferInstructionDataSerializer().serialize(
    resolvedArgs as TransferInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
