import type { IdlTypeStruct } from '../idl';
import type { Visitable, Visitor } from '../visitors';
import { createTypeNodeFromIdl, TypeNode } from './TypeNode';
import type { Node } from './Node';

export type TypeStructNodeField = {
  name: string;
  type: TypeNode;
  docs?: string[];
};

export class TypeStructNode implements Visitable {
  readonly nodeClass = 'TypeStructNode' as const;

  constructor(readonly fields: TypeStructNodeField[]) {}

  static fromIdl(idl: IdlTypeStruct): TypeStructNode {
    const fields = (idl.fields ?? []).map((field) => ({
      name: field.name ?? '',
      type: createTypeNodeFromIdl(field.type),
      docs: field.docs ?? [],
    }));

    return new TypeStructNode(fields);
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitTypeStruct(this);
  }
}

export function isTypeStructNode(node: Node): node is TypeStructNode {
  return node.nodeClass === 'TypeStructNode';
}

export function assertTypeStructNode(
  node: Node,
): asserts node is TypeStructNode {
  if (!isTypeStructNode(node)) {
    throw new Error(`Expected TypeStructNode, got ${node.nodeClass}.`);
  }
}
