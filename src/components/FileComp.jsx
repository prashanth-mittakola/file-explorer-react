import { useState } from "react";

const FileComp = ({ id, name, setShowIcons, showIcons, handleDeleteNode, renameHandler, showRenameInput }) => {
  const [fileName,setFileName] = useState(name);
  return (
    <div id={id} style={{ marginLeft: "25px" }} className="file">
      <div
        onMouseEnter={() => setShowIcons((prev) => ({ ...prev, deleteIcon: true, renameIcon: true }))}
        onMouseLeave={() => setShowIcons((prev) => ({ ...prev, deleteIcon: false, renameIcon: false }))}
      >
        <span role="img" aria-label="file">
          📄 {showRenameInput ? <input autoFocus type="text" value={fileName} onChange={(e)=>{setFileName(e.target.value)}} onBlur={renameHandler} /> : fileName}
        </span>

        {showIcons.deleteIcon && (
          <span
            role="img"
            aria-label="remove"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteNode(id);
            }}
            style={{ marginLeft: "20px" }}
          >
            ❌
          </span>
        )}
        {showIcons.renameIcon && (
          <span
            role="img"
            aria-label="rename"
            className="rename-icon"
            onClick={(e) => {
              e.stopPropagation();
              renameHandler();
            }}
            style={{ marginLeft: "10px" }}
          >
            ✏️
          </span>
        )}
      </div>
    </div>
  );
};

export default FileComp;
