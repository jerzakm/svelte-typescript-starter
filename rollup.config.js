import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import postcss from 'rollup-plugin-postcss'
import html from 'rollup-plugin-bundle-html'
import typescript from 'rollup-plugin-typescript'

export default {
    input: 'src/main.ts',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'dist/bundle.js'
    },
    watch: {
        exclude: ['node_modules/**']
    },
    plugins: [
        typescript(),
        svelte({
            // enable run-time checks when not in production
            dev: true,
            // we'll extract any component CSS out into
            // a separate file  better for performance
            // css: css => {
            //     css.write('dist/bundle.css')
            // },
        }),
        html({
            template: 'src/index.html',
            dest: "dist",
            filename: 'index.html',
            inject: 'body'
        }),
        postcss({
            extract: true,
            minimize: true,
            use: [
                ['sass', {
                    includePaths: [
                        './src/styles/theme',
                        './node_modules'
                    ]
                }]
            ]
        }),
        resolve(),
        commonjs(),
        serve({
            // Launch in browser (default: false)
            open: true,

            // Folder to serve files from
            contentBase: '',

            // Multiple folders to serve from
            contentBase: ['dist'],

            // Options used in setting up server
            host: 'localhost',
            port: 3000,
        }),

        livereload()
    ]
}