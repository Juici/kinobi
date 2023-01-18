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
export type SetAndVerifySizedCollectionItemInstructionAccounts = {
  /** Metadata account */
  metadata: PublicKey;
  /** Collection Update authority */
  collectionAuthority: Signer;
  /** payer */
  payer?: Signer;
  /** Update Authority of Collection NFT and NFT */
  updateAuthority: PublicKey;
  /** Mint of the Collection */
  collectionMint: PublicKey;
  /** Metadata Account of the Collection */
  collection: PublicKey;
  /** MasterEdition2 Account of the Collection Token */
  collectionMasterEditionAccount: PublicKey;
  /** Collection Authority Record PDA */
  collectionAuthorityRecord?: PublicKey;
};

// Arguments.
export type SetAndVerifySizedCollectionItemInstructionData = {
  discriminator: number;
};

export type SetAndVerifySizedCollectionItemInstructionArgs = {};

export function getSetAndVerifySizedCollectionItemInstructionDataSerializer(
  context: Pick<Context, 'serializer'>
): Serializer<
  SetAndVerifySizedCollectionItemInstructionArgs,
  SetAndVerifySizedCollectionItemInstructionData
> {
  const s = context.serializer;
  return mapSerializer<
    SetAndVerifySizedCollectionItemInstructionArgs,
    SetAndVerifySizedCollectionItemInstructionData,
    SetAndVerifySizedCollectionItemInstructionData
  >(
    s.struct<SetAndVerifySizedCollectionItemInstructionData>(
      [['discriminator', s.u8]],
      'SetAndVerifySizedCollectionItemInstructionArgs'
    ),
    (value) =>
      ({
        discriminator: 32,
        ...value,
      } as SetAndVerifySizedCollectionItemInstructionData)
  ) as Serializer<
    SetAndVerifySizedCollectionItemInstructionArgs,
    SetAndVerifySizedCollectionItemInstructionData
  >;
}

// Instruction.
export function setAndVerifySizedCollectionItem(
  context: {
    serializer: Context['serializer'];
    eddsa: Context['eddsa'];
    payer: Context['payer'];
    programs?: Context['programs'];
  },
  input: SetAndVerifySizedCollectionItemInstructionAccounts
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
  const collectionAuthorityAccount = input.collectionAuthority;
  const payerAccount = input.payer ?? context.payer.publicKey;
  const updateAuthorityAccount = input.updateAuthority;
  const collectionMintAccount = input.collectionMint;
  const collectionAccount = input.collection;
  const collectionMasterEditionAccountAccount =
    input.collectionMasterEditionAccount;
  const collectionAuthorityRecordAccount = input.collectionAuthorityRecord;

  // Metadata.
  keys.push({
    pubkey: metadataAccount,
    isSigner: false,
    isWritable: isWritable(metadataAccount, true),
  });

  // Collection Authority.
  signers.push(collectionAuthorityAccount);
  keys.push({
    pubkey: collectionAuthorityAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(collectionAuthorityAccount, false),
  });

  // Payer.
  signers.push(payerAccount);
  keys.push({
    pubkey: payerAccount.publicKey,
    isSigner: true,
    isWritable: isWritable(payerAccount, true),
  });

  // Update Authority.
  keys.push({
    pubkey: updateAuthorityAccount,
    isSigner: false,
    isWritable: isWritable(updateAuthorityAccount, false),
  });

  // Collection Mint.
  keys.push({
    pubkey: collectionMintAccount,
    isSigner: false,
    isWritable: isWritable(collectionMintAccount, false),
  });

  // Collection.
  keys.push({
    pubkey: collectionAccount,
    isSigner: false,
    isWritable: isWritable(collectionAccount, true),
  });

  // Collection Master Edition Account.
  keys.push({
    pubkey: collectionMasterEditionAccountAccount,
    isSigner: false,
    isWritable: isWritable(collectionMasterEditionAccountAccount, true),
  });

  // Collection Authority Record (optional).
  if (collectionAuthorityRecordAccount) {
    keys.push({
      pubkey: collectionAuthorityRecordAccount,
      isSigner: false,
      isWritable: isWritable(collectionAuthorityRecordAccount, false),
    });
  }

  // Data.
  const data = getSetAndVerifySizedCollectionItemInstructionDataSerializer(
    context
  ).serialize({});

  return {
    instruction: { keys, programId, data },
    signers,
    bytesCreatedOnChain: 0,
  };
}
