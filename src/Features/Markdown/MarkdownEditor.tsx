import { Spinner, Toggle, useTheme } from "@fluentui/react";
import { Editor } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import * as React from "react";

import { useLocalizedStrings } from "../LocalizedString/Hooks";
import { loadMarkdownRenderer } from "./DynamicImport";
import { getMarkdownEditorStyles } from "./Styles";

export interface IMarkdownEditorProps {
    label?: string;
    preview?: boolean;
    content?: string;
    height?: number;
    onChange?: (content: string) => void;
}

const MarkdownRendererLazy = React.lazy(loadMarkdownRenderer);

export const MarkdownEditor: React.FC<IMarkdownEditorProps> = props => {
    const { label, preview, content, height = 300, onChange } = props;

    const editorRef = React.useRef<editor.IStandaloneCodeEditor>();
    const theme = useTheme();
    const ls = useLocalizedStrings();
    const [showPreview, setShowPreview] = React.useState<boolean>(false);
    const [text, setText] = React.useState<string>(content);
    const [isActive, setIsActive] = React.useState(false);

    const styles = getMarkdownEditorStyles(theme, isActive, height);
    const editorContent = content ?? text;
    const editorOptions = React.useMemo<editor.IEditorOptions>(
        () => ({
            cursorWidth: 1,
            fontSize: 12,
            lineNumbersMinChars: 0,
            glyphMargin: false,
            lineNumbers: "off",
            folding: false,
            minimap: { enabled: false },
            hover: { enabled: false },
            wordWrap: "on",
            renderFinalNewline: "off",
            wordBasedSuggestions: false,
            renderLineHighlight: "none",
            occurrencesHighlight: false,
            scrollbar: {
                useShadows: false,
                horizontal: "hidden",
                vertical: "auto",
            },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
            contextmenu: false,
            tabFocusMode: true,
            pasteAs: { enabled: true },
        }),
        [],
    );

    const onEditorChange = React.useCallback(
        (content: string) => {
            onChange && onChange(content);
            setText(content);
        },
        [onChange],
    );

    const onEditorMount = React.useCallback((editor: editor.IStandaloneCodeEditor) => {
        editorRef.current = editor;
        editor.onDidFocusEditorText(() => setIsActive(true));
        editor.onDidBlurEditorText(() => setIsActive(false));
    }, []);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                {label && <label className={styles.label}>{label}</label>}
                {preview && (
                    <Toggle
                        label={ls.LS_COMMON_MARKDOWN_EDITOR_PRIVIEW}
                        inlineLabel={true}
                        checked={showPreview}
                        onChange={(e, checked) => setShowPreview(checked)}
                        role="checkbox"
                        disabled={!editorContent}
                    />
                )}
            </div>
            {showPreview ? (
                <div className={styles.perview}>
                    <React.Suspense
                        fallback={
                            <Spinner className={styles.spinner} label={ls.LS_COMMON_MARKDOWN_EDITOR_PRIVIEW_LOADING} />
                        }
                    >
                        <MarkdownRendererLazy content={editorContent} />
                    </React.Suspense>
                </div>
            ) : (
                <Editor
                    className={styles.editor}
                    language="markdown"
                    value={editorContent}
                    height={height}
                    options={editorOptions}
                    onChange={onEditorChange}
                    onMount={onEditorMount}
                    loading={<Spinner label={ls.LS_COMMON_MARKDOWN_EDITOR_EDITOR_LOADING} />}
                />
            )}
        </div>
    );
};
