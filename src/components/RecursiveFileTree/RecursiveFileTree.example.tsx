import { RecursiveFileTree } from "./RecursiveFileTree";
import { MOCK_INITIAL_TREE_NODE_DATA } from "./RecursiveFileTree.mock";

export const RecursiveFileTreeExample = () => {
  return (
    <div>
      <h2>Recursive File Tree Example</h2>
      {MOCK_INITIAL_TREE_NODE_DATA.map((node, index) => (
        <RecursiveFileTree key={index} node={node} onSelect={(_) => {}} />
      ))}
    </div>
  );
};
