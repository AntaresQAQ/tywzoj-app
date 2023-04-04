/// <reference types="vite/client" />
/* eslint-disable @typescript-eslint/naming-convention */

interface ImportMetaEnv {
  readonly TYWZOJ_API_END_POINT: string;
  readonly TYWZOJ_LIGHT_LOGO_URL: string;
  readonly TYWZOJ_DARK_LOGO_URL: string;
  readonly TYWZOJ_ICON_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
