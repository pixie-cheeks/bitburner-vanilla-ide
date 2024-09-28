import { context } from 'esbuild';
import { BitburnerPlugin } from 'esbuild-bitburner-plugin';

const createContext = async () =>
  await context({
    entryPoints: ['servers/**/*.js'],
    outbase: 'servers',
    outdir: 'build',
    plugins: [
      BitburnerPlugin({
        port: 12525,
        types: 'NetscriptDefinitions.d.ts',
        mirror: {
          mirror: ['home', 'n00dles'],
        },
        distribute: {},
      }),
    ],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    logLevel: 'debug',
  });

const ctx = await createContext();
ctx.watch();
