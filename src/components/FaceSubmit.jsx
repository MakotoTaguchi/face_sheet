import React, { useEffect, useState } from "react";
import "./css/Face.css";
import FaceExpression from "./FaceExpression";
import Smile from "./assets/smile.png";

function FaceSubmit() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({
          url: img.src,
          width: img.width / 8,
          height: img.height / 8,
        });
      };
    };

    file && getImage();
  }, [file]);

  return (
    <div>
      {image ? (
        <FaceExpression image={image} file={file}/>
      ) : (
        <div className="newPostCard">
          <div className="addPost">
            <img className="avater" src={Smile} alt="smileavatar" />
            <div className="postForm">
              <label htmlFor="file">
                <p className="submit">写真提出</p>
              </label>
              <input
                onChange={(e) => {
                  setFile(e.target.files[0])
                }}
                id="file"
                style={{ display: "none" }}
                type="file"
                accept=".png, .jpeg, .jpg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FaceSubmit;
