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
  MintNewEditionFromMasterEditionViaTokenArgs,
  MintNewEditionFromMasterEditionViaTokenArgsArgs,
  getMintNewEditionFromMasterEditionViaTokenArgsSerializer,
} from '../types';

// Accounts.
export type MintNewEditionFromMasterEditionViaTokenInstructionAccounts = {
  /** New Metadata key (pda of ['metadata', program id, mint id]) */
  newMetadata: PublicKey;
  /** New Edition (pda of ['metadata', program id, mint id, 'edition']) */
  newEdition: PublicKey;
  /** Master Record Edition V2 (pda of ['metadata', program id, master metadata mint id, 'edition']) */
  masterEdition: PublicKey;
  /** Mint of new token - THIS WILL TRANSFER AUTHORITY AWAY FROM THIS KEY */
  newMint: PublicKey;
  /** Edition pda to mark creation - will be checked for pre-existence. (pda of ['metadata', program id, master metadata mint id, 'edition', edition_number]) where edition_number is NOT the edition number you pass in args but actually edition_number = floor(edition/EDITION_MARKER_BIT_SIZE). */
  editionMarkPda: PublicKey;
  /** Mint authority of new mint */
  newMintAuthority: Signer;
  /** payer */
  payer?: Signer;
  /** owner of token account containing master token (#8) */
  tokenAccountOwner: Signer;
  /** token account containing token from master metadata mint */
  tokenAccount: PublicKey;
  /** Update authority info for new metadata */
  newMetadataUpdateAuthority: PublicKey;
  /** Master record metadata account */
  metadata: PublicKey;
  /** Token program */
  tokenProgram?: PublicKey;
  /** System program */
  systemProgram?: PublicKey;
  /** Rent info */
  rent?: PublicKey;
};

// Arguments.
export type MintNewEditionFromMasterEditionViaTokenInstructionData = {
  discriminator: number;
  mintNewEditionFromMasterEditionViaTokenArgs: MintNewEditionFromMasterEditionViaTokenArgs;
};

export type MintNewEditionFromMasterEditionViaTokenInstructionArgs = {
  mintNewEditionFromMasterEditionViaTokenArgs: MintNewEditionFromMasterEditionViaTokenArgsArgs;
};

export function getMintNewEditionFromMasterEditionViaTokenInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  MintNewEditionFromMasterEditionViaTokenInstructionArgs,
  MintNewEditionFromMasterEditionViaTokenInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    MintNewEditionFromMasterEditionViaTokenInstructionArgs,
    MintNewEditionFromMasterEditionViaTokenInstructionData,
    MintNewEditionFromMasterEditionViaTokenInstructionData
  >(
    s.struct<MintNewEditionFromMasterEditionViaTokenInstructionData>(
      [
        ['discriminator', s.u8],
        [
          'mintNewEditionFromMasterEditionViaTokenArgs',
          getMintNewEditionFromMasterEditionViaTokenArgsSerializer(context),
        ],
      ],
      'MintNewEditionFromMasterEditionViaTokenInstructionArgs'
    ),
    (value) =>
      ({
        discriminator: 11,
        ...value,
      } as MintNewEditionFromMasterEditionViaTokenInstructionData)
  ) as Serializer<
    MintNewEditionFromMasterEditionViaTokenInstructionArgs,
    MintNewEditionFromMasterEditionViaTokenInstructionData
  >;
}

// Instruction.
export function mintNewEditionFromMasterEditionViaToken(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    payer: Context['payer'];
    programs?: Context['programs'];
  },
  input: MintNewEditionFromMasterEditionViaTokenInstructionAccounts &
    MintNewEditionFromMasterEditionViaTokenInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = getProgramAddressWithFallback(
    context,
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // New Metadata.
  keys.push({ pubkey: input.newMetadata, isSigner: false, isWritable: true });

  // New Edition.
  keys.push({ pubkey: input.newEdition, isSigner: false, isWritable: true });

  // Master Edition.
  keys.push({ pubkey: input.masterEdition, isSigner: false, isWritable: true });

  // New Mint.
  keys.push({ pubkey: input.newMint, isSigner: false, isWritable: true });

  // Edition Mark Pda.
  keys.push({
    pubkey: input.editionMarkPda,
    isSigner: false,
    isWritable: true,
  });

  // New Mint Authority.
  signers.push(input.newMintAuthority);
  keys.push({
    pubkey: input.newMintAuthority.publicKey,
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

  // Token Account Owner.
  signers.push(input.tokenAccountOwner);
  keys.push({
    pubkey: input.tokenAccountOwner.publicKey,
    isSigner: true,
    isWritable: false,
  });

  // Token Account.
  keys.push({ pubkey: input.tokenAccount, isSigner: false, isWritable: false });

  // New Metadata Update Authority.
  keys.push({
    pubkey: input.newMetadataUpdateAuthority,
    isSigner: false,
    isWritable: false,
  });

  // Metadata.
  keys.push({ pubkey: input.metadata, isSigner: false, isWritable: false });

  // Token Program.
  if (input.tokenProgram) {
    keys.push({
      pubkey: input.tokenProgram,
      isSigner: false,
      isWritable: false,
    });
  } else {
    keys.push({
      pubkey: getProgramAddressWithFallback(
        context,
        'splToken',
        'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
      ),
      isSigner: false,
      isWritable: false,
    });
  }

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
    getMintNewEditionFromMasterEditionViaTokenInstructionDataSerializer(
      context
    ).serialize(input);

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}
