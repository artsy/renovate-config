# @artsy/renovate-config

This repo contains the shared configuration for Artsy's [renovate](https://renovatebot.com) setup.

## Usage

Add a `renovate.json` file to the root of your project. Use the `extends` key to uses one of our presets.

Your `renovate.json` file might look something like this

```json
{
  "extends": ["@artsy", "@artsy:example"]
}
```

Where `@artsy` is the `default` renovate config, and `@artsy:example` is the `example` renovate config (which doesn't actually exist).

The renovate config presets are stored in this projects package.json.

## Steps to add/modify configs

- Add/modify code in `generate-config.js`.
- Run `yarn generate-config`.
- Run `yarn jest`.
