import path from "path"
import type { Configuration, RuleSetRule } from "webpack"

import { resolveTsconfigPathsToAlias } from "./utils/pathAliases"

const webpackConfig: ((config: Configuration) => Configuration) | undefined = (
  config
) => {
  // config.module = config.module ?? {}
  // config.module.rules = config.module?.rules?.filter((rule) => {
  //   if (rule === "...") return false
  //   if (((rule as RuleSetRule)?.test as any)?.toString().includes("css")) {
  //     return false
  //   }
  //   return true
  // })

  // config.module.rules?.push({
  //   test: /\.(scss|css)$/,
  //   sideEffects: true,
  //   use: [
  //     "style-loader",
  //     "css-loader",
  //     {
  //       loader: "postcss-loader",
  //       options: {
  //         postcssOptions: {
  //           config: path.join(process.cwd(), "postcss.config.js"),
  //         },
  //       },
  //     },
  //     "sass-loader",
  //   ],
  // })

  return {
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias || {}),
        ...resolveTsconfigPathsToAlias({
          tsConfigPath: "tsconfig.json", // Using custom path
          webpackConfigBasePath: "./", // Using custom path
        }),
      },
    },
  }
}

export default webpackConfig
