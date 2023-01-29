/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/naming-convention */

interface ImportMetaEnv {
  readonly TYWZOJ_API_END_POINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
