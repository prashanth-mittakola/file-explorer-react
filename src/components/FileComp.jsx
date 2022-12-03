const FileComp = ({ id, name }) => {
  return (
    <div id={id} style={{ marginLeft: "25px" }} className="file">
      <span role="img" aria-label="file">
        📄 {name}
      </span>
    </div>
  );
};

export default FileComp;
