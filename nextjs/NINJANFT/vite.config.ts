import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "@bangjelkoski/vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills({ protocolImports: true })],
  define: {
    global: "globalThis",
  },
  resolve: {
    alias: {
      buffer: "buffer/",
    },
    dedupe: ["valtio"],
  },
  optimizeDeps: {
    include: ["buffer", "valtio"],
    esbuildOptions: {
      target: "esnext",
    },
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});