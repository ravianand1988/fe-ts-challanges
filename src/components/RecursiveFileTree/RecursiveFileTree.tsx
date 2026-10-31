import { useState } from "react";
import { cx } from "src/utilities";
import cssUtils from "../../utilities/styles.module.css";
import type { ITreeNode } from "./RecursiveFileTree.mock";
import css from "./RecursiveFileTree.module.css";

interface ITreeNodeItemProps {
  node: ITreeNode;
  onSelect: (node: ITreeNode) => void;
}

export const RecursiveFileTree = ({ node, onSelect }: ITreeNodeItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const isFolder = node.type === "folder";

  return (
    <div>
      <div
        className={cx(cssUtils.curPointer, css.fileTree)}
        onClick={() => {
          if (isFolder) {
            setExpanded((prev) => !prev);
          } else {
            onSelect(node);
          }
        }}
      >
        {isFolder ? (expanded ? "📂" : "📁") : "📄"} {node.name}
      </div>

      {isFolder && expanded && (
        <div className={cx(cssUtils.paddingLeft24)}>
          {node.children?.map((child) => (
            <RecursiveFileTree
              key={child.id}
              node={child}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};
