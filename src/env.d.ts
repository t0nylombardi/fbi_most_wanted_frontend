/// <reference types="vite/client" />

interface ImportMetaEnv {
  API_URL: string;
  // NODE_ENV: string;
  // DEV: boolean;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
