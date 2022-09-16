import React, { PureComponent, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { VictoryChart, VictoryGroup, VictoryBar } from "victory";

function NewPost({ image }) {
  const { url, width, height } = image;
  const imgRef = useRef();
  const canvasRef = useRef();
  const [object, setObject] = useState([{}]);

  const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
    faceapi.matchDimensions(canvasRef.current, {
      width,
      height,
    });

    const resized = faceapi.resizeResults(detections, {
      width,
      height,
    });
    faceapi.draw.drawDetections(canvasRef.current, resized);
    faceapi.draw.drawFaceExpressions(canvasRef.current, resized);

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
        faceapi.nets.faceLandmark68Net.loadFromUri("models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("models"),
        faceapi.nets.faceExpressionNet.loadFromUri("models"),
      ])
        .then(handleImage)
        .catch((e) => console.log(e));
    };
    imgRef.current && loadModels();
  }, []);

  if (object.length != undefined) {
    return (
      <div className="container">
        <div className="left" style={{ width, height }}>
          <img
            className="pushImage"
            ref={imgRef}
            crossOrigin="anonymous"
            src={url}
            alt=""
          />
          <canvas ref={canvasRef} width={width} height={height} />
        </div>
      </div>
    );
  }

  if (object.length == undefined) {
    console.log(object);
    return (
      <div className="container">
        <div className="left" style={{ width, height }}>
          <img
            className="pushImage"
            ref={imgRef}
            crossOrigin="anonymous"
            src={url}
            alt=""
          />
          <canvas ref={canvasRef} width={width} height={height} />
        </div>
        <div className="right">
          <VictoryChart domainPadding={20}>
            <VictoryGroup colorScale={"qualitative"}>
              <VictoryBar data={[{ x: "angry", y: object.angry }]} />
              <VictoryBar data={[{ x: "disguest", y: object.disgusted }]} />
              <VictoryBar data={[{ x: "fearful", y: object.fearful }]} />
              <VictoryBar data={[{ x: "happy", y: object.happy }]} />
              <VictoryBar data={[{ x: "neutral", y: object.neutral }]} />
              <VictoryBar data={[{ x: "sad", y: object.sad }]} />
              <VictoryBar data={[{ x: "surprised", y: object.surprised }]} />
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
    );
  }
}

export default NewPost;
