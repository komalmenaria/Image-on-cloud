import React, { useState } from "react";
import axios from 'axios';
 
function Upload() {
 
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  
const [loader, setloader] = useState(false);
  const handleFileInputChange = (e) => {
    console.log("submitting");
    const file = e.target.files[0];
    previewFile(file);
  };

  
  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (selectedFile) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    try {
      setloader(true)
      // always use axios for network call 
    let {data}=   await axios.post("/api/upload", {
        base64EncodedImage
      });
      
      if(data.status===true){
        alert("Image Uploaded Success")
        
    }else{
      alert(data.message)
    }
    setloader(false)
      
    } catch (error) {
      alert(error.message)
      console.error(`not able to upload${error.message}`);
    }
  };


  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSource(reader.result);
    };
  }; 
  return (
    <>
      <div className="container my-4">
        <h3>Upload Files</h3>
        <form className="my-4" onSubmit={handleSubmitFile}>
          <div className="mb-3">
            <input
              type="file"
              name="image"
              value={fileInputState}
              onChange={handleFileInputChange}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <h5> {loader && "uploading...."}</h5>
        {previewSource && (
          <img
            src={previewSource}
            alt="chosen"
            style={{ height: "300px", width: "300px", borderRadius: "50%" }}
          />
        )}
      </div>
    </>
  );
}

export default Upload;
