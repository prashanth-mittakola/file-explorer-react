import { useState } from "react";
import useTraverseTree from "./hooks/useTraverseTree";
import Folder from "./components/Folder";
import {data} from "./db/data";
import './App.css';

export default function App() {
  const [explorerData, setExplorerData] = useState(data);
  const { insertNode, deleteNode, renameNode } = useTraverseTree();

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  const handleDeleteNode = (itemId) => {
    const finalTree = deleteNode(explorerData, itemId);
    setExplorerData(finalTree);
  };
  const handleRenameNode = (itemId, newName) => {
    const finalTree = renameNode(explorerData, itemId, newName);
    setExplorerData(finalTree);
  };
  
  return (
    <div className="App">
      <h2>File Explorer</h2>
      <Folder 
        explorerData={explorerData} 
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
      />
    </div>
  );
}
