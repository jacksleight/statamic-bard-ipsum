import { LoremIpsum } from 'lorem-ipsum'

export default (tiptap) => {

    const { Extension, InputRule } = tiptap.core;
    const { Fragment } = tiptap.pm.model;

    return Extension.create({

        name: 'bipCore',

        addInputRules() {
            return [
                new InputRule({
                    find: /^lorem(\d+)(p|s|w)?\n$/,
                    handler: ({ state, range, match, commands }) => {
                        const count = parseInt(match[1]);
                        const type = match[2] || 'p';
                        if (type === 'p') {
                            const { schema } = state;
                            const lorem = new LoremIpsum({}, 'plain');
                            const texts = Array.from({ length: count }, () => lorem.generateParagraphs(1));
                            const paragraphs = Fragment.from(texts.map(text => schema.nodes.paragraph.create(null, schema.text(text))));
                            const $from = state.doc.resolve(range.from);
                            if ($from.node(-1).canReplace($from.index(-1), $from.indexAfter(-1), paragraphs)) {
                                state.tr.replaceWith($from.before(), range.to, paragraphs);
                                commands.setTextSelection($from.before() + paragraphs.size - 1);
                            } else if (schema.nodes.hardBreak) {
                                state.tr.replaceWith(range.from, range.to, texts
                                    .flatMap(text => [schema.nodes.hardBreak.create(), schema.text(text)])
                                    .slice(1));
                            } else {
                                state.tr.insertText(texts.join(' '), range.from, range.to);
                            }
                        } else if (type === 's') {
                            const text = new LoremIpsum({}, 'plain')
                                .generateSentences(count);
                            state.tr.insertText(text, range.from, range.to)
                        } else if (type === 'w') {
                            const text = new LoremIpsum({}, 'plain')
                                .generateWords(count);
                            state.tr.insertText(text, range.from, range.to)
                        }
                    },
                })
            ];
        },

    })

};