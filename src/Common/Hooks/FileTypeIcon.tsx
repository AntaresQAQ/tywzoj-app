import {
  DocumentIcon,
  FileCodeIcon,
  FileHTMLIcon,
  FileImageIcon,
  FileYMLIcon,
  ISvgIconProps,
  MarkDownLanguageIcon,
  PDFIcon,
  PhotoVideoMediaIcon,
  TextDocumentIcon,
  ZipFolderIcon,
} from "@fluentui/react-icons-mdl2";
import { ExcelDocumentIcon, PowerPointDocumentIcon, WordDocumentIcon } from "@fluentui/react-icons-mdl2-branded";
import * as React from "react";

import { CE_FileType, getFileType } from "@/Common/Utilities/FileType";

export const useFileTypeIcon = (filename: string, props?: ISvgIconProps) => {
  return React.useMemo(() => {
    const fileType = getFileType(filename);
    switch (fileType) {
      case CE_FileType.Code:
        return <FileCodeIcon {...props} />;
      case CE_FileType.Compressed:
        return <ZipFolderIcon {...props} />;
      case CE_FileType.Image:
        return <FileImageIcon {...props} />;
      case CE_FileType.Markdown:
        return <MarkDownLanguageIcon {...props} />;
      case CE_FileType.HTML:
        return <FileHTMLIcon {...props} />;
      case CE_FileType.PDF:
        return <PDFIcon {...props} />;
      case CE_FileType.Text:
        return <TextDocumentIcon {...props} />;
      case CE_FileType.Video:
        return <PhotoVideoMediaIcon {...props} />;
      case CE_FileType.YAML:
        return <FileYMLIcon {...props} />;

      case CE_FileType.Excel:
        return <ExcelDocumentIcon {...props} />;
      case CE_FileType.PowerPoint:
        return <PowerPointDocumentIcon {...props} />;
      case CE_FileType.Word:
        return <WordDocumentIcon {...props} />;

      case CE_FileType.Unknown:
      default:
        return <DocumentIcon {...props} />;
    }
  }, [filename, props]);
};
