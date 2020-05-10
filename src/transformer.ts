import * as ts from 'typescript';

export interface Options {
}

const defaultOptions: Options = {
};

// tslint:disable-next-line:no-default-export
export default function transformer(program: ts.Program, config?: Partial<Options>): ts.TransformerFactory<ts.SourceFile> {
	return createTransformerFactory(program, config);
}

function createTransformerFactory(program: ts.Program, options?: Partial<Options>): ts.TransformerFactory<ts.SourceFile> {
	const fullOptions: Options = { ...defaultOptions, ...options };
	const typeChecker = program.getTypeChecker();
	const compilerOptions = program.getCompilerOptions();

	return (context: ts.TransformationContext) => {
		function transformNodeAndChildren(node: ts.SourceFile, context: ts.TransformationContext): ts.SourceFile;
		function transformNodeAndChildren(node: ts.Node, context: ts.TransformationContext): ts.Node;
		function transformNodeAndChildren(node: ts.Node, context: ts.TransformationContext): ts.Node {
			return ts.visitEachChild(
				transformNode(node),
				(childNode: ts.Node) => transformNodeAndChildren(childNode, context),
				context
			);
		}

		function transformNode(node: ts.Node): ts.Node {
			return node;
		}

		return (sourceFile: ts.SourceFile) => transformNodeAndChildren(sourceFile, context);
	};
}
