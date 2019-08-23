const { getCommitMessageExtraDefault, configs } = require("../lib/config");

const pkg = Object.freeze(require("../package.json"));
const renovateConfig = Object.freeze(pkg["renovate-config"]);

describe("@artsy/renovate-config", () => {
  it('package.json has "renovate-config"', () => {
    expect(renovateConfig).toBeDefined();
  });

  it(`"renovate-config" has "default"`, async () => {
    expect(renovateConfig["default"]).toBeDefined();
  });

  it(`"renovate-config" has "lib" and it extends shared`, async () => {
    expect(renovateConfig.lib).toBeDefined();
    expect(renovateConfig.lib.extends.includes("@artsy:shared")).toBeTruthy();
  });

  it(`"renovate-config" has "app" and it extends shared`, async () => {
    expect(renovateConfig.app).toBeDefined();
    expect(renovateConfig.app.extends.includes("@artsy:shared")).toBeTruthy();
  });

  Object.keys(renovateConfig).forEach(assertConfig);

  function assertConfig(name) {
    it(`"${name}" isn't empty`, () => {
      const config = renovateConfig[name];
      expect(Object.keys(config).length).toBeGreaterThan(0);
    });

    it(`${name} matches generated config`, () => {
      expect(renovateConfig[name]).toEqual(configs[name]);
    });
  }
});

describe("generate-config", () => {
  describe("getCommitMessageExtraDefault()", () => {
    let message;
    expect(() => {
      message = getCommitMessageExtraDefault();
    }).not.toThrow();
    expect(message).toBeDefined();
  });
});
