import {
  CommandButton,
  DefaultButton,
  DetailsList,
  Dialog,
  DialogFooter,
  IColumn,
  PrimaryButton,
  Selection,
  useTheme,
} from "@fluentui/react";
import { PageIcon } from "@fluentui/react-icons-mdl2";
import * as React from "react";

import { useFileTypeIcon } from "@/Common/Hooks/FileTypeIcon";
import {
  registerCircleRingIcon,
  registerDeleteIcon,
  registerDownloadIcon,
  registerStatusCircleCheckmarkIcon,
  registerUploadIcon,
} from "@/Common/IconRegistration";
import { IProblemFileEntityWithExtra } from "@/Common/ServerType/ProblemFile";
import { humanFileSize } from "@/Common/Utilities/HumanFileSize";

import { getProblemFileListStyles } from "./Styles/ProblemFileListStyles";

export interface IProblemFileListProps {
  files: IProblemFileEntityWithExtra[];
  onUpload: () => void;
  onDownload: (files: IProblemFileEntityWithExtra[]) => void;
  onDelete: (files: IProblemFileEntityWithExtra[]) => void;
}

interface IProblemFileItem {
  filename: string;
  size: string;
  uuid: string;
  file: IProblemFileEntityWithExtra;
}

interface IProblemFileColumn extends IColumn {
  fieldName?: keyof IProblemFileItem;
  onRender?: (item?: IProblemFileItem, index?: number, column?: IColumn) => JSX.Element | number | string;
}

registerCircleRingIcon();
registerStatusCircleCheckmarkIcon();
const deleteIcon = registerDeleteIcon();
const downloadIcon = registerDownloadIcon();
const uploadIcon = registerUploadIcon();

const ProblemFileTypeIcon: React.FC<{ filename: string }> = props =>
  useFileTypeIcon(props.filename, { style: { fontSize: 16 } });

export const ProblemFileList: React.FC<IProblemFileListProps> = props => {
  const theme = useTheme();
  const styles = getProblemFileListStyles(theme);

  const problemFiles = React.useMemo(
    (): IProblemFileItem[] =>
      props.files.map(file => ({
        filename: file.filename,
        size: file.file && humanFileSize(file.file.size),
        uuid: file.uuid,
        file,
      })),
    [props.files],
  );

  const totalSize = React.useMemo(
    () => humanFileSize(props.files.reduce((pre, cur) => pre + (cur.file?.size || 0), 0)),
    [props.files],
  );

  const columns = React.useMemo(
    (): IProblemFileColumn[] => [
      {
        key: "type",
        name: "File Type",
        minWidth: 16,
        maxWidth: 16,
        onRender: item => <ProblemFileTypeIcon filename={item.filename} />,
        onRenderHeader: () => <PageIcon style={{ fontSize: 16 }} />,
      },
      {
        key: "filename",
        fieldName: "filename",
        name: "Filename",
        minWidth: 100,
      },
      {
        key: "size",
        fieldName: "size",
        name: "Size",
        minWidth: 80,
        maxWidth: 120,
      },
    ],
    [],
  );

  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = React.useState(false);
  const [selectedCount, setSelectedCount] = React.useState(0);
  const selection = React.useRef(
    new Selection({
      onSelectionChanged: () => {
        setSelectedCount(selection.current.getSelectedCount());
      },
    }),
  );

  return problemFiles.length > 0 ? (
    <div>
      <DetailsList items={problemFiles} columns={columns} isSelectedOnFocus={false} selection={selection.current} />
      <div className={styles.footerText}>
        {problemFiles.length} file{problemFiles.length > 1 && "s"}, total size: {totalSize}
        {selectedCount > 0 ? (
          <>
            , {selectedCount} item{selectedCount > 1 && "s"} selected.
          </>
        ) : (
          "."
        )}
      </div>
      <div className={styles.buttons}>
        <CommandButton iconProps={{ iconName: uploadIcon }}>Upload</CommandButton>
        {selectedCount > 0 && (
          <>
            <CommandButton iconProps={{ iconName: downloadIcon }}>Download</CommandButton>
            <CommandButton iconProps={{ iconName: deleteIcon }} onClick={() => setShowDeleteConfirmDialog(true)}>
              Delete
            </CommandButton>
          </>
        )}
      </div>
      <Dialog
        hidden={!showDeleteConfirmDialog}
        dialogContentProps={{
          title: "Delete confirmation",
          isMultiline: true,
          subText: "This operation cannot be undone, please proceed with caution. Are you sure to delete?",
        }}
      >
        <DialogFooter>
          <PrimaryButton>Delete</PrimaryButton>
          <DefaultButton onClick={() => setShowDeleteConfirmDialog(false)}>Cancel</DefaultButton>
        </DialogFooter>
      </Dialog>
    </div>
  ) : (
    <div className={styles.emptyBox}>
      <div className={styles.emptyTextHint}>No Files</div>
      <PrimaryButton iconProps={{ iconName: uploadIcon }}>Upload</PrimaryButton>
    </div>
  );
};
