export const enum CE_FileType {
  Unknown,

  Code,
  Compressed,
  Image,
  HTML,
  Markdown,
  PDF,
  Text,
  Video,
  YAML,

  // M365 Productions
  Word,
  PowerPoint,
  Excel,
}

export const extensionTypeMap: { [k: string]: CE_FileType } = {
  c: CE_FileType.Code,
  cc: CE_FileType.Code,
  cpp: CE_FileType.Code,
  "c++": CE_FileType.Code,
  h: CE_FileType.Code,
  hpp: CE_FileType.Code,
  java: CE_FileType.Code,
  js: CE_FileType.Code,
  py: CE_FileType.Code,

  "7z": CE_FileType.Compressed,
  rar: CE_FileType.Compressed,
  zip: CE_FileType.Compressed,

  bmp: CE_FileType.Image,
  gif: CE_FileType.Image,
  jpg: CE_FileType.Image,
  jpeg: CE_FileType.Image,
  png: CE_FileType.Image,
  svg: CE_FileType.Image,
  webp: CE_FileType.Image,

  htm: CE_FileType.HTML,
  html: CE_FileType.HTML,

  md: CE_FileType.Markdown,

  pdf: CE_FileType.PDF,

  csv: CE_FileType.Text,
  txt: CE_FileType.Text,
  // For test data
  in: CE_FileType.Text,
  out: CE_FileType.Text,
  ans: CE_FileType.Text,

  "3gp": CE_FileType.Video,
  avi: CE_FileType.Video,
  flv: CE_FileType.Video,
  m4v: CE_FileType.Video,
  mkv: CE_FileType.Video,
  mp4: CE_FileType.Video,
  mpg: CE_FileType.Video,
  mpeg: CE_FileType.Video,
  wmv: CE_FileType.Video,

  yaml: CE_FileType.YAML,
  yml: CE_FileType.YAML,

  doc: CE_FileType.Word,
  docx: CE_FileType.Word,
  ppt: CE_FileType.PowerPoint,
  pptx: CE_FileType.PowerPoint,
  xls: CE_FileType.Excel,
  xlsx: CE_FileType.Excel,
};

export function getFileType(filename: string): CE_FileType {
  const filenameArr = filename.trim().toLowerCase().split(".");
  if (filenameArr.length <= 1) return CE_FileType.Unknown;
  return extensionTypeMap[filenameArr.at(-1)] || CE_FileType.Unknown;
}
