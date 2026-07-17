import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import devConfig from "./dev";
import prodConfig from "./prod";
import { resolve } from "path";

export default defineConfig<"vite">(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<"vite"> = {
    projectName: "teahaus",
    date: "2026-3-30",
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: ["@tarojs/plugin-generator"],
    defineConstants: {},
    alias: {
      "@/assets": resolve(__dirname, "../src/assets"),
      "@/components": resolve(__dirname, "../src/components"),
      "@/stores": resolve(__dirname, "../src/stores"),
      "@/datasets": resolve(__dirname, "../src/datasets")
    },
    copy: {
      patterns: [],
      options: {},
    },
    framework: "vue3",
    compiler: "vite",
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false,
          config: {
            namingPattern: "module",
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
        "postcss-css-variables": {
          enable: true,
          config: {
            preserve: false,
            variables: {
              "color-primary": "#7D5E4A",
              "color-primary-dark": "#5E4436",
              "color-secondary": "#B8835E",
              "color-accent": "#D9A84A",
              "color-bg": "#F5EDE0",
              "color-bg-card": "#FFFFFF",
              "color-bg-warm": "#EFE4D0",
              "color-text": "#3D322C",
              "color-text-secondary": "#736357",
              "color-text-muted": "#A09080",
              "color-border": "#D4C5B0",
              "color-border-light": "#E8DDCE",
              "color-price": "#B8835E",
              "color-star": "#D9A84A",
              "color-success": "#6F8C5E",
              "color-error": "#C5454A",
              "color-info": "#4A6B7A",
              "gradient-primary": "linear-gradient(135deg, #7D5E4A 0%, #6B4F3E 30%, #5E4436 60%, #4D382B 100%)",
            },
          },
        },
      },
    },
    h5: {
      publicPath: "/",
      staticDirectory: "static",
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: "css/[name].[hash].css",
        chunkFilename: "css/[name].[chunkhash].css",
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false,
          config: {
            namingPattern: "module",
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
    rn: {
      appName: "taroDemo",
      postcss: {
        cssModules: {
          enable: false,
        },
      },
    },
  };

  process.env.BROWSERSLIST_ENV = process.env.NODE_ENV;

  if (process.env.NODE_ENV === "development") {
    return merge({}, baseConfig, devConfig);
  }
  return merge({}, baseConfig, prodConfig);
});
