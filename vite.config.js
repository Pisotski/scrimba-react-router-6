import dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const { PORT = 3001 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	server: {
		proxy: {
			"/api": {
				target: `http://localhost:${PORT}`,
				changeOrigin: true,
			},
		},
	},
	build: {
		outDir: "dist/app",
	},
});
