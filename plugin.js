import { transformSync } from "@babel/core";
import babelGlimmerPreset from "@glimmerx/babel-preset";

const scriptFileRegex = /\.(ts|js)$/;

export default function vitePluginGlimmerX(
  plgOptions
) {
  let viteConfig;
  return {
    name: 'vite:glimmerx',
    enforce: 'pre',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig;
    },

    transform(rawCode, id) {
      let code = rawCode;
      if (!scriptFileRegex.test(id)) {
        return;
      }

      return {
        code: transformSrcCode(code, id, plgOptions, viteConfig),
        map: null,
      };

    },
  };
}


function transformSrcCode(code, fileName, plgOptions, viteConfig) {
    let presets = [function (api, opts) {
        return babelGlimmerPreset(api, {
          ...opts, ...{
            isDebug: !viteConfig.isProduction
          }
        })
    }];
    
  let result = transformSync(code, {
    sourceType: "module",
    babelrc: false,
    configFile: false,
    envName: viteConfig.mode,
    filename: fileName,
    presets
  });
  return result.code;
}