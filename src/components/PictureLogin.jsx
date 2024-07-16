function PictureLogin({ functionChange, functionUpload }) {
  return (
    <div className="div-labels-uploadImage">
      <input
        className="input-image"
        onChange={functionChange}
        type="file"
        id="inputfile"
      ></input>
      <button className="button-image" onClick={functionUpload}>
        Upload
      </button>
    </div>
  );
}

export default PictureLogin;
