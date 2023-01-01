import * as nodes from '../../nodes';
import { GetNodeInlineStringVisitor } from '../aggregators';
import { BaseRootVisitor } from '../BaseRootVisitor';
import { NodeSelector } from '../NodeSelector';

type DefinedTypeWithProgram = {
  program: nodes.ProgramNode;
  type: nodes.DefinedTypeNode;
};

export class DeduplicateDefinedTypesVisitor extends BaseRootVisitor {
  visitRoot(root: nodes.RootNode): nodes.RootNode {
    const typeMap = new Map<string, DefinedTypeWithProgram[]>();

    // Fill the type map with all defined types.
    root.programs.forEach((program) => {
      program.definedTypes.forEach((type) => {
        const typeWithProgram = { program, type };
        const list = typeMap.get(type.name) ?? [];
        typeMap.set(type.name, [...list, typeWithProgram]);
      });
    });

    // Remove all types that are not duplicated.
    typeMap.forEach((list, name) => {
      if (list.length <= 1) {
        typeMap.delete(name);
      }
    });

    // Remove duplicates whose types are not equal.
    const strVisitor = new GetNodeInlineStringVisitor();
    typeMap.forEach((list, name) => {
      const types = list.map((item) => item.type.accept(strVisitor));
      const typesAreEqual = types.every((type, i, arr) => type === arr[0]);
      if (!typesAreEqual) {
        typeMap.delete(name);
      }
    });

    // Get the selectors for all defined types that needs deleting.
    // Thus, we must select all but the first duplicate of each list.
    const deleteSelectors = Array.from(typeMap.values())
      // Order lists by program index, get their tails and flatten.
      .flatMap((list) => {
        const sortedList = list.sort(
          (a, b) =>
            root.programs.indexOf(a.program) - root.programs.indexOf(b.program)
        );
        const [, ...sortedListTail] = sortedList;
        return sortedListTail;
      })
      // Get selectors from the defined types and their programs.
      .map(
        ({ program, type }): NodeSelector => ({
          program: program.name,
          type: type.name,
        })
      );

    console.log(deleteSelectors);

    return root;
  }
}