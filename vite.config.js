import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from '@vitejs/plugin-vue-jsx';
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import path from "path"
const INVALID_CHAR_REGEX = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g
const DRIVE_LETTER_REGEX = /^[a-z]:/i

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
            // 指定symbolId格式
            symbolId: "icon-[dir]-[name]",
            /**
             * 自定义插入位置
             * @default: body-last
             */
            inject: "body-last" | "body-first",

            /**
             * custom dom id
             * @default: __svg__icons__dom__
             */
            customDomId: "__svg__icons__dom__",
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            "/v1": {
                target: "https://api.tokenlist.app/v1",
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/v1/, ""),
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                // https://github.com/rollup/rollup/blob/master/src/utils/sanitizeFileName.ts
                sanitizeFileName(fileName) {
                    const match = DRIVE_LETTER_REGEX.exec(fileName)
                    const driveLetter = match ? match[0] : ""
                    return driveLetter + fileName.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "")
                },
            },
        },
    },
})
