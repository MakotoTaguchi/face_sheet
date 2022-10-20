import React, { Fragment, useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import FaceSubmit from "./FaceSubmit";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable } from "firebase/storage";

function FaceExpression({ image , file}) {
  const { url } = image;
  const imgRef = useRef();
  const [object, setObject] = useState([{}]);
  const [num, setNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const date1 = new Date();
  const m = date1.getMonth()+1
  const d = date1.getFullYear() + "年" + m + "月" + date1.getDate() + "日";

  const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections[0].expressions.happy >= 0.9) {
      setObject({
        expressions: {
          angry: detections[0].expressions.angry,
          disgusted: detections[0].expressions.disgusted,
          fearful: detections[0].expressions.fearful,
          happy: detections[0].expressions.happy,
          neutral: detections[0].expressions.neutral,
          sad: detections[0].expressions.sad,
          surprised: detections[0].expressions.surprised,
        },
        point: 3,
        img: url,
      });
    } else if (detections[0].expressions.happy >= 0.8) {
      setObject({
        expressions: {
          angry: detections[0].expressions.angry,
          disgusted: detections[0].expressions.disgusted,
          fearful: detections[0].expressions.fearful,
          happy: detections[0].expressions.happy,
          neutral: detections[0].expressions.neutral,
          sad: detections[0].expressions.sad,
          surprised: detections[0].expressions.surprised,
        },
        point: 2,
        img: url,
      });
    } else if (detections[0].expressions.happy >= 0.5) {
      setObject({
        expressions: {
          angry: detections[0].expressions.angry,
          disgusted: detections[0].expressions.disgusted,
          fearful: detections[0].expressions.fearful,
          happy: detections[0].expressions.happy,
          neutral: detections[0].expressions.neutral,
          sad: detections[0].expressions.sad,
          surprised: detections[0].expressions.surprised,
        },
        point: 1,
        img: url,
      });
    } else {
      setObject({
        expressions: {
          angry: detections[0].expressions.angry,
          disgusted: detections[0].expressions.disgusted,
          fearful: detections[0].expressions.fearful,
          happy: detections[0].expressions.happy,
          neutral: detections[0].expressions.neutral,
          sad: detections[0].expressions.sad,
          surprised: detections[0].expressions.surprised,
        },
        point: 0,
        img: url,
      });
    }
  };

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ])
        .then(handleImage)
        .catch((e) => console.log(e));
    };

    imgRef.current && loadModels();
  }, []);

  const Reset = () => {
    setNum(num + 1);
  };

  const Submit = async () => {
    const querySnapshot = await getDocs(query(collection(db, "users"), where("uid", "==", auth.currentUser.uid)));
    const docId = querySnapshot.docs.map((doc) => doc.id).toString();
    const getRef = await getDoc(doc(db, "users", docId));

    await addDoc(collection(db, "expressions"), {
      date: d,
      angry: object.expressions.angry,
      disgusted: object.expressions.disgusted,
      fearful: object.expressions.fearful,
      happy: object.expressions.happy,
      neutral: object.expressions.neutral,
      sad: object.expressions.sad,
      surprised: object.expressions.surprised,
      id: getRef.data().id,
      img: object.img,
    });

    const point = getRef.data().point + object.point;
    await updateDoc(doc(db, "users", docId), {
      point: point,
    });
  };

  const OnFileUploadToFirebase = async() => {
    const querySnapshot = await getDocs(query(collection(db, "users"), where("uid", "==", auth.currentUser.uid)));
    const docId = querySnapshot.docs.map((doc) => doc.id).toString();
    const getRef = await getDoc(doc(db, "users", docId));
    const storageRef = ref(storage, "image/" + getRef.data().id + "/" + d + "." + file.name.split('.').pop());
    const uploadImage = uploadBytesResumable(storageRef, file)

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        setLoading(true);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setLoading(false);
        setIsUploaded(true);
      }
    )
  }

  return (
    <Fragment>
      {num >= 2 ? (
        <FaceSubmit />
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
              if (object.length !== undefined) {
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
                    <p className="submit reset" 
                      onClick={() => {
                        Submit()
                        OnFileUploadToFirebase()
                    }}>
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

export default FaceExpression;
