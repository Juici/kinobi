//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! [https://github.com/metaplex-foundation/kinobi]
//!

use crate::generated::types::CandyMachineData;
use borsh::BorshDeserialize;
use borsh::BorshSerialize;

/// Accounts.
pub struct UpdateCandyMachine {
    pub candy_machine: solana_program::pubkey::Pubkey,

    pub authority: solana_program::pubkey::Pubkey,
}

impl UpdateCandyMachine {
    #[allow(clippy::vec_init_then_push)]
    pub fn instruction(
        &self,
        args: UpdateCandyMachineInstructionArgs,
    ) -> solana_program::instruction::Instruction {
        let mut accounts = Vec::with_capacity(2);
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.candy_machine,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.authority,
            true,
        ));
        let mut data = UpdateCandyMachineInstructionData::new()
            .try_to_vec()
            .unwrap();
        let mut args = args.try_to_vec().unwrap();
        data.append(&mut args);

        solana_program::instruction::Instruction {
            program_id: crate::MPL_CANDY_MACHINE_CORE_ID,
            accounts,
            data,
        }
    }
}

#[derive(BorshDeserialize, BorshSerialize)]
struct UpdateCandyMachineInstructionData {
    discriminator: [u8; 8],
}

impl UpdateCandyMachineInstructionData {
    fn new() -> Self {
        Self {
            discriminator: [219, 200, 88, 176, 158, 63, 253, 127],
        }
    }
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct UpdateCandyMachineInstructionArgs {
    pub data: CandyMachineData,
}

/// Instruction builder.
#[derive(Default)]
pub struct UpdateCandyMachineBuilder {
    candy_machine: Option<solana_program::pubkey::Pubkey>,
    authority: Option<solana_program::pubkey::Pubkey>,
    data: Option<CandyMachineData>,
}

impl UpdateCandyMachineBuilder {
    pub fn new() -> Self {
        Self::default()
    }
    #[inline(always)]
    pub fn candy_machine(&mut self, candy_machine: solana_program::pubkey::Pubkey) -> &mut Self {
        self.candy_machine = Some(candy_machine);
        self
    }
    #[inline(always)]
    pub fn authority(&mut self, authority: solana_program::pubkey::Pubkey) -> &mut Self {
        self.authority = Some(authority);
        self
    }
    #[inline(always)]
    pub fn data(&mut self, data: CandyMachineData) -> &mut Self {
        self.data = Some(data);
        self
    }
    #[allow(clippy::clone_on_copy)]
    pub fn build(&self) -> solana_program::instruction::Instruction {
        let accounts = UpdateCandyMachine {
            candy_machine: self.candy_machine.expect("candy_machine is not set"),
            authority: self.authority.expect("authority is not set"),
        };
        let args = UpdateCandyMachineInstructionArgs {
            data: self.data.clone().expect("data is not set"),
        };

        accounts.instruction(args)
    }
}

/// `update_candy_machine` CPI instruction.
pub struct UpdateCandyMachineCpi<'a> {
    /// The program to invoke.
    pub __program: &'a solana_program::account_info::AccountInfo<'a>,

    pub candy_machine: &'a solana_program::account_info::AccountInfo<'a>,

    pub authority: &'a solana_program::account_info::AccountInfo<'a>,
    /// The arguments for the instruction.
    pub __args: UpdateCandyMachineInstructionArgs,
}

impl<'a> UpdateCandyMachineCpi<'a> {
    pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed(&[])
    }
    #[allow(clippy::clone_on_copy)]
    #[allow(clippy::vec_init_then_push)]
    pub fn invoke_signed(
        &self,
        signers_seeds: &[&[&[u8]]],
    ) -> solana_program::entrypoint::ProgramResult {
        let mut accounts = Vec::with_capacity(2);
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.candy_machine.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.authority.key,
            true,
        ));
        let mut data = UpdateCandyMachineInstructionData::new()
            .try_to_vec()
            .unwrap();
        let mut args = self.__args.try_to_vec().unwrap();
        data.append(&mut args);

        let instruction = solana_program::instruction::Instruction {
            program_id: crate::MPL_CANDY_MACHINE_CORE_ID,
            accounts,
            data,
        };
        let mut account_infos = Vec::with_capacity(2 + 1);
        account_infos.push(self.__program.clone());
        account_infos.push(self.candy_machine.clone());
        account_infos.push(self.authority.clone());

        if signers_seeds.is_empty() {
            solana_program::program::invoke(&instruction, &account_infos)
        } else {
            solana_program::program::invoke_signed(&instruction, &account_infos, signers_seeds)
        }
    }
}

/// `update_candy_machine` CPI instruction builder.
pub struct UpdateCandyMachineCpiBuilder<'a> {
    instruction: Box<UpdateCandyMachineCpiBuilderInstruction<'a>>,
}

impl<'a> UpdateCandyMachineCpiBuilder<'a> {
    pub fn new(program: &'a solana_program::account_info::AccountInfo<'a>) -> Self {
        let instruction = Box::new(UpdateCandyMachineCpiBuilderInstruction {
            __program: program,
            candy_machine: None,
            authority: None,
            data: None,
        });
        Self { instruction }
    }
    #[inline(always)]
    pub fn candy_machine(
        &mut self,
        candy_machine: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.candy_machine = Some(candy_machine);
        self
    }
    #[inline(always)]
    pub fn authority(
        &mut self,
        authority: &'a solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.authority = Some(authority);
        self
    }
    #[inline(always)]
    pub fn data(&mut self, data: CandyMachineData) -> &mut Self {
        self.instruction.data = Some(data);
        self
    }
    #[allow(clippy::clone_on_copy)]
    pub fn build(&self) -> UpdateCandyMachineCpi<'a> {
        let args = UpdateCandyMachineInstructionArgs {
            data: self.instruction.data.clone().expect("data is not set"),
        };

        UpdateCandyMachineCpi {
            __program: self.instruction.__program,

            candy_machine: self
                .instruction
                .candy_machine
                .expect("candy_machine is not set"),

            authority: self.instruction.authority.expect("authority is not set"),
            __args: args,
        }
    }
}

struct UpdateCandyMachineCpiBuilderInstruction<'a> {
    __program: &'a solana_program::account_info::AccountInfo<'a>,
    candy_machine: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    authority: Option<&'a solana_program::account_info::AccountInfo<'a>>,
    data: Option<CandyMachineData>,
}
