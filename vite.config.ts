import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config(process.env.NODE_ENV === "test" ? { path: ".env.test" } : { path: ".env" });

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  define: {
    "process.env": process.env,
    "import.meta.env": process.env,
    "import.meta.env.VITE_API_URL": process.env.VITE_API_URL,
  },
});
