import { LoremIpsum } from 'lorem-ipsum'
const { Extension, InputRule, generateJSON } = Statamic.$bard.tiptap.core;

const Core = Extension.create({

    name: 'bis_core',

    addInputRules() {
        return [
            new InputRule({
                find: /^lorem(\d*)\n$/,
                handler: ({ state, range, match }) => {
                    const count = parseInt(match[1]);
                    const html = new LoremIpsum({}, 'html')
                        .generateParagraphs(count)
                        .replace(/^<p>./, v => v.toLowerCase())
                        .replace(/^<p>/, '<p>Lorem ipsum ');
                    const extensions = this.editor.extensionManager.extensions;
                    const node = state.schema.nodeFromJSON(generateJSON(html, extensions));
                    state.tr.replaceWith(range.from - 1, range.to, node.content);
                },
            })
        ];
    },

})
export default Core;