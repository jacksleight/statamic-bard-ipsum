# Bard Ipsum Lab

A Statamic 6 site that exists only to develop and test `jacksleight/statamic-bard-ipsum`. The package is pulled in over a composer path repository (`../statamic-bard-ipsum`, constraint `*`), so `vendor/jacksleight/statamic-bard-ipsum` is a symlink into the package's working tree and its PHP is live here. The lab always sees whatever branch the package is on, including uncommitted work.

Herd parks `~/Packages`, so the site answers on http://statamic-bard-ipsum--lab.test/ with no vhost step. The control panel is at `/cp`; log in with `/!/skip/admin`.

## What the addon is

One tiptap extension, `bipCore`, added to every Bard field in the control panel. It is a single InputRule, `/^lorem(\d+)(p|s|w)?\n$/` in the package's `resources/js/extensions/core.js`, which fires when Enter is pressed at the end of a textblock whose text is `loremN`. `p` or no suffix replaces the block with N paragraphs (`replaceWith(range.from - 1, ...)`), `s` and `w` replace the trigger with N plain-text sentences or words. There is no PHP beyond the service provider and nothing on the front end, so **the test surface is the control panel**: type, press Enter, save, then check the entry's page for what was stored.

**The CP assets are symlinked, not copied.** `public/vendor/statamic-bard-ipsum/build` is a relative symlink to `../../../../statamic-bard-ipsum/dist/build`, so `npm run build` in the package is live here on the next CP load. `vendor:publish --tag=statamic-bard-ipsum` would replace it with a copy; redo the symlink if that ever happens.

## Build steps the overlay does not carry

`composer.json`, `package.json`, `.env` and their locks are not baked into `.lab/`, so a rebuild redoes these after copying the overlay over a fresh `statamic new` shell (the shell's `pages` collection, its tree, `home`, `default` and the default blueprint are removed first):

- **Composer.** `minimum-stability: dev`, `prefer-stable: true`, `herd composer config repositories.0 path ../statamic-bard-ipsum`, then `herd composer require 'jacksleight/statamic-bard-ipsum:*'`.
- **CP assets.** `herd php artisan vendor:publish --tag=statamic-bard-ipsum`, then replace `public/vendor/statamic-bard-ipsum/build` with the symlink above.
- **npm.** `npm install && npm run build`.
- **`.env`.** `statamic new` writes `APP_URL` with `:8000`. Set `APP_URL=http://statamic-bard-ipsum--lab.test`.

## Tests

One collection, `tests`, routed at `/tests/{slug}`. Each entry has its own blueprint in `resources/blueprints/collections/tests/` and its own template in `resources/views/tests/`. Every template renders each Bard field twice through `_field.antlers.html`, as HTML and as escaped source. The entries are stored in their seed state (empty blocks waiting for a trigger), so exercising one in the CP and saving changes its file: put it back from `.lab/` afterwards.

The home page at `/` lists every entry with its CP edit link and its page, driven by each entry's `summary`.

Outcomes below were found on 2026-10-30 by typing each trigger in a headless Chromium against the real CP, pressing Enter and saving with Cmd+S, then reading the stored entry file and the rendered page. Package at `372d6a7` (`1.0.1-1-g372d6a7`), Statamic 6.39.0.

| Entry | Field | What was done | Outcome |
| ----- | ----- | ------------- | ------- |
| `/tests/basic` | plain Bard | `lorem3` on the first line, `lorem3p` in an empty paragraph mid-document, `lorem4s` and `lorem12w` in empty paragraphs under headings | All four work and save. `p` replaces the paragraph with three paragraphs, `s` gives four sentences in the one paragraph, `w` gives twelve words starting lowercase with no full stop (the generator's own output) |
| `/tests/contexts` | h2, h3, both lists, quote, table | `lorem2` in an empty h2, a bullet item, an ordered item, a blockquote and a table cell, `lorem3w` in an empty h3 | No errors and the entry saves. In the list items, the blockquote and the cell the paragraphs land inside the container (two paragraphs in one list item, not two items). **In the heading the h2 is removed and replaced by plain paragraphs.** `w` in the h3 fills the heading with words, which is the useful case |
| `/tests/sets` | Bard with a `note` set | `lorem3` in the empty paragraph between two sets | Works and saves. Afterwards the set below is node-selected rather than the caret sitting in the text |
| `/tests/inline` | `inline: true`, and a second field with `inline_hard_breaks` | `lorem3` in each, then `lorem2s` and `lorem6w` | **Finding: `p` keeps one paragraph and drops the rest**, in both fields, with no hard breaks between them in the second. `s` and `w` work and save as inline text |
| `/tests/rules-off` | `enable_input_rules: false` | `lorem3`, Enter | Correct: stays literal and Enter starts a new paragraph |
| `/tests/save-html` | `save_html: true` | `lorem3` | Works; stored as three `<p>` elements of HTML |
| `/tests/nested` | Bard inside a Replicator set | `lorem2` | Works and saves |

Edge cases tried on the same fields, not given entries of their own:

- **`lorem0` erases the trigger and inserts nothing, but `lorem0s` and `lorem0w` insert a random number of sentences or words**, because the generator treats 0 as "not given".
- **Backspace straight after a trigger** (tiptap's undo for input rules) puts back `lorem2` followed by a literal newline character inside the paragraph, not the plain trigger. Cmd+Z undoes cleanly.

These are recorded, not fixed: bug fixes are a separate pass on the package's `main`.

## Demos and screenshots

A second collection, `demos`, routed at `/demos/{slug}` with layout `demo` and template `demos/show`. **The demos exist to be photographed** for the marketplace slides, so they are written as plausible content rather than as tests.

| Entry | Blueprint | What it shows |
| ----- | --------- | ------------- |
| `/demos/brighton-seafront` | `article` | A heading and a paragraph about the seafront, then a last paragraph reading literally `lorem5`, waiting for Enter |

**Demo copy is short, light and written from nobody's point of view**: plain guide-style text about Brighton, no narrator and no first person. The entry is stored with `lorem5` unexpanded, because the "before" shot needs it there and the "after" shot is taken by pressing Enter in the CP without saving.

**The capture pipeline is not in this lab.** It is the `code-capture` skill in the website project, which hard-codes this entry's UUID in `shots/statamic-bard-ipsum.json`:

```
cd ~/Projects/jacksleight
.claude/skills/code-capture/scripts/capture statamic-bard-ipsum
.claude/skills/code-capture/scripts/import  statamic-bard-ipsum
```

**The filler is random and the generator takes no seed**, so every retake of the filled editor differs in its text. That is accepted; compare a retake by layout, not by pixels.

## Rebuilding

This lab is disposable, and everything in it worth keeping is baked into `.lab/` in the package repo, a flat mirror of these paths. To rebuild it, run the `setup-lab` skill. To add something that should survive a rebuild, re-run `setup-lab` with that instruction; do not edit `.lab/` by hand, and never sync the whole lab into it.

**Entry files are baked verbatim, UUIDs included.** The website's shot manifest hard-codes the demo entry's UUID, so it must not change.

## Skip (local login)

Local-only login bypass from the machine's skip package (`~/Packages/skip`), configured in `.claude/skip.json`: `GET /!/skip/{handle}` logs in as `{handle}@example.test` and lands on `?redirect=` (a path on this site) or the handle's own `redirect`. A listed handle with no user yet is created on its first login, with the password `password`.
