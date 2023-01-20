import { pascalCase } from '../../utils';
import * as nodes from '../../nodes';
import { BaseNodeVisitor } from '../BaseNodeVisitor';
import { Dependency } from '../Dependency';

type InstructionNodeAccountDefaultsInput =
  | nodes.InstructionNodeAccountDefaults
  | {
      kind: 'pda';
      pdaAccount?: string;
      dependency?: Dependency;
      seeds?: Record<string, nodes.InstructionNodeAccountDefaultsSeed>;
    };

export type InstructionAccountDefaultRule =
  InstructionNodeAccountDefaultsInput & {
    /** The name of the instruction account or a pattern to match on it. */
    account: string | RegExp;
    /** @defaultValue Defaults to searching accounts on all instructions. */
    instruction?: string;
    /** @defaultValue `false`. */
    ignoreIfOptional?: boolean;
  };

export const DEFAULT_INSTRUCTION_ACCOUNT_DEFAULT_RULES: InstructionAccountDefaultRule[] =
  [
    {
      kind: 'payer',
      account: /^payer|feePayer$/,
      ignoreIfOptional: true,
    },
    {
      kind: 'identity',
      account: /^authority$/,
      ignoreIfOptional: true,
    },
    {
      kind: 'programId',
      account: /^programId$/,
      ignoreIfOptional: true,
    },
    {
      kind: 'program',
      account: /^systemProgram|splSystemProgram$/,
      program: {
        name: 'splSystem',
        address: '11111111111111111111111111111111',
      },
      ignoreIfOptional: true,
    },
    {
      kind: 'program',
      account: /^tokenProgram|splTokenProgram$/,
      program: {
        name: 'splToken',
        address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
      },
      ignoreIfOptional: true,
    },
    {
      kind: 'program',
      account: /^ataProgram|splAtaProgram$/,
      program: {
        name: 'splAssociatedToken',
        address: 'TokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
      },
      ignoreIfOptional: true,
    },
    {
      kind: 'address',
      account: /^clockSysvar|sysvarClockSysvar$/,
      address: 'SysvarC1ock11111111111111111111111111111111',
      ignoreIfOptional: true,
    },
    {
      kind: 'address',
      account: /^epochScheduleSysvar|sysvarEpochSchedule$/,
      address: 'SysvarEpochSchedu1e111111111111111111111111',
      ignoreIfOptional: true,
    },
    {
      kind: 'address',
      account: /^instructionsSysvar|sysvarInstructions$/,
      address: 'Sysvar1nstructions1111111111111111111111111',
      ignoreIfOptional: true,
    },
    {
      kind: 'address',
      account: /^recentBlockhashesSysvar|sysvarRecentBlockhashes$/,
      address: 'SysvarRecentB1ockHashes11111111111111111111',
      ignoreIfOptional: true,
    },
    {
      kind: 'address',
      account: /^rent|rentSysvar|sysvarRent$/,
      address: 'SysvarRent111111111111111111111111111111111',
      ignoreIfOptional: true,
    },
    {
      kind: 'address',
      account: /^rewardsSysvar|sysvarRewards$/,
      address: 'SysvarRewards111111111111111111111111111111',
      ignoreIfOptional: true,
    },
    {
      kind: 'address',
      account: /^slotHashesSysvar|sysvarSlotHashes$/,
      address: 'SysvarS1otHashes111111111111111111111111111',
      ignoreIfOptional: true,
    },
    {
      kind: 'address',
      account: /^slotHistorySysvar|sysvarSlotHistory$/,
      address: 'SysvarS1otHistory11111111111111111111111111',
      ignoreIfOptional: true,
    },
    {
      kind: 'address',
      account: /^stakeHistorySysvar|sysvarStakeHistory$/,
      address: 'SysvarStakeHistory1111111111111111111111111',
      ignoreIfOptional: true,
    },
  ];

export class SetInstructionAccountDefaultValuesVisitor extends BaseNodeVisitor {
  protected readonly rules: InstructionAccountDefaultRule[];

  protected allAccounts = new Map<string, nodes.AccountNode>();

  constructor(rules: InstructionAccountDefaultRule[]) {
    super();

    // Place the rules with instructions first.
    this.rules = rules.sort((a, b) => {
      const ia = 'instruction' in a;
      const ib = 'instruction' in b;
      if ((ia && ib) || (!a && !ib)) return 0;
      return ia ? -1 : 1;
    });
  }

  visitRoot(root: nodes.RootNode): nodes.Node {
    root.allAccounts.forEach((account) => {
      this.allAccounts.set(account.name, account);
    });
    return super.visitRoot(root);
  }

  visitProgram(program: nodes.ProgramNode): nodes.Node {
    return new nodes.ProgramNode(
      program.metadata,
      program.accounts,
      program.instructions
        .map((instruction) => instruction.accept(this))
        .filter(nodes.assertNodeFilter(nodes.assertInstructionNode)),
      program.definedTypes,
      program.errors
    );
  }

  visitInstruction(instruction: nodes.InstructionNode): nodes.Node {
    const instructionAccounts = instruction.accounts.map(
      (account): nodes.InstructionNodeAccount => {
        const rule = this.matchRule(instruction, account);
        if (!rule) {
          return account;
        }
        if ((rule.ignoreIfOptional ?? false) && account.isOptional) {
          return account;
        }
        if (rule.kind === 'pda') {
          const pdaAccount =
            rule.pdaAccount ??
            (typeof rule.account === 'string' ? rule.account : '');
          return {
            ...account,
            defaultsTo: {
              pdaAccount,
              dependency: 'generated',
              seeds: this.getAccountVariableSeeds(pdaAccount),
              ...rule,
            },
          };
        }
        return { ...account, defaultsTo: rule };
      }
    );

    return new nodes.InstructionNode(
      instruction.metadata,
      instructionAccounts,
      instruction.args
    );
  }

  protected matchRule(
    instruction: nodes.InstructionNode,
    account: nodes.InstructionNodeAccount
  ): InstructionAccountDefaultRule | undefined {
    return this.rules.find((rule) => {
      if ('instruction' in rule && rule.instruction !== instruction.name) {
        return false;
      }
      return typeof rule.account === 'string'
        ? rule.account === account.name
        : rule.account.test(account.name);
    });
  }

  protected getAccountVariableSeeds(
    accountName: string
  ): Record<string, nodes.InstructionNodeAccountDefaultsSeed> {
    const seeds = this.allAccounts.get(pascalCase(accountName))?.seeds ?? [];
    return seeds.reduce((acc, seed) => {
      if (seed.kind !== 'variable') return acc;
      if (nodes.isTypeLeafNode(seed.type) && seed.type.type === 'publicKey') {
        acc[seed.name] = { kind: 'account', name: seed.name };
      } else {
        acc[seed.name] = { kind: 'arg', name: seed.name };
      }
      return acc;
    }, {} as Record<string, nodes.InstructionNodeAccountDefaultsSeed>);
  }
}
