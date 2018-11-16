const { initLogger } = require("renovate/lib/logger");
const { migrateAndValidate } = require("renovate/lib/config/migrate-validate");

initLogger();

const pkg = Object.freeze(require("../package.json"));
const renovateConfig = Object.freeze(pkg["renovate-config"]);

describe("@artsy/renovate-config", () => {
  it('package.json has "renovate-config"', () => {
    expect(renovateConfig).toBeDefined();
  });

  it(`"renovate-config" has "default"`, async () => {
    expect(renovateConfig["default"]).toBeDefined();
  });

  Object.keys(renovateConfig).forEach(assertConfig);

  function assertConfig(name) {
    it(`"${name}" isn't empty`, () => {
      const config = renovateConfig[name];
      expect(Object.keys(config).length).toBeGreaterThan(0);
    });

    it(`"${name}" is valid`, async () => {
      const config = renovateConfig[name];
      const { errors, warnings } = await migrateAndValidate({}, config);
      expect(errors).toEqual([]);
      expect(warnings).toEqual([]);
    });
  }
});

describe("renovate.json", () => {
  it("valid", async () => {
    const config = require("../renovate.json");
    const { errors, warnings } = await migrateAndValidate({}, config);
    expect(errors).toEqual([]);
    expect(warnings).toEqual([]);
  });
});
