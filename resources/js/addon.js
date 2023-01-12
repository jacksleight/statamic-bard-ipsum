import Core from './extensions/core'

Statamic.booting(() => {

    Statamic.$bard.addExtension(() => Core);

});

