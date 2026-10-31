export interface ITreeNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: ITreeNode[];
}

export const MOCK_INITIAL_TREE_NODE_DATA: ITreeNode[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder",
        children: [
          {
            id: "3",
            name: "Button.tsx",
            type: "file",
          },
        ],
      },
      {
        id: "4",
        name: "App.tsx",
        type: "file",
      },
    ],
  },
  {
    id: "5",
    name: "package.json",
    type: "file",
  },
];
