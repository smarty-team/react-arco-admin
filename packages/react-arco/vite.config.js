import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vitePluginForArco } from "@arco-plugins/vite-react";
import svgrPlugin from '@arco-plugins/vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin({svgrOptions: {}}), vitePluginForArco()],
});
