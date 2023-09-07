import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { createHtmlPlugin } from "vite-plugin-html";
import { prismjsPlugin } from "vite-plugin-prismjs";
import gitRepoInfo from "git-repo-info";
// @ts-ignore
import { readFileSync } from "fs";

const repoInfo = gitRepoInfo();
const appEnv = loadEnv("", "", "");
// https://vitejs.dev/config/

export default defineConfig({
    envPrefix: "TYWZOJ_",
    base: appEnv.BASE_URL,
    plugins: [
        react(),
        tsconfigPaths(),
        createHtmlPlugin({
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: false,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                minifyCSS: true,
            },
            inject: {
                data: {
                    APP_VERSION: {
                        hash: repoInfo.abbreviatedSha,
                        date: repoInfo.committerDate,
                    },
                },
            },
        }),
        prismjsPlugin({
            languages: readFileSync(appEnv.PRISM_LANGUAGES_FILE, "utf-8").trim().split("\n"),
            css: false,
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                chunkFileNames: "assets/[name].[hash].js",
                entryFileNames: "[name].[hash].js",
                assetFileNames: "assets/[name].[hash].[ext]",
            },
        }
    },
});
