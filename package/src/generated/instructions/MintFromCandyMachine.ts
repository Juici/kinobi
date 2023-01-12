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

// Accounts.
export type MintFromCandyMachineInstructionAccounts = {
  candyMachine: PublicKey;
  authorityPda: PublicKey;
  mintAuthority: Signer;
  payer?: Signer;
  nftMint: PublicKey;
  nftMintAuthority?: Signer;
  nftMetadata: PublicKey;
  nftMasterEdition: PublicKey;
  collectionAuthorityRecord: PublicKey;
  collectionMint: PublicKey;
  collectionMetadata: PublicKey;
  collectionMasterEdition: PublicKey;
  collectionUpdateAuthority: PublicKey;
  tokenMetadataProgram: PublicKey;
  tokenProgram?: PublicKey;
  systemProgram?: PublicKey;
  recentSlothashes: PublicKey;
};

// Arguments.
export type MintFromCandyMachineInstructionData = {
  discriminator: Array<number>;
};

export type MintFromCandyMachineInstructionArgs = {};

export function getMintFromCandyMachineInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  MintFromCandyMachineInstructionArgs,
  MintFromCandyMachineInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    MintFromCandyMachineInstructionArgs,
    MintFromCandyMachineInstructionData,
    MintFromCandyMachineInstructionData
  >(
    s.struct<MintFromCandyMachineInstructionData>(
      [['discriminator', s.array(s.u8, 8)]],
      'mintInstructionArgs'
    ),
    (value) =>
      ({
        discriminator: [51, 57, 225, 47, 182, 146, 137, 166],
        ...value,
      } as MintFromCandyMachineInstructionData)
  ) as Serializer<
    MintFromCandyMachineInstructionArgs,
    MintFromCandyMachineInstructionData
  >;
}

// Instruction.
export function mintFromCandyMachine(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    identity: Context['identity'];
    payer: Context['payer'];
    programs?: Context['programs'];
  },
  input: MintFromCandyMachineInstructionAccounts
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

  // Authority Pda.
  keys.push({ pubkey: input.authorityPda, isSigner: false, isWritable: true });

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

  // Nft Mint.
  keys.push({ pubkey: input.nftMint, isSigner: false, isWritable: true });

  // Nft Mint Authority.
  if (input.nftMintAuthority) {
    signers.push(input.nftMintAuthority);
    keys.push({
      pubkey: input.nftMintAuthority.publicKey,
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

  // Nft Metadata.
  keys.push({ pubkey: input.nftMetadata, isSigner: false, isWritable: true });

  // Nft Master Edition.
  keys.push({
    pubkey: input.nftMasterEdition,
    isSigner: false,
    isWritable: true,
  });

  // Collection Authority Record.
  keys.push({
    pubkey: input.collectionAuthorityRecord,
    isSigner: false,
    isWritable: false,
  });

  // Collection Mint.
  keys.push({
    pubkey: input.collectionMint,
    isSigner: false,
    isWritable: false,
  });

  // Collection Metadata.
  keys.push({
    pubkey: input.collectionMetadata,
    isSigner: false,
    isWritable: true,
  });

  // Collection Master Edition.
  keys.push({
    pubkey: input.collectionMasterEdition,
    isSigner: false,
    isWritable: false,
  });

  // Collection Update Authority.
  keys.push({
    pubkey: input.collectionUpdateAuthority,
    isSigner: false,
    isWritable: false,
  });

  // Token Metadata Program.
  keys.push({
    pubkey: input.tokenMetadataProgram,
    isSigner: false,
    isWritable: false,
  });

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

  // Recent Slothashes.
  keys.push({
    pubkey: input.recentSlothashes,
    isSigner: false,
    isWritable: false,
  });

  // Data.
  const data = getMintFromCandyMachineInstructionDataSerializer(
    context
  ).serialize({});

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}
