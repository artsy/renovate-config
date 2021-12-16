# @artsy/renovate-config

This repo contains the shared configuration for Artsy's [renovate](https://renovatebot.com) setup.

## Usage

### Configuration

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

### Integration

To add Renovate integration to a project:

> Using personal or administrtive github account:

1. Navigate to: https://github.com/settings/organizations
    > Using personal github account
    2. Click "Switch to another account" (at the top of the page)
        1. Select "artsy"
3. Click "Installed GitHub Apps" (left menu panel)
4. Find Renovate and click "Configure"
5. Scroll down to "Repository access"
6. Click "Select Repositories"
    1. Type a repository name
    2. Click to add the repository
7. Click Save
8. Confirm that Renovate integration was added in (selected) respository
    1. Navigate to repository
    2. Click on Settings > Integrations
    3. Confirm that Renovate is on the list
