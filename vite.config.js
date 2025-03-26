import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { siteConfig } from "./src/config/site";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.VITE_APP_TITLE": JSON.stringify(siteConfig.title),
    "process.env.VITE_APP_DESCRIPTION": JSON.stringify(siteConfig.description),
    "process.env.VITE_APP_KEYWORDS": JSON.stringify(siteConfig.keywords.join(", ")),
    "process.env.VITE_APP_AUTHOR": JSON.stringify(siteConfig.author),
  }
});