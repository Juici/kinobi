//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! [https://github.com/metaplex-foundation/kinobi]
//!

use crate::generated::types::AuthorityType;
use crate::generated::types::AuthorizationData;
use crate::generated::types::Collection;
use crate::generated::types::CollectionDetails;
use crate::generated::types::Creator;
use crate::generated::types::DelegateState;
use crate::generated::types::ProgrammableConfig;
use crate::generated::types::TokenStandard;
use crate::generated::types::Uses;
use borsh::BorshDeserialize;
use borsh::BorshSerialize;
use solana_program::pubkey::Pubkey;

/// Accounts.
pub struct UpdateV1 {
    /// Update authority or delegate
    pub authority: solana_program::pubkey::Pubkey,
    /// Metadata account
    pub metadata: solana_program::pubkey::Pubkey,
    /// Master Edition account
    pub master_edition: Option<solana_program::pubkey::Pubkey>,
    /// Mint account
    pub mint: solana_program::pubkey::Pubkey,
    /// System program
    pub system_program: solana_program::pubkey::Pubkey,
    /// System program
    pub sysvar_instructions: solana_program::pubkey::Pubkey,
    /// Token account
    pub token: Option<solana_program::pubkey::Pubkey>,
    /// Delegate record PDA
    pub delegate_record: Option<solana_program::pubkey::Pubkey>,
    /// Token Authorization Rules Program
    pub authorization_rules_program: Option<solana_program::pubkey::Pubkey>,
    /// Token Authorization Rules account
    pub authorization_rules: Option<solana_program::pubkey::Pubkey>,
}

