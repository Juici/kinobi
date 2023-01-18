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
  WrappedInstruction,
  checkForIsWritableOverride as isWritable,
  getProgramAddressWithFallback,
  mapSerializer,
} from '@lorisleiva/js-core';

// Accounts.
export type CreateFrequencyRuleInstructionAccounts = {
  /** Payer and creator of the Frequency Rule */
  payer?: Signer;
  /** The PDA account where the Frequency Rule is stored */
  frequencyPda: PublicKey;
  /** System program */
  systemProgram?: PublicKey;
};

// Arguments.
export type CreateFrequencyRuleInstructionData = {
  discriminator: number;
  ruleSetName: string;
  freqRuleName: string;
  lastUpdate: bigint;
  period: bigint;
};

export type CreateFrequencyRuleInstructionArgs = {
  ruleSetName: string;
  freqRuleName: string;
  lastUpdate: number | bigint;
  period: number | bigint;
};

export function getCreateFrequencyRuleInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  CreateFrequencyRuleInstructionArgs,
  CreateFrequencyRuleInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    CreateFrequencyRuleInstructionArgs,
    CreateFrequencyRuleInstructionData,
    CreateFrequencyRuleInstructionData
  >(
    s.struct<CreateFrequencyRuleInstructionData>(
      [
        ['discriminator', s.u8],
        ['ruleSetName', s.string],
        ['freqRuleName', s.string],
        ['lastUpdate', s.i64],
        ['period', s.i64],
      ],
      'CreateFrequencyRuleInstructionArgs'
    ),
    (value) =>
      ({ discriminator: 2, ...value } as CreateFrequencyRuleInstructionData)
  ) as Serializer<
    CreateFrequencyRuleInstructionArgs,
    CreateFrequencyRuleInstructionData
  >;
}

// Instruction.
export function createFrequencyRule(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    payer: Context['payer'];
    programs?: Context['programs'];
  },
  input: CreateFrequencyRuleInstructionAccounts &
    CreateFrequencyRuleInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = getProgramAddressWithFallback(
    context,
    'mplTokenAuthRules',
    'auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg'
  );

  // Resolved accounts.
  const payerAccount = input.payer ?? context.payer.publicKey;
  const frequencyPdaAccount = input.frequencyPda;
  const systemProgramAccount = input.systemProgram ?? {
    ...getProgramAddressWithFallback(
      context,
      'splSystem',
      '11111111111111111111111111111111'
    ),
    isWritable: false,
  };

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // Frequency Pda.
  keys.push({
    pubkey: frequencyPdaAccount,
    isSigner: false,
    isWritable: isWritable(frequencyPdaAccount, true),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Data.
  const data =
    getCreateFrequencyRuleInstructionDataSerializer(context).serialize(input);

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}
