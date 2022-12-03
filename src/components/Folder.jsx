import { useState } from "react";
import FileComp from "./FileComp";

console.clear();

const inputBoxInitialData = {
  visible: false,
  isFolder: false,
  value: "",
};
const Folder = ({ handleInsertNode = () => {}, explorerData }) => {
  const [expandFolder, setExpandFolder] = useState(false);
  const [showCreateHandlers, setShowCreateHandlers] = useState(false);
  const [inputBox, setInputBox] = useState(inputBoxInitialData);

  const handleCreateNewNode = () => {
    if (inputBox.value.trim()) {
      handleInsertNode(explorerData.id, inputBox.value, inputBox.isFolder);
    }
    setInputBox(inputBoxInitialData);
    setExpandFolder(true);
  };

  if (explorerData.isFolder) {
    return (
      <div className="folder" style={{ marginLeft: "15px" }}>
        <div
          className="folder-name"
          onClick={()=>setExpandFolder(!expandFolder)}
          onMouseEnter={() => setShowCreateHandlers(true)}
          onMouseLeave={() => setShowCreateHandlers(false)}
        >
          <span role="img" aria-label="folder">
            📂 {explorerData.name}
          </span>
          {(inputBox.visible || showCreateHandlers) && (
            <div style={{ display: "inline-block", marginLeft: "150px" }}>
              <span
                style={{ margin: "0 10px" }}
                role="img"
                aria-label="folder"
                onClick={(e) => {
                  e.stopPropagation();
                  setInputBox({
                    ...inputBox,
                    visible: !inputBox.visible,
                    isFolder: true,
                  });
                }}
              >
                📂
              </span>
              <span
                role="img"
                aria-label="file"
                onClick={(e) => {
                  e.stopPropagation();
                  setInputBox({
                    ...inputBox,
                    visible: !inputBox.visible,
                    isFolder: false,
                  });
                }}
              >
                📄
              </span>
            </div>
          )}
        </div>
        {inputBox.visible && (
          <div style={{ marginLeft: "25px", marginTop: "5px" }}>
            <input
              type="text"
              value={inputBox.value}
              onChange={(e) =>
                setInputBox({ ...inputBox, value: e.target.value })
              }
            />
            <button
              style={{ marginLeft: "5px" }}
              onClick={() => {
                handleCreateNewNode();
              }}
            >
              Add
            </button>
          </div>
        )}
        {expandFolder && (
          <div className="folder-block">
            {explorerData.items.map((item) => (
              <Folder key={item.id} explorerData={item} />
            ))}
          </div>
        )}
      </div>
    );
  }
  return <FileComp id={explorerData.id} name={explorerData.name} />;
};

export default Folder;
