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
import { ref, uploadBytesResumable } from "firebase/storage";

import { auth, db, storage } from "../../firebase";

function FaceExpression({ image, file }) {
  const { url } = image;
  const imgRef = useRef();
  const [object, setObject] = useState([{}]);
  const [num, setNum] = useState();
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  let before = new Date(); //date関数が不要になる。
  let week = [];
  for (let i = 0; i < 7; i++) {
    week.unshift(before.getMonth() + 1 + "月" + before.getDate() + "日");
    before.setDate(before.getDate() - 1); //１日もどす
  }

  const d = week[6];
  console.log(d);

  const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections[0].expressions.happy >= 0.7) {
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
      });
    } else if (
      detections[0].expressions.happy >= 0.5 ||
      detections[0].expressions.surprised >= 0.7 ||
      detections[0].expressions.neutral >= 0.7
    ) {
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
      });
    } else if (
      detections[0].expressions.happy >= 0.3 ||
      detections[0].expressions.surprised >= 0.5 ||
      detections[0].expressions.neutral >= 0.5
    ) {
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

  const Submit = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("uid", "==", auth.currentUser.uid))
    );
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
      point: object.point,
    });

    const point = getRef.data().point + object.point;
    await updateDoc(doc(db, "users", docId), {
      point: point,
    });

    setNum(2);
  };

  const OnFileUploadToFirebase = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("uid", "==", auth.currentUser.uid))
    );
    const docId = querySnapshot.docs.map((doc) => doc.id).toString();
    const getRef = await getDoc(doc(db, "users", docId));
    const storageRef = ref(
      storage,
      "image/" + getRef.data().id + "/" + d + ".jpeg"
    );
    const uploadImage = uploadBytesResumable(storageRef, file);

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
    );
  };

  return (
    <Fragment>
      {(() => {
        if (num === 1) {
          return <FaceSubmit />;
        } else if (num === 2) {
          return (
            <div>
              {(() => {
                if (loading === true) {
                  return (
                    <div>
                      <p>画像をアップロード中です</p>
                    </div>
                  );
                } else if (loading === false && isUploaded === true) {
                  return (
                    <div>
                      <p>アップロードが終わりました</p>
                    </div>
                  );
                }
              })()}
            </div>
          );
        } else {
          return (
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
                        <p
                          className="submit reset"
                          onClick={() => {
                            setNum(1);
                          }}
                        >
                          やり直す
                        </p>
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        <p>顔認識成功</p>
                        <p
                          className="submit reset"
                          onClick={() => {
                            setNum(1);
                          }}
                        >
                          選び直す
                        </p>
                        <p
                          className="submit reset"
                          onClick={() => {
                            Submit();
                            OnFileUploadToFirebase();
                          }}
                        >
                          提出
                        </p>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          );
        }
      })()}
    </Fragment>
  );
}

export default FaceExpression;
