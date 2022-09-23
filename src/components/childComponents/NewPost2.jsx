import React, { Fragment, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import Face2 from "../Face2";

function NewPost2({ image }) {
  const { url } = image;
  const imgRef = useRef();
  const [object, setObject] = useState([{}]);
  const [num, setNum] = useState(1);

  const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    setObject({
      angry: detections[0].expressions.angry,
      disgusted: detections[0].expressions.disgusted,
      fearful: detections[0].expressions.fearful,
      happy: detections[0].expressions.happy,
      neutral: detections[0].expressions.neutral,
      sad: detections[0].expressions.sad,
      surprised: detections[0].expressions.surprised,
    });
  };

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("models"),
        faceapi.nets.faceExpressionNet.loadFromUri("models"),
      ])
        .then(handleImage)
        .catch((e) => console.log(e));
    };
    imgRef.current && loadModels();
  }, []);

  const Reset = () => {
    setNum(num + 1);
  };

  const Submit = () => {
    console.log(object);
  };

  return (
    <Fragment>
      {num >= 2 ? (
        <Face2 />
      ) : (
        <div className="container">
          <div className="left">
            <img
              className="pushImage"
              ref={imgRef}
              crossOrigin="anonymous"
              src={url}
              alt=""
            />
          </div>
          <div className="right">
            {(() => {
              if (object.length != undefined) {
                return (
                  <div>
                    <p>顔認識できません。</p>
                    <p className="submit reset" onClick={Reset}>
                      やり直す
                    </p>
                  </div>
                );
              } else {
                return (
                  <div>
                    <p>顔認識成功</p>
                    <p className="submit reset" onClick={Reset}>
                      選び直す
                    </p>
                    <p className="submit reset" onClick={Submit}>
                      提出
                    </p>
                  </div>
                );
              }
            })()}
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default NewPost2;
