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
  PublicKey,
  Serializer,
  Signer,
  TransactionBuilder,
  mapSerializer,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import { addObjectProperty, isWritable } from '../shared';
import { VerifyArgs, VerifyArgsArgs, getVerifyArgsSerializer } from '../types';

// Accounts.
export type VerifyInstructionAccounts = {
  /** Metadata account */
  metadata: PublicKey;
  /** Collection Update authority */
  collectionAuthority: Signer;
  /** payer */
  payer?: Signer;
  /** Token Authorization Rules account */
  authorizationRules?: PublicKey;
  /** Token Authorization Rules Program */
  authorizationRulesProgram?: PublicKey;
};

// Data.
export type VerifyInstructionData = {
  discriminator: number;
  verifyArgs: VerifyArgs;
};

export type VerifyInstructionDataArgs = { verifyArgs: VerifyArgsArgs };

export function getVerifyInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<VerifyInstructionDataArgs, VerifyInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    VerifyInstructionDataArgs,
    VerifyInstructionData,
    VerifyInstructionData
  >(
    s.struct<VerifyInstructionData>(
      [
        ['discriminator', s.u8()],
        ['verifyArgs', getVerifyArgsSerializer(context)],
      ],
      { description: 'VerifyInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 47 } as VerifyInstructionData)
  ) as Serializer<VerifyInstructionDataArgs, VerifyInstructionData>;
}

// Args.
export type VerifyInstructionArgs = VerifyInstructionDataArgs;

// Instruction.
export function verify(
  context: Pick<Context, 'serializer' | 'programs' | 'payer'>,
  input: VerifyInstructionAccounts & VerifyInstructionArgs
): TransactionBuilder {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId = {
    ...context.programs.getPublicKey(
      'mplTokenMetadata',
      'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
    ),
    isWritable: false,
  };

  // Resolved inputs.
  const resolvingAccounts = {};
  const resolvingArgs = {};
  addObjectProperty(resolvingAccounts, 'payer', input.payer ?? context.payer);
  addObjectProperty(
    resolvingAccounts,
    'authorizationRules',
    input.authorizationRules ?? programId
  );
  addObjectProperty(
    resolvingAccounts,
    'authorizationRulesProgram',
    input.authorizationRulesProgram ?? programId
  );
  const resolvedAccounts = { ...input, ...resolvingAccounts };
  const resolvedArgs = { ...input, ...resolvingArgs };

  // Metadata.
  keys.push({
    pubkey: resolvedAccounts.metadata,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.metadata, true),
  });

  // Collection Authority.
  signers.push(resolvedAccounts.collectionAuthority);
  keys.push({
    pubkey: resolvedAccounts.collectionAuthority.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.collectionAuthority, true),
  });

  // Payer.
  signers.push(resolvedAccounts.payer);
  keys.push({
    pubkey: resolvedAccounts.payer.publicKey,
    isSigner: true,
    isWritable: isWritable(resolvedAccounts.payer, true),
  });

  // Authorization Rules.
  keys.push({
    pubkey: resolvedAccounts.authorizationRules,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.authorizationRules, false),
  });

  // Authorization Rules Program.
  keys.push({
    pubkey: resolvedAccounts.authorizationRulesProgram,
    isSigner: false,
    isWritable: isWritable(resolvedAccounts.authorizationRulesProgram, false),
  });

  // Data.
  const data =
    getVerifyInstructionDataSerializer(context).serialize(resolvedArgs);

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
