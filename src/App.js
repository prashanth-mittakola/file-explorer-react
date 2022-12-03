import { useState } from "react";
import useTraverseTree from "./hooks/useTraverseTree";
import Folder from "./components/Folder";
import data from "./db/data.json";
import './App.css';

console.clear();
export default function App() {
  const [explorerData, setExplorerData] = useState(data);
  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };

  return (
    <div className="App">
      <h2>File Explorer</h2>
      <Folder explorerData={data} handleInsertNode={handleInsertNode} />
    </div>
  );
}
