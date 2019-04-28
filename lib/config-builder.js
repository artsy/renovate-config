const merge = require("deepmerge");

const getCommitMessageExtraDefault = () => {
  const { getOptions } = require("renovate/lib/config/definitions");
  const commitMessageExtra = getOptions().find(opt => opt.name === "commitMessageExtra");
  return commitMessageExtra.default;
};

// -- BEGIN INDIVIDUAL CONFIG OPTIONS --------

// Use the master approval workflow for any non-artsy dependencies
const issueApproval = {
  masterIssue: true,
  packageRules: [
    {
      managers: ["npm"],
      depTypeList: ["dependencies", "devDependencies", "peerDependencies"],
      packagePatterns: ["*"],
      excludePackagePatterns: ["^@artsy"],
      masterIssueApproval: true
    }
  ]
};

// Don't try to update engines
const ignoreEngineUpdates = {
  packageRules: [
    {
      managers: ["npm"],
      depTypeList: ["engines"],
      packagePatterns: ["*"],
      enabled: false
    }
  ]
};

// Automatically assign the trivial label to any devDependency or orb updates
const trivialLabel = {
  packageRules: [
    {
      depTypeList: ["devDependencies", "orb"],
      labels: ["Version: Trivial"]
    }
  ]
};

// Automatically update the yarn and node orbs
const orbUpdates = {
  packageRules: [
    {
      packageNames: ["yarn", "node"],
      depTypeList: ["orb"],
      automerge: true,
      major: {
        automerge: false
      }
    }
  ]
};

// Automatically update @artsy/auto-config
const autoConfigUpdates = {
  packageRules: [
    {
      packageNames: ["@artsy/auto-config"],
      automerge: true,
      major: {
        automerge: false
      }
    }
  ]
};

const commitMessage = {
  commitMessageTopic: "dep {{depName}}",
  commitMessageExtra: `from {{{currentVersion}}} ${getCommitMessageExtraDefault()}`
};

// -- END INDIVIDUAL CONFIG OPTIONS --------

const shared = merge.all([
  {
    extends: [":disableRateLimiting"],
    enabledManagers: ["npm", "circleci"],
    ignoreDeps: ["artsy/hokusai"],
    timezone: "America/New_York",
    prBodyNotes: ["See full list of changes [here]({{sourceUrl}}/compare/v{{currentValue}}...v{{newValue}})."]
  },
  commitMessage,
  issueApproval,
  ignoreEngineUpdates,
  trivialLabel,
  orbUpdates,
  autoConfigUpdates
]);

const app = {
  extends: [":pinAllExceptPeerDependencies", "@artsy:shared"]
};

const lib = {
  extends: [":pinOnlyDevDependencies", "@artsy:shared"]
};

/**
 * TODO: Remove this once everything is converted over to app/lib
 * @deprecated
 */
const defaultConfig = {
  extends: ["config:base"],
  packageRules: [
    {
      managers: ["npm"],
      depTypeList: ["dependencies", "devDependencies", "peerDependencies"],
      packagePatterns: ["*"],
      excludePackagePatterns: ["^@artsy"],
      enabled: false
    },
    {
      managers: ["npm"],
      depTypeList: ["engines"],
      packagePatterns: ["*"],
      enabled: false
    },
    {
      depTypeList: ["devDependencies", "orb"],
      labels: ["Version: Trivial"]
    },
    {
      packageNames: ["yarn"],
      depTypeList: ["orb"],
      automerge: true,
      major: {
        automerge: false
      }
    },
    {
      packageNames: ["@artsy/auto-config"],
      automerge: true,
      major: {
        automerge: false
      }
    }
  ],
  enabledManagers: ["npm", "circleci"],
  ignoreDeps: ["artsy/hokusai"],
  vulnerabilityAlerts: {
    enabled: false
  },
  prHourlyLimit: 0,
  prBodyNotes: ["See full list of changes [here]({{sourceUrl}}/compare/v{{currentValue}}...v{{newValue}})."],
  timezone: "America/New_York"
};

module.exports = {
  configs: {
    app,
    lib,
    shared,
    default: defaultConfig
  },
  getCommitMessageExtraDefault
};
