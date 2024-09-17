function PictureLogin({ functionChange, functionUpload }) {
  return (
    <div className="div-labels-uploadImage">
      <input
        className="input-image"
        onChange={functionChange}
        type="file"
        id="inputfile"
        style={{ display: "none" }}
      ></input>
      <button className="button-label">
        <label className="label-picture" htmlFor="inputfile">
          Choose File
        </label>{" "}
      </button>
      <button className="button-image" onClick={functionUpload}>
        Upload
      </button>
    </div>
  );
}

export default PictureLogin;
