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
  getProgramAddressWithFallback,
  mapSerializer,
} from '@lorisleiva/js-core';
import {
  CandyMachineData,
  CandyMachineDataArgs,
  getCandyMachineDataSerializer,
} from '../types';

// Accounts.
export type UpdateInstructionAccounts = {
  candyMachine: PublicKey;
  authority?: Signer;
};

// Arguments.
export type UpdateInstructionData = {
  discriminator: Array<number>;
  data: CandyMachineData;
};

export type UpdateInstructionArgs = { data: CandyMachineDataArgs };

export function getUpdateInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<UpdateInstructionArgs, UpdateInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    UpdateInstructionArgs,
    UpdateInstructionData,
    UpdateInstructionData
  >(
    s.struct<UpdateInstructionData>(
      [
        ['discriminator', s.array(s.u8, 8)],
        ['data', getCandyMachineDataSerializer(context)],
      ],
      'updateInstructionArgs'
    ),
    (value) =>
      ({
        discriminator: [219, 200, 88, 176, 158, 63, 253, 127],
        ...value,
      } as UpdateInstructionData)
  ) as Serializer<UpdateInstructionArgs, UpdateInstructionData>;
}

// Instruction.
export function update(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    identity: Context['identity'];
    programs?: Context['programs'];
  },
  input: UpdateInstructionAccounts & UpdateInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = getProgramAddressWithFallback(
    context,
    'mplCandyMachineCore',
    'CndyV3LdqHUfDLmE5naZjVN8rBZz4tqhdefbAnjHG3JR'
  );

  // Candy Machine.
  keys.push({ pubkey: input.candyMachine, isSigner: false, isWritable: true });

  // Authority.
  if (input.authority) {
    signers.push(input.authority);
    keys.push({
      pubkey: input.authority.publicKey,
      isSigner: true,
      isWritable: false,
    });
  } else {
    signers.push(context.identity);
    keys.push({
      pubkey: context.identity.publicKey,
      isSigner: true,
      isWritable: false,
    });
  }

  // Data.
  const data = getUpdateInstructionDataSerializer(context).serialize(input);

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}
