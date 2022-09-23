import React, { useEffect, useState } from "react";
import "./Face.css";
import NewPost2 from "./childComponents/NewPost2";
import Smile from "./assets/smile.png";

function Face2() {
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
        <NewPost2 image={image} />
      ) : (
        <div className="newPostCard">
          <div className="addPost">
            <img className="avater" src={Smile} />
            <div className="postForm">
              <label htmlFor="file">
                <p className="submit">写真提出</p>
              </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                id="file"
                style={{ display: "none" }}
                type="file"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Face2;
