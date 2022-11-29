# Prettier for Hamber 3 components

Format your Hamber components using Prettier.

## Features

-   Format your HTML, CSS, and JavaScript using prettier
-   Format Hamber syntax, e.g. each loops, if statements, await blocks, etc.
-   Format the JavaScript expressions embedded in the Hamber syntax
    -   e.g. expressions inside of `{}`, event bindings `on:click=""`, and more

## How to use in VS Code and Atom

This plugin comes with [Hamber for VS Code](https://github.com/hamberjs/language-tools) so just install the extension for your favorite editor and enjoy.

If you want to customize some formatting behavior, see section "Options" below.

Some of the extensions let you define options through extension-specific configuration. These settings are ignored however if there's any configuration file (`.prettierrc` for example) present.

## How to install manually

```bash
npm i --save-dev prettier-plugin-hamber prettier
```

## How to use (CLI)

Install `prettier` and `prettier-plugin-hamber` as dev dependencies in your project.

Then format your code using Prettier CLI. You may need to add `--plugin-search-dir=.`

```
prettier --write --plugin-search-dir=. ./**/*.html
```

If you want to customize some formatting behavior, see section "Options" below.

## Options

``Configurations are optional``

Make a `.prettierrc` file in your project directory and add your preferred [options](https://prettier.io/docs/en/options.html) to [configure Prettier](https://prettier.io/docs/en/configuration.html). When using Prettier through the CLI, you can also pass options through CLI flags, but a `.prettierrc` file is recommended.

### Hamber Sort Order

Sort order for `hamber:options`, scripts, markup, and styles.

Format: join the keywords `options`, `scripts`, `markup`, `styles` with a `-` in the order you want; or `none` if you don't want Prettier to reorder anything.

| Default                         | CLI Override                   | API Override                |
| ------------------------------- | ------------------------------ | --------------------------- |
| `options-scripts-markup-styles` | `--hamber-sort-order <string>` | `hamberSortOrder: <string>` |

> The `options` order option only exists since version 2. If you use version 1 of `prettier-plugin-hamber`, omit that option (so for example only write `scripts-markup-styles`).

### Hamber Strict Mode

More strict HTML syntax: less self-closed tags, quotes in attributes, no attribute shorthand (overrules `hamberAllowShorthand`).

Example:

```html
<!-- hamberStrictMode: true -->
<div foo="{bar}"></div>

<!-- hamberStrictMode: false -->
<div foo={bar} />
```

| Default | CLI Override                  | API Override               |
| ------- | ----------------------------- | -------------------------- |
| `false` | `--hamber-strict-mode <bool>` | `hamberStrictMode: <bool>` |

### Hamber Allow Shorthand

Option to enable/disable component attribute shorthand if attribute name and expression are same.

Example:

```html
<!-- allowShorthand: true -->
<input type="text" {value} />

<!-- allowShorthand: false -->
<input type="text" value={value} />
```

| Default | CLI Override                      | API Override                   |
| ------- | --------------------------------- | ------------------------------ |
| `true`  | `--hamber-allow-shorthand <bool>` | `hamberAllowShorthand: <bool>` |

### Hamber Bracket New Line

> Deprecated since 2.5.0. Use Prettier 2.4.0 and [bracketSameLine](https://prettier.io/docs/en/options.html#bracket-line) instead.

Put the `>` of a multiline element on a new line. Roughly the Hamber equivalent of the [jsxBracketSameLine](https://prettier.io/docs/en/options.html#jsx-brackets) rule. Setting this to `false` will have no effect for whitespace-sensitive tags (inline elements) when there's no whitespace between the `>` of the start tag and the inner content, or when there's no whitespace after the `>` of the end tag. You can read more about HTML whitespace sensitivity [here](https://prettier.io/blog/2018/11/07/1.15.0.html#whitespace-sensitive-formatting). You can adjust whitespace sensitivity through [this setting](https://prettier.io/docs/en/options.html#html-whitespace-sensitivity).

Example:

```html
<!-- before formatting -->
<span><div>foo</div><span>bar</span></span>
<div pretend break>content</div>

<!-- after formatting, hamberBracketNewLine true -->
<span
    ><div>foo</div>
    <span>bar</span></span
>
<div
     pretend
     break
>
    content
</div>

<!-- after formatting, hamberBracketNewLine false -->
<span
    ><div>foo</div>
    <span>bar</span></span>
<div
     pretend
     break>
    content
</div>
```

| Default | CLI Override                       | API Override                   |
| ------- | ---------------------------------- | ------------------------------ |
| `true`  | `--hamber-bracket-new-line <bool>` | `hamberBracketNewLine: <bool>` |

### hamber Indent Script And Style

Whether or not to indent the code inside `<script>` and `<style>` tags in hamber files. This saves an indentation level, but might break code folding in your editor.

| Default | CLI Override                              | API Override                         |
| ------- | ----------------------------------------- | ------------------------------------ |
| `true`  | `--hamber-indent-script-and-style <bool>` | `hamberIndentScriptAndStyle: <bool>` |

### `.prettierrc` example

```json
{
  "hamberSortOrder" : "options-styles-scripts-markup",
  "hamberStrictMode": true,
  "hamberBracketNewLine": false,
  "hamberAllowShorthand": false,
  "hamberIndentScriptAndStyle": false
}
```

## Usage with Tailwind Prettier Plugin

There's a Tailwind Prettier Plugin to format classes in a certain way. This plugin bundles `prettier-plugin-hamber`, so if you want to use the Tailwind plugin, uninstall `prettier-plugin-hamber` and use the Tailwind plugin instead. If you are using VS Code, make sure to have the Prettier extension installed and switch the default formatter for Hamber files to it.

More info: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#compatibility-with-other-prettier-plugins

## FAQ

### Why is the closing or opening tag (`>` or `<`) hugging the inner tag or text?

If you are wondering why this code

```html
<span><span>assume very long text</span></span>
```

becomes this

```html
<span
      ><span>assume very long text</span
    ></span
>
```

it's because of whitespsace sensitivity. For inline elements (`span`, `a`, etc) it makes a difference when rendered if there's a space (or newline) between them. Since we don't know if your slot inside your Hamber component is surrounded by inline elements, Hamber components are treated as such, too. You can adjust this whitespace sensitivity through [this setting](https://prettier.io/docs/en/options.html#html-whitespace-sensitivity). You can read more about HTML whitespace sensitivity [here](https://prettier.io/blog/2018/11/07/1.15.0.html#whitespace-sensitive-formatting).
