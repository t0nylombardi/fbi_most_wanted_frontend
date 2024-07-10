import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

// Determine the appropriate .env file to load based on NODE_ENV or mode
const envFile =
  process.env.NODE_ENV === "test"
    ? ".env.test"
    : process.env.NODE_ENV === "production"
    ? ".env.prod"
    : ".env.development";

dotenv.config({ path: envFile });

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      "import.meta.env": {
        ...env,
        VITE_API_URL: process.env.VITE_API_URL,
        // Add any additional environment variables here
      },
    },
  };
});
