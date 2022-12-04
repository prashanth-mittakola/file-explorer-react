import { useState } from "react";
import FileComp from "./FileComp";

const inputBoxInitialData = {
  visible: false,
  isFolder: false,
  value: "",
};
const showIconsInitialData = {
  folderIcon: false,
  fileIcon: false,
  renameIcon: false,
  deleteIcon: false,
};

// const SpanIcon = (props) => {
//   return (
//     <span style={{ margin: "0 5px" }} role="img" aria-label={props.ariaLabel} onClick={props.onClick}>
//       {props.icon}
//     </span>
//   );
// };

const Folder = ({ handleRenameNode, handleDeleteNode, handleInsertNode, explorerData }) => {
  const [name, setName] = useState(explorerData?.name || "");
  const [showRenameInput, setShowRenameInput] = useState(false);
  const [expandFolder, setExpandFolder] = useState(false);
  const [showIcons, setShowIcons] = useState(showIconsInitialData);
  const [inputBox, setInputBox] = useState(inputBoxInitialData);

  const handleCreateNewNode = () => {
    if (inputBox.value.trim()) {
      handleInsertNode(explorerData.id, inputBox.value, inputBox.isFolder);
    }
    setInputBox(inputBoxInitialData);
    setExpandFolder(true);
  };

  const deleteHandler = () => {
    handleDeleteNode(explorerData.id);
    setExpandFolder(false);
  };
  const renameHandler = () => {
    if (!showRenameInput) {
      setShowIcons((prev) => ({ ...prev, deleteIcon: false, fileIcon: false, folderIcon: false }));
    }
    handleRenameNode(explorerData.id, name);
    setShowRenameInput(!showRenameInput);
  };

  if (explorerData?.isFolder) {
    return (
      <div className="folder" style={{ marginLeft: "15px" }}>
        <div
          className="folder-block"
          onClick={() => !showRenameInput && setExpandFolder(!expandFolder)}
          onMouseEnter={() =>
            setShowIcons({
              folderIcon: true,
              fileIcon: true,
              renameIcon: true,
              deleteIcon: true,
            })
          }
          onMouseLeave={() =>
            setShowIcons({
              folderIcon: false,
              fileIcon: false,
              renameIcon: false,
              deleteIcon: false,
            })
          }
        >
          <span role="img" aria-label="folder">
            📂 {showRenameInput ? <input autoFocus type="text" value={name} onChange={(e) => setName(e.target.value)} onBlur={renameHandler} /> : name}
          </span>
          <div style={{ display: "inline-block", marginLeft: "20px" }}>
            {showIcons.folderIcon && (
              <span
                style={{ margin: "0 5px" }}
                role="img"
                aria-label="folder"
                onClick={(e) => {
                  e.stopPropagation();
                  setInputBox((prev) => {
                    return {
                      ...prev,
                      visible: !prev.visible,
                      isFolder: true,
                    };
                  });
                }}
              >
                📂
              </span>
            )}
            {showIcons.fileIcon && (
              <span
                style={{ margin: "0 5px" }}
                role="img"
                aria-label="file"
                onClick={(e) => {
                  e.stopPropagation();
                  setInputBox((prev) => {
                    return {
                      ...prev,
                      visible: !prev.visible,
                      isFolder: false,
                    };
                  });
                }}
              >
                📄
              </span>
            )}

            {showIcons.renameIcon && (
              <span
                style={{ margin: "0 5px" }}
                role="img"
                aria-label="rename"
                onClick={(e) => {
                  e.stopPropagation();
                  renameHandler();
                }}
              >
                ✏️
              </span>
            )}
            {showIcons.deleteIcon && (
              <span
                style={{ margin: "0 5px" }}
                role="img"
                aria-label="remove"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteHandler();
                }}
              >
                ❌
              </span>
            )}
          </div>
          {inputBox.visible && (
            <div style={{ marginLeft: "25px", marginTop: "5px" }}>
              <input
                type="text"
                autoFocus
                value={inputBox.value}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setInputBox({ ...inputBox, value: e.target.value })}
                onBlur={handleCreateNewNode}
              />
            </div>
          )}
        </div>
        {expandFolder && (
          <div className="folder-block">
            {explorerData.items.map(
              (item) =>
                item.id && (
                  <Folder
                    key={item.id}
                    explorerData={item}
                    handleInsertNode={handleInsertNode}
                    handleDeleteNode={handleDeleteNode}
                    handleRenameNode={handleRenameNode}
                    setName={setName}
                  />
                )
            )}
          </div>
        )}
      </div>
    );
  }
  return explorerData?.name ? (
    <FileComp
      id={explorerData.id}
      name={explorerData.name}
      handleDeleteNode={handleDeleteNode}
      showRenameInput={showRenameInput}
      renameHandler={renameHandler}
      showIcons={showIcons}
      setShowIcons={setShowIcons}
      setName={setName}
    />
  ) : (
    ""
  );
};

export default Folder;
