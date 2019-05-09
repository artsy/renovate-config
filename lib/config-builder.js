const merge = require("deepmerge");

const getCommitMessageExtraDefault = () => {
  const { getOptions } = require("renovate/dist/config/definitions");
  const commitMessageExtra = getOptions().find(opt => opt.name === "commitMessageExtra");
  return commitMessageExtra.default;
};

// -- BEGIN INDIVIDUAL CONFIG OPTIONS --------

const autoMerge = {
  automerge: true,
  major: {
    automerge: false
  }
};

// Use the master approval workflow for any non-artsy dependencies
const issueApproval = {
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
// Should only be applied to libs
const trivialLabel = {
  packageRules: [
    {
      depTypeList: ["dependencies", "peerDependencies", "devDependencies", "orb"],
      labels: ["Version: Trivial"]
    }
  ]
};

// Automatically update the yarn and node orbs
const orbUpdates = {
  packageRules: [
    {
      packageNames: ["yarn", "node"],
      depTypeList: ["orb"]
    }
  ]
};

const artsyPRs = {
  packageRules: [
    {
      packagePatterns: ["^@artsy"],
      prBodyNotes: ["See full list of changes [here]({{sourceUrl}}/compare/v{{currentValue}}...v{{newValue}})."]
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
    ...autoMerge
  },
  commitMessage,
  issueApproval,
  ignoreEngineUpdates,
  orbUpdates,
  artsyPRs
]);

const app = merge.all([
  {
    extends: [":pinAllExceptPeerDependencies", "@artsy:shared"]
  }
]);

const lib = merge.all([
  {
    extends: [":pinOnlyDevDependencies", "@artsy:shared"]
  },
  trivialLabel
]);

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
