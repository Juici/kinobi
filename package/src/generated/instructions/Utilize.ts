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
export type UtilizeInstructionAccounts = {
  /** Metadata account */
  metadata: PublicKey;
  /** Token Account Of NFT */
  tokenAccount: PublicKey;
  /** Mint of the Metadata */
  mint: PublicKey;
  /** A Use Authority / Can be the current Owner of the NFT */
  useAuthority: Signer;
  /** Owner */
  owner: PublicKey;
  /** Token program */
  tokenProgram?: PublicKey;
  /** Associated Token program */
  ataProgram?: PublicKey;
  /** System program */
  systemProgram?: PublicKey;
  /** Rent info */
  rent?: PublicKey;
  /** Use Authority Record PDA If present the program Assumes a delegated use authority */
  useAuthorityRecord?: PublicKey;
  /** Program As Signer (Burner) */
  burner?: PublicKey;
};

// Arguments.
export type UtilizeInstructionData = {
  discriminator: number;
  numberOfUses: bigint;
};

export type UtilizeInstructionArgs = { numberOfUses: number | bigint };

export function getUtilizeInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<UtilizeInstructionArgs, UtilizeInstructionData> {
  const s = context.serializer;
  return mapSerializer<
    UtilizeInstructionArgs,
    UtilizeInstructionData,
    UtilizeInstructionData
  >(
    s.struct<UtilizeInstructionData>(
      [
        ['discriminator', s.u8],
        ['numberOfUses', s.u64],
      ],
      'UtilizeInstructionArgs'
    ),
    (value) => ({ discriminator: 19, ...value } as UtilizeInstructionData)
  ) as Serializer<UtilizeInstructionArgs, UtilizeInstructionData>;
}

// Instruction.
export function utilize(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    programs?: Context['programs'];
  },
  input: UtilizeInstructionAccounts & UtilizeInstructionArgs
): WrappedInstruction {
  const signers: Signer[] = [];
  const keys: AccountMeta[] = [];

  // Program ID.
  const programId: PublicKey = getProgramAddressWithFallback(
    context,
    'mplTokenMetadata',
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
  );

  // Resolved accounts.
  const metadataAccount = input.metadata;
  const tokenAccountAccount = input.tokenAccount;
  const mintAccount = input.mint;
  const useAuthorityAccount = input.useAuthority;
  const ownerAccount = input.owner;
  const tokenProgramAccount = input.tokenProgram ?? {
    ...getProgramAddressWithFallback(
      context,
      'splToken',
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
    ),
    isWritable: false,
  };
  const ataProgramAccount = input.ataProgram ?? {
    ...getProgramAddressWithFallback(
      context,
      'splAssociatedToken',
      'TokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
    ),
    isWritable: false,
  };
  const systemProgramAccount = input.systemProgram ?? {
    ...getProgramAddressWithFallback(
      context,
      'splSystem',
      '11111111111111111111111111111111'
    ),
    isWritable: false,
  };
  const rentAccount =
    input.rent ?? publicKey('SysvarRent111111111111111111111111111111111');
  const useAuthorityRecordAccount = input.useAuthorityRecord;
  const burnerAccount = input.burner;

  // Metadata.
  keys.push({
    pubkey: metadataAccount,
    isSigner: false,
    isWritable: isWritable(metadataAccount, true),
  });

  // Token Account.
  keys.push({
    pubkey: tokenAccountAccount,
    isSigner: false,
    isWritable: isWritable(tokenAccountAccount, true),
  });

  // Mint.
  keys.push({
    pubkey: mintAccount,
    isSigner: false,
    isWritable: isWritable(mintAccount, true),
  });

  // Use Authority.
  signers.push(useAuthorityAccount);
  keys.push({
    pubkey: useAuthorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(useAuthorityAccount, true),
  });

  // Owner.
  keys.push({
    pubkey: ownerAccount,
    isSigner: false,
    isWritable: isWritable(ownerAccount, false),
  });

  // Token Program.
  keys.push({
    pubkey: tokenProgramAccount,
    isSigner: false,
    isWritable: isWritable(tokenProgramAccount, false),
  });

  // Ata Program.
  keys.push({
    pubkey: ataProgramAccount,
    isSigner: false,
    isWritable: isWritable(ataProgramAccount, false),
  });

  // System Program.
  keys.push({
    pubkey: systemProgramAccount,
    isSigner: false,
    isWritable: isWritable(systemProgramAccount, false),
  });

  // Rent.
  keys.push({
    pubkey: rentAccount,
    isSigner: false,
    isWritable: isWritable(rentAccount, false),
  });

  // Use Authority Record (optional).
  if (useAuthorityRecordAccount) {
    keys.push({
      pubkey: useAuthorityRecordAccount,
      isSigner: false,
      isWritable: isWritable(useAuthorityRecordAccount, true),
    });
  }

  // Burner (optional).
  if (burnerAccount) {
    keys.push({
      pubkey: burnerAccount,
      isSigner: false,
      isWritable: isWritable(burnerAccount, false),
    });
  }

  // Data.
  const data = getUtilizeInstructionDataSerializer(context).serialize(input);

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}
