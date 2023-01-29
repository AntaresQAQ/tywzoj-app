/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/naming-convention */

interface ImportMetaEnv {
  readonly TYWZOJ_API_END_POINT: string;
  readonly TYWZOJ_LOGO_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
