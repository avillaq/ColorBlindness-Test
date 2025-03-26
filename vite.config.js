import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import { siteConfig } from "./src/config/site";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "import.meta.env.VITE_APP_TITLE": JSON.stringify(siteConfig.title),
    "import.meta.env.VITE_APP_DESCRIPTION": JSON.stringify(siteConfig.description),
    "import.meta.env.VITE_APP_KEYWORDS": JSON.stringify(siteConfig.keywords.join(", ")),
    "import.meta.env.VITE_APP_AUTHOR": JSON.stringify(siteConfig.author),
  }
});