import * as React from "react";

import { loadMarkdownRenderer } from "@/Features/Markdown/DynamicImport";
import { useAppSelector } from "@/Features/Store";

import { getUserInformationRendererStyles } from "./Styles/UserInformationRendererStyles";

const MarkdownRendererLazy = React.lazy(loadMarkdownRenderer);

export interface IUserInformationRenderProps {
  content: string;
}

export const UserInformationRenderer: React.FC<IUserInformationRenderProps> = props => {
  const { content = "" } = props;
  const styles = getUserInformationRendererStyles();

  const renderMarkdown = useAppSelector(state => state.env.renderMarkdownInUserBio);

  return renderMarkdown ? (
    <div>
      <MarkdownRendererLazy content={content} />
    </div>
  ) : (
    <div className={styles.content}>{content}</div>
  );
};

export default UserInformationRenderer;
