import Core from './extensions/core'

Statamic.booting(() => {

    Statamic.$bard.addExtension(({ tiptap }) => Core(tiptap));

});

