<!-- statamic:hide -->

# Bard Ipsum

<!-- /statamic:hide -->

This Statamic addon adds a lorem ipsum filler text generator to the Bard fieldtype.

## Installation

You can search for this addon in the `Tools > Addons` section of the Statamic control panel and click **install**, or run the following command from your project root:

```bash
composer require jacksleight/statamic-bard-ipsum
```

Or if you only want to use it during local development:

```bash
composer require jacksleight/statamic-bard-ipsum --dev
```

## Usage

Just type `lorem5` and hit enter. The number is how many paragraphs you want. You can also append the following modifiers:

* `lorem[n]p` / `lorem[n]`: Generate `n` paragraphs
* `lorem[n]s`: Generate `n` sentences
* `lorem[n]w`: Generate `n` words

##  Credits

This addon uses the awesome [lorem-ipsum](https://github.com/knicklabs/lorem-ipsum.js) text generator package by Nickolas Kenyeres.

## Sponsoring 

This addon is open-source and completely free to use. However fixing bugs, adding features and helping users takes time and effort. If you find this addon useful and would like to support its development a [one-time or monthly contribution](https://github.com/sponsors/jacksleight) would be greatly appreciated. Thanks! 🙂
