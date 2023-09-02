import axios from "axios";
import { useState, useEffect } from "react";

const ProjectPage = () => {
  const [potatoUploadImage, setPotatoImageUpload] = useState();
  const [pepperUploadImage, setPepperImageUpload] = useState();
  const [showPepperResult, setShowPepperResult] = useState(false);
  const [showPotatoResult, setShowPotatoResult] = useState(false);
  const [pepperImg, setPepperImg] = useState("");
  const [potatoImg, setPotatoImg] = useState("");

  const [pepperResult, setPepperResult] = useState({
    class: "",
    confidence: "",
  });
  const [potatoResult, setPotatoResult] = useState({
    class: "",
    confidence: "",
  });
  // const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (pepperUploadImage !== undefined) {
      predictPepper();
    } else if (potatoUploadImage !== undefined) {
      predictPotato();
    }
  }, [pepperUploadImage, potatoUploadImage]);

  const predictPepper = () => {
    const formData = new FormData();
    formData.append("file", pepperUploadImage);
    axios
      .post("http://localhost:8000/predict-pepper", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const result = response.data;
        if ("class" in result) {
          setShowPepperResult(true);
          setPepperResult(result);
        }
      });
  };

  const predictPotato = () => {
    const formData = new FormData();
    formData.append("file", potatoUploadImage);
    axios
      .post("http://localhost:8000/predict-potato", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const result = response.data;
        if ("class" in result) {
          setShowPotatoResult(true);
          setPotatoResult(result);
        }
      });
  };

  return (
    <div className="projectpage">
      <div className="pepper">
        <h2> Predict Pepper Leaf </h2>
        <label className="custum-file-upload" htmlFor="file">
          <div className="imgBox">
            <img src={pepperImg} alt="" />
          </div>
          <div className="select_group">
            <div className="text">
              <span>Click to upload image</span>
            </div>
            <input
              type="file"
              accept="image/*"
              required="required"
              id="file-input"
              className="predictBtn"
              onChange={(e) => {
                setPepperImageUpload(e.target.files[0]);
                setPepperImg(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
        </label>
        <div className="result">
          {showPepperResult ? (
            <div className="result-box">
              <h5>
                Predicted: <br /> {pepperResult.class}
              </h5>
              <h5>
                Confidence: <br /> {pepperResult.confidence}
              </h5>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="potato">
        <h2> Predict Potato Leaf</h2>
        <label className="custum-file-upload" htmlFor="file">
          <div className="imgBox">
            <img src={potatoImg} alt="" />
          </div>
          <div className="select_group">
            <div className="text">
              <span>Click to upload image</span>
            </div>

            <input
              type="file"
              accept="image/*"
              required="required"
              id="file-input"
              className="predictBtn"
              onChange={(e) => {
                setPotatoImageUpload(e.target.files[0]);
                setPotatoImg(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
        </label>

        <div className="result">
          {showPotatoResult ? (
            <div className="result-box">
              <h5>
                Predicted: <br /> {potatoResult.class}
              </h5>
              <h5>
                Confidence : <br /> {potatoResult.confidence}
              </h5>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
