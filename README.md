# @artsy/renovate-config

This repo contains the shared configuration for Artsy's [renovate](https://renovatebot.com) setup.

## Usage

Add a `renovate.json` file to the root of your project. Use the `extends` key to use Artsy's presets.

Recommended configuration for Artsy apps in `renovate.json` file looks like this:

```json
{
  "extends": [
    "@artsy:app"
  ],
  "reviewers": [
    "githubUser"
  ],
  "assignees": [
    "githubUser"
  ]
}
```

The renovate config presets are stored in this project's package.json.
