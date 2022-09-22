import React, { useEffect, useState } from "react";
import "./Face.css";
import NewPost from "./childComponents/NewPost";
import TagFacesIcon from "@mui/icons-material/TagFaces";

function Face() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({
          url: img.src,
          width: img.width / 5,
          height: img.height / 5,
        });
      };
    };

    file && getImage();
  }, [file]);

  return (
    <div>
      {image ? (
        <NewPost image={image} />
      ) : (
        <div className="newPostCard">
          <div className="addPost">
            <TagFacesIcon fontSize="large" />
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

export default Face;
