import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import tsconfigPath from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tsconfigPath(),
      checker({
        eslint: {
          useFlatConfig: true,
          lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"',
        },
        typescript: true,
      }),
    ],
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
    server: {
      port: mode === 'development' ? 3000 : 5173, // develop: 3000, build : 5173
      proxy: {
        '/api': {
          target: env.VITE_PROBIT_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api/exchange/v1'),
          secure: false,
        },
      },
    },
  };
});