impl UpdateV1 {
    #[allow(clippy::vec_init_then_push)]
    pub fn instruction(
        &self,
        args: UpdateV1InstructionArgs,
    ) -> solana_program::instruction::Instruction {
        let mut accounts = Vec::with_capacity(10);
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.authority,
            true,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.metadata,
            false,
        ));
        if let Some(master_edition) = self.master_edition {
            accounts.push(solana_program::instruction::AccountMeta::new(
                master_edition,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.mint, false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.system_program,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.sysvar_instructions,
            false,
        ));
        if let Some(token) = self.token {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                token, false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        if let Some(delegate_record) = self.delegate_record {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                delegate_record,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        if let Some(authorization_rules_program) = self.authorization_rules_program {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                authorization_rules_program,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        if let Some(authorization_rules) = self.authorization_rules {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                authorization_rules,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        let mut data = UpdateV1InstructionData::new().try_to_vec().unwrap();
        let mut args = args.try_to_vec().unwrap();
        data.append(&mut args);

        solana_program::instruction::Instruction {
            program_id: crate::MPL_TOKEN_METADATA_ID,
            accounts,
            data,
        }
    }
}

#[derive(BorshDeserialize, BorshSerialize)]
struct UpdateV1InstructionData {
    discriminator: u8,
    update_v1_discriminator: u8,
}

impl UpdateV1InstructionData {
    fn new() -> Self {
        Self {
            discriminator: 43,
            update_v1_discriminator: 0,
        }
    }
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct UpdateV1InstructionArgs {
    pub authorization_data: Option<AuthorizationData>,
    pub new_update_authority: Option<Pubkey>,
    pub data: Option<UpdateV1InstructionDataData>,
    pub primary_sale_happened: Option<bool>,
    pub is_mutable: Option<bool>,
    pub token_standard: Option<TokenStandard>,
    pub collection: Option<Collection>,
    pub uses: Option<Uses>,
    pub collection_details: Option<CollectionDetails>,
    pub programmable_config: Option<ProgrammableConfig>,
    pub delegate_state: Option<DelegateState>,
    pub authority_type: AuthorityType,
}

#[derive(BorshSerialize, BorshDeserialize, Clone, Debug, Eq, PartialEq)]
pub struct UpdateV1InstructionDataData {
    pub name: String,
    pub symbol: String,
    pub uri: String,
    pub seller_fee_basis_points: u16,
    pub creators: Option<Vec<Creator>>,
}

/// Instruction builder.
#[derive(Default)]
pub struct UpdateV1Builder {
    authority: Option<solana_program::pubkey::Pubkey>,
    metadata: Option<solana_program::pubkey::Pubkey>,
    master_edition: Option<solana_program::pubkey::Pubkey>,
    mint: Option<solana_program::pubkey::Pubkey>,
    system_program: Option<solana_program::pubkey::Pubkey>,
    sysvar_instructions: Option<solana_program::pubkey::Pubkey>,
    token: Option<solana_program::pubkey::Pubkey>,
    delegate_record: Option<solana_program::pubkey::Pubkey>,
    authorization_rules_program: Option<solana_program::pubkey::Pubkey>,
    authorization_rules: Option<solana_program::pubkey::Pubkey>,
    authorization_data: Option<AuthorizationData>,
    new_update_authority: Option<Pubkey>,
    data: Option<UpdateV1InstructionDataData>,
    primary_sale_happened: Option<bool>,
    is_mutable: Option<bool>,
    token_standard: Option<TokenStandard>,
    collection: Option<Collection>,
    uses: Option<Uses>,
    collection_details: Option<CollectionDetails>,
    programmable_config: Option<ProgrammableConfig>,
    delegate_state: Option<DelegateState>,
    authority_type: Option<AuthorityType>,
}

impl UpdateV1Builder {
    pub fn new() -> Self {
        Self::default()
    }
    /// Update authority or delegate
    #[inline(always)]
    pub fn authority(&mut self, authority: solana_program::pubkey::Pubkey) -> &mut Self {
        self.authority = Some(authority);
        self
    }
    /// Metadata account
    #[inline(always)]
    pub fn metadata(&mut self, metadata: solana_program::pubkey::Pubkey) -> &mut Self {
        self.metadata = Some(metadata);
        self
    }
    /// `[optional account]`
    /// Master Edition account
    #[inline(always)]
    pub fn master_edition(&mut self, master_edition: solana_program::pubkey::Pubkey) -> &mut Self {
        self.master_edition = Some(master_edition);
        self
    }
    /// Mint account
    #[inline(always)]
    pub fn mint(&mut self, mint: solana_program::pubkey::Pubkey) -> &mut Self {
        self.mint = Some(mint);
        self
    }
    /// System program
    #[inline(always)]
    pub fn system_program(&mut self, system_program: solana_program::pubkey::Pubkey) -> &mut Self {
        self.system_program = Some(system_program);
        self
    }
    /// System program
    #[inline(always)]
    pub fn sysvar_instructions(
        &mut self,
        sysvar_instructions: solana_program::pubkey::Pubkey,
    ) -> &mut Self {
        self.sysvar_instructions = Some(sysvar_instructions);
        self
    }
    /// `[optional account]`
    /// Token account
    #[inline(always)]
    pub fn token(&mut self, token: solana_program::pubkey::Pubkey) -> &mut Self {
        self.token = Some(token);
        self
    }
    /// `[optional account]`
    /// Delegate record PDA
    #[inline(always)]
    pub fn delegate_record(
        &mut self,
        delegate_record: solana_program::pubkey::Pubkey,
    ) -> &mut Self {
        self.delegate_record = Some(delegate_record);
        self
    }
    /// `[optional account]`
    /// Token Authorization Rules Program
    #[inline(always)]
    pub fn authorization_rules_program(
        &mut self,
        authorization_rules_program: solana_program::pubkey::Pubkey,
    ) -> &mut Self {
        self.authorization_rules_program = Some(authorization_rules_program);
        self
    }
    /// `[optional account]`
    /// Token Authorization Rules account
    #[inline(always)]
    pub fn authorization_rules(
        &mut self,
        authorization_rules: solana_program::pubkey::Pubkey,
    ) -> &mut Self {
        self.authorization_rules = Some(authorization_rules);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn authorization_data(&mut self, authorization_data: AuthorizationData) -> &mut Self {
        self.authorization_data = Some(authorization_data);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn new_update_authority(&mut self, new_update_authority: Pubkey) -> &mut Self {
        self.new_update_authority = Some(new_update_authority);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn data(&mut self, data: UpdateV1InstructionDataData) -> &mut Self {
        self.data = Some(data);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn primary_sale_happened(&mut self, primary_sale_happened: bool) -> &mut Self {
        self.primary_sale_happened = Some(primary_sale_happened);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn is_mutable(&mut self, is_mutable: bool) -> &mut Self {
        self.is_mutable = Some(is_mutable);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn token_standard(&mut self, token_standard: TokenStandard) -> &mut Self {
        self.token_standard = Some(token_standard);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn collection(&mut self, collection: Collection) -> &mut Self {
        self.collection = Some(collection);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn uses(&mut self, uses: Uses) -> &mut Self {
        self.uses = Some(uses);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn collection_details(&mut self, collection_details: CollectionDetails) -> &mut Self {
        self.collection_details = Some(collection_details);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn programmable_config(&mut self, programmable_config: ProgrammableConfig) -> &mut Self {
        self.programmable_config = Some(programmable_config);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn delegate_state(&mut self, delegate_state: DelegateState) -> &mut Self {
        self.delegate_state = Some(delegate_state);
        self
    }
    #[inline(always)]
    pub fn authority_type(&mut self, authority_type: AuthorityType) -> &mut Self {
        self.authority_type = Some(authority_type);
        self
    }
    #[allow(clippy::clone_on_copy)]
    pub fn build(&self) -> solana_program::instruction::Instruction {
        let accounts = UpdateV1 {
            authority: self.authority.expect("authority is not set"),
            metadata: self.metadata.expect("metadata is not set"),
            master_edition: self.master_edition,
            mint: self.mint.expect("mint is not set"),
            system_program: self
                .system_program
                .unwrap_or(solana_program::pubkey!("11111111111111111111111111111111")),
            sysvar_instructions: self.sysvar_instructions.unwrap_or(solana_program::pubkey!(
                "Sysvar1nstructions1111111111111111111111111"
            )),
            token: self.token,
            delegate_record: self.delegate_record,
            authorization_rules_program: self.authorization_rules_program,
            authorization_rules: self.authorization_rules,
        };
        let args = UpdateV1InstructionArgs {
            authorization_data: self.authorization_data.clone(),
            new_update_authority: self.new_update_authority.clone(),
            data: self.data.clone(),
            primary_sale_happened: self.primary_sale_happened.clone(),
            is_mutable: self.is_mutable.clone(),
            token_standard: self.token_standard.clone(),
            collection: self.collection.clone(),
            uses: self.uses.clone(),
            collection_details: self.collection_details.clone(),
            programmable_config: self.programmable_config.clone(),
            delegate_state: self.delegate_state.clone(),
            authority_type: self
                .authority_type
                .clone()
                .expect("authority_type is not set"),
        };

        accounts.instruction(args)
    }
}

/// `update_v1` CPI instruction.
pub struct UpdateV1Cpi<'a> {
    /// The program to invoke.
    pub __program: &'a solana_program::account_info::AccountInfo<'a>,
    /// Update authority or delegate
    pub authority: &'a solana_program::account_info::AccountInfo<'a>,
    /// Metadata account
    pub metadata: &'a solana_program::account_info::AccountInfo<'a>,
    /// Master Edition account
    pub master_edition: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    /// Mint account
    pub mint: &'a solana_program::account_info::AccountInfo<'a>,
    /// System program
    pub system_program: &'a solana_program::account_info::AccountInfo<'a>,
    /// System program
    pub sysvar_instructions: &'a solana_program::account_info::AccountInfo<'a>,
    /// Token account
    pub token: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    /// Delegate record PDA
    pub delegate_record: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    /// Token Authorization Rules Program
    pub authorization_rules_program: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    /// Token Authorization Rules account
    pub authorization_rules: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    /// The arguments for the instruction.
    pub __args: UpdateV1InstructionArgs,
}

impl<'a> UpdateV1Cpi<'a> {
    pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed(&[])
    }
    #[allow(clippy::clone_on_copy)]
    #[allow(clippy::vec_init_then_push)]
    pub fn invoke_signed(
        &self,
        signers_seeds: &[&[&[u8]]],
    ) -> solana_program::entrypoint::ProgramResult {
        let mut accounts = Vec::with_capacity(10);
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.authority.key,
            true,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.metadata.key,
            false,
        ));
        if let Some(master_edition) = self.master_edition {
            accounts.push(solana_program::instruction::AccountMeta::new(
                *master_edition.key,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.mint.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.system_program.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.sysvar_instructions.key,
            false,
        ));
        if let Some(token) = self.token {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                *token.key, false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        if let Some(delegate_record) = self.delegate_record {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                *delegate_record.key,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        if let Some(authorization_rules_program) = self.authorization_rules_program {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                *authorization_rules_program.key,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        if let Some(authorization_rules) = self.authorization_rules {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                *authorization_rules.key,
                false,
            ));
        } else {
            accounts.push(solana_program::instruction::AccountMeta::new_readonly(
                crate::MPL_TOKEN_METADATA_ID,
                false,
            ));
        }
        let mut data = UpdateV1InstructionData::new().try_to_vec().unwrap();
        let mut args = self.__args.try_to_vec().unwrap();
        data.append(&mut args);

        let instruction = solana_program::instruction::Instruction {
            program_id: crate::MPL_TOKEN_METADATA_ID,
            accounts,
            data,
        };
        let mut account_infos = Vec::with_capacity(10 + 1);
        account_infos.push(self.__program.clone());
        account_infos.push(self.authority.clone());
        account_infos.push(self.metadata.clone());
        if let Some(master_edition) = self.master_edition {
            account_infos.push(master_edition.clone());
        }
        account_infos.push(self.mint.clone());
        account_infos.push(self.system_program.clone());
        account_infos.push(self.sysvar_instructions.clone());
        if let Some(token) = self.token {
            account_infos.push(token.clone());
        }
        if let Some(delegate_record) = self.delegate_record {
            account_infos.push(delegate_record.clone());
        }
        if let Some(authorization_rules_program) = self.authorization_rules_program {
            account_infos.push(authorization_rules_program.clone());
        }
        if let Some(authorization_rules) = self.authorization_rules {
            account_infos.push(authorization_rules.clone());
        }

        if signers_seeds.is_empty() {
            solana_program::program::invoke(&instruction, &account_infos)
        } else {
            solana_program::program::invoke_signed(&instruction, &account_infos, signers_seeds)
        }
    }
}

/// `update_v1` CPI instruction builder.
pub struct UpdateV1CpiBuilder<'a> {
    instruction: Box<UpdateV1CpiBuilderInstruction<'a>>,
}

impl<'a> UpdateV1CpiBuilder<'a> {
    pub fn new(program: &'a solana_program::account_info::AccountInfo<'a>) -> Self {
        let instruction = Box::new(UpdateV1CpiBuilderInstruction {
            __program: program,
            authority: None,
            metadata: None,
            master_edition: None,
            mint: None,
            system_program: None,
            sysvar_instructions: None,
            token: None,
            delegate_record: None,
            authorization_rules_program: None,
            authorization_rules: None,
            authorization_data: None,
            new_update_authority: None,
            data: None,
            primary_sale_happened: None,
            is_mutable: None,
            token_standard: None,
            collection: None,
            uses: None,
            collection_details: None,
            programmable_config: None,
            delegate_state: None,
            authority_type: None,
        });
        Self { instruction }
    }
    /// Update authority or delegate
    #[inline(always)]
    pub fn authority(
        &mut self,
        authority: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.authority = Some(authority);
        self
    }
    /// Metadata account
    #[inline(always)]
    pub fn metadata(
        &mut self,
        metadata: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.metadata = Some(metadata);
        self
    }
    /// `[optional account]`
    /// Master Edition account
    #[inline(always)]
    pub fn master_edition(
        &mut self,
        master_edition: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.master_edition = Some(master_edition);
        self
    }
    /// Mint account
    #[inline(always)]
    pub fn mint(&mut self, mint: &'a solana_program::account_info::AccountInfo<'a>) -> &mut Self {
        self.instruction.mint = Some(mint);
        self
    }
    /// System program
    #[inline(always)]
    pub fn system_program(
        &mut self,
        system_program: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.system_program = Some(system_program);
        self
    }
    /// System program
    #[inline(always)]
    pub fn sysvar_instructions(
        &mut self,
        sysvar_instructions: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.sysvar_instructions = Some(sysvar_instructions);
        self
    }
    /// `[optional account]`
    /// Token account
    #[inline(always)]
    pub fn token(&mut self, token: &'a solana_program::account_info::AccountInfo<'a>) -> &mut Self {
        self.instruction.token = Some(token);
        self
    }
    /// `[optional account]`
    /// Delegate record PDA
    #[inline(always)]
    pub fn delegate_record(
        &mut self,
        delegate_record: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.delegate_record = Some(delegate_record);
        self
    }
    /// `[optional account]`
    /// Token Authorization Rules Program
    #[inline(always)]
    pub fn authorization_rules_program(
        &mut self,
        authorization_rules_program: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.authorization_rules_program = Some(authorization_rules_program);
        self
    }
    /// `[optional account]`
    /// Token Authorization Rules account
    #[inline(always)]
    pub fn authorization_rules(
        &mut self,
        authorization_rules: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.authorization_rules = Some(authorization_rules);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn authorization_data(&mut self, authorization_data: AuthorizationData) -> &mut Self {
        self.instruction.authorization_data = Some(authorization_data);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn new_update_authority(&mut self, new_update_authority: Pubkey) -> &mut Self {
        self.instruction.new_update_authority = Some(new_update_authority);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn data(&mut self, data: UpdateV1InstructionDataData) -> &mut Self {
        self.instruction.data = Some(data);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn primary_sale_happened(&mut self, primary_sale_happened: bool) -> &mut Self {
        self.instruction.primary_sale_happened = Some(primary_sale_happened);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn is_mutable(&mut self, is_mutable: bool) -> &mut Self {
        self.instruction.is_mutable = Some(is_mutable);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn token_standard(&mut self, token_standard: TokenStandard) -> &mut Self {
        self.instruction.token_standard = Some(token_standard);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn collection(&mut self, collection: Collection) -> &mut Self {
        self.instruction.collection = Some(collection);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn uses(&mut self, uses: Uses) -> &mut Self {
        self.instruction.uses = Some(uses);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn collection_details(&mut self, collection_details: CollectionDetails) -> &mut Self {
        self.instruction.collection_details = Some(collection_details);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn programmable_config(&mut self, programmable_config: ProgrammableConfig) -> &mut Self {
        self.instruction.programmable_config = Some(programmable_config);
        self
    }
    /// `[optional argument]`
    #[inline(always)]
    pub fn delegate_state(&mut self, delegate_state: DelegateState) -> &mut Self {
        self.instruction.delegate_state = Some(delegate_state);
        self
    }
    #[inline(always)]
    pub fn authority_type(&mut self, authority_type: AuthorityType) -> &mut Self {
        self.instruction.authority_type = Some(authority_type);
        self
    }
    #[allow(clippy::clone_on_copy)]
    pub fn build(&self) -> UpdateV1Cpi<'a> {
        let args = UpdateV1InstructionArgs {
            authorization_data: self.instruction.authorization_data.clone(),
            new_update_authority: self.instruction.new_update_authority.clone(),
            data: self.instruction.data.clone(),
            primary_sale_happened: self.instruction.primary_sale_happened.clone(),
            is_mutable: self.instruction.is_mutable.clone(),
            token_standard: self.instruction.token_standard.clone(),
            collection: self.instruction.collection.clone(),
            uses: self.instruction.uses.clone(),
            collection_details: self.instruction.collection_details.clone(),
            programmable_config: self.instruction.programmable_config.clone(),
            delegate_state: self.instruction.delegate_state.clone(),
            authority_type: self
                .instruction
                .authority_type
                .clone()
                .expect("authority_type is not set"),
        };

        UpdateV1Cpi {
            __program: self.instruction.__program,

            authority: self.instruction.authority.expect("authority is not set"),

            metadata: self.instruction.metadata.expect("metadata is not set"),

            master_edition: self.instruction.master_edition,

            mint: self.instruction.mint.expect("mint is not set"),

            system_program: self
                .instruction
                .system_program
                .expect("system_program is not set"),

            sysvar_instructions: self
                .instruction
                .sysvar_instructions
                .expect("sysvar_instructions is not set"),

            token: self.instruction.token,

            delegate_record: self.instruction.delegate_record,

            authorization_rules_program: self.instruction.authorization_rules_program,

            authorization_rules: self.instruction.authorization_rules,
            __args: args,
        }
    }
}

struct UpdateV1CpiBuilderInstruction<'a> {
    __program: &'a solana_program::account_info::AccountInfo<'a>,
    authority: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    metadata: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    master_edition: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    mint: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    system_program: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    sysvar_instructions: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    token: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    delegate_record: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    authorization_rules_program: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    authorization_rules: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    authorization_data: Option<AuthorizationData>,
    new_update_authority: Option<Pubkey>,
    data: Option<UpdateV1InstructionDataData>,
    primary_sale_happened: Option<bool>,
    is_mutable: Option<bool>,
    token_standard: Option<TokenStandard>,
    collection: Option<Collection>,
    uses: Option<Uses>,
    collection_details: Option<CollectionDetails>,
    programmable_config: Option<ProgrammableConfig>,
    delegate_state: Option<DelegateState>,
    authority_type: Option<AuthorityType>,
}
