const path = require("path");
const fs = require("fs");
const merge = require("deepmerge");
const prettier = require("prettier");

const ALLOWED_PLATFORMS = ["shopify", "shopify_local", "shopify_dev"];

function withEcommerceConfig(defaultConfig = {}) {
  let platform = defaultConfig?.serverRuntimeConfig?.ecommerce?.platform;

  if (!platform) {
    throw new Error(
      "The e-commerce platform is missing, please add a valid platform!"
    );
  }

  if (!ALLOWED_PLATFORMS.includes(platform)) {
    throw new Error(
      `The e-commerce platform (${platform}) cannot be found. Please use one of ${ALLOWED_PLATFORMS.join(
        ", "
      )}.`
    );
  }

  if (platform === "shopify_local" || platform === "shopify_dev") {
    platform = "shopify";
  }

  const platformNextConfig = require(path.join("../", platform, "next.config"));

  const config = merge(defaultConfig, platformNextConfig);

  const tsConfigPath = path.join(process.cwd(), "tsconfig.json");
  const tsConfig = require(tsConfigPath);

  tsConfig.compilerOptions.paths["@ecommerce"] = [`ecommerce/${platform}`];
  tsConfig.compilerOptions.paths["@ecommerce/*"] = [`ecommerce/${platform}/*`];

  fs.writeFileSync(
    tsConfigPath,
    prettier.format(JSON.stringify(tsConfig), { parser: "json" })
  );

  return config;
}

module.exports = { withEcommerceConfig };
