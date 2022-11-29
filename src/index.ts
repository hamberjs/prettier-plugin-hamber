import { SupportLanguage, Parser, Printer } from 'prettier';
import { print } from './print';
import { ASTNode } from './print/nodes';
import { embed } from './embed';
import { snipScriptAndStyleTagContent } from './lib/snipTagContent';

function locStart(node: any) {
    return node.start;
}

function locEnd(node: any) {
    return node.end;
}

export const languages: Partial<SupportLanguage>[] = [
    {
        name: 'hamber',
        parsers: ['hamber'],
        extensions: ['.hamber'],
        vscodeLanguageIds: ['hamber'],
    },
];

export const parsers: Record<string, Parser> = {
    hamber: {
        parse: (text) => {
            try {
                return <ASTNode>{ ...require(`hamber/compiler`).parse(text), __isRoot: true };
            } catch (err: any) {
                if (err.start != null && err.end != null) {
                    // Prettier expects error objects to have loc.start and loc.end fields.
                    // Hamber uses start and end directly on the error.
                    err.loc = {
                        start: err.start,
                        end: err.end,
                    };
                }

                throw err;
            }
        },
        preprocess: (text, options) => {
            text = snipScriptAndStyleTagContent(text);
            text = text.trim();
            // Prettier sets the preprocessed text as the originalText in case
            // the Hamber formatter is called directly. In case it's called
            // as an embedded parser (for example when there's a Hamber code block
            // inside markdown), the originalText is not updated after preprocessing.
            // Therefore we do it ourselves here.
            options.originalText = text;
            return text;
        },
        locStart,
        locEnd,
        astFormat: 'hamber-ast',
    },
};

export const printers: Record<string, Printer> = {
    'hamber-ast': {
        print,
        embed,
    },
};

export { options } from './options';
