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
import { DataV2, DataV2Args, getDataV2Serializer } from '../types';

// Accounts.
export type CreateMetadataAccountV2InstructionAccounts = {
  /** Metadata key (pda of ['metadata', program id, mint id]) */
  metadata: PublicKey;
  /** Mint of token asset */
  mint: PublicKey;
  /** Mint authority */
  mintAuthority: Signer;
  /** payer */
  payer?: Signer;
  /** update authority info */
  updateAuthority: PublicKey;
  /** System program */
  systemProgram?: PublicKey;
  /** Rent info */
  rent?: PublicKey;
};

// Arguments.
export type CreateMetadataAccountV2InstructionData = {
  discriminator: number;
  data: DataV2;
  isMutable: boolean;
};

export type CreateMetadataAccountV2InstructionArgs = {
  data: DataV2Args;
  isMutable: boolean;
};

export function getCreateMetadataAccountV2InstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  CreateMetadataAccountV2InstructionArgs,
  CreateMetadataAccountV2InstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    CreateMetadataAccountV2InstructionArgs,
    CreateMetadataAccountV2InstructionData,
    CreateMetadataAccountV2InstructionData
  >(
    s.struct<CreateMetadataAccountV2InstructionData>(
      [
        ['discriminator', s.u8],
        ['data', getDataV2Serializer(context)],
        ['isMutable', s.bool],
      ],
      'CreateMetadataAccountV2InstructionArgs'
    ),
    (value) =>
      ({
        discriminator: 16,
        ...value,
      } as CreateMetadataAccountV2InstructionData)
  ) as Serializer<
    CreateMetadataAccountV2InstructionArgs,
    CreateMetadataAccountV2InstructionData
  >;
}

// Instruction.
export function createMetadataAccountV2(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    payer: Context['payer'];
    programs?: Context['programs'];
  },
  input: CreateMetadataAccountV2InstructionAccounts &
    CreateMetadataAccountV2InstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = getProgramAddressWithFallback(
    context,
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Metadata.
  keys.push({ pubkey: input.metadata, isSigner: false, isWritable: true });

  // Mint.
  keys.push({ pubkey: input.mint, isSigner: false, isWritable: false });

  // Mint Authority.
  signers.push(input.mintAuthority);
  keys.push({
    pubkey: input.mintAuthority.publicKey,
    isSigner: true,
    isWritable: false,
  });

  // Payer.
  if (input.payer) {
    signers.push(input.payer);
    keys.push({
      pubkey: input.payer.publicKey,
      isSigner: true,
      isWritable: true,
    });
  } else {
    signers.push(context.payer);
    keys.push({
      pubkey: context.payer.publicKey,
      isSigner: true,
      isWritable: true,
    });
  }

  // Update Authority.
  keys.push({
    pubkey: input.updateAuthority,
    isSigner: false,
    isWritable: false,
  });

  // System Program.
  if (input.systemProgram) {
    keys.push({
      pubkey: input.systemProgram,
      isSigner: false,
      isWritable: false,
    });
  } else {
    keys.push({
      pubkey: getProgramAddressWithFallback(
        context,
        'splSystem',
        '11111111111111111111111111111111'
      ),
      isSigner: false,
      isWritable: false,
    });
  }

  // Rent (optional).
  if (input.rent) {
    keys.push({ pubkey: input.rent, isSigner: false, isWritable: false });
  }

  // Data.
  const data =
    getCreateMetadataAccountV2InstructionDataSerializer(context).serialize(
      input
    );

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}
