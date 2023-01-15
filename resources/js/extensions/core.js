import { LoremIpsum } from 'lorem-ipsum'
const { Extension, InputRule, generateJSON } = Statamic.$bard.tiptap.core;

const Core = Extension.create({

    name: 'bip_core',

    addInputRules() {
        return [
            new InputRule({
                find: /^lorem(\d*)(p|s|w)?\n$/,
                handler: ({ state, range, match }) => {
                    console.log(match);
                    const count = parseInt(match[1]);
                    const type = match[2] || 'p';
                    if (type === 'p') {
                        const html = new LoremIpsum({}, 'html')
                            .generateParagraphs(count);
                        const extensions = this.editor.extensionManager.extensions;
                        const node = state.schema.nodeFromJSON(generateJSON(html, extensions));
                        state.tr.replaceWith(range.from - 1, range.to, node.content);
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
export default Core;