import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryGroup, VictoryBar } from "victory";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

import Manage from "./Manage";
import { db, storage } from "../firebase";

const FaceGraph = (props) => {
  const date1 = new Date();
  const m = date1.getMonth() + 1;
  const d = date1.getFullYear() + "年" + m + "月" + date1.getDate() + "日";
  const [num, setNum] = useState();
  const [url, setUrl] = useState();
  const [facedata, setFacedata] = useState([{}]);
  
  useEffect(() => {
    const q = query(
      collection(db, "expressions"),
      where("id", "==", props.count),
      where("date", "==", d)
    );
    onSnapshot(q, (expression) => {
      expression.forEach((doc) => {
        setFacedata(doc.data());
      });
    });
    getDownloadURL(ref(storage, "image/" + props.count + "/" + d + ".jpeg")).then((url) => {
      setUrl(url);
    });
  }, [d, props.count]);

  const Back = () => {
    setNum(1);
  };

  return (
    <div>
      {(() => {
        if (num === 1) {
          return <Manage />;
        } else {
          return (
            <div className="wrap">
              <ArrowBackRoundedIcon
                sx={{ fontSize: 60 }}
                className="back"
                onClick={Back}
              />
              <div className="face-graph">
                <div className="image-area">
                  <img src={url} />
                  <p className="description">今日の画像</p>
                </div>
                {(() => {
                  if (facedata.length === undefined) {
                    return (
                      <div className="graph-area">
                        <VictoryChart
                          height={500}
                          width={550}
                          domainPadding={20}
                        >
                          <VictoryGroup colorScale={"qualitative"}>
                            <VictoryBar
                              data={[
                                {
                                  x: "angry",
                                  y: facedata.angry,
                                },
                              ]}
                            />
                            <VictoryBar
                              data={[
                                {
                                  x: "disguest",
                                  y: facedata.disgusted,
                                },
                              ]}
                            />
                            <VictoryBar
                              data={[
                                {
                                  x: "fearful",
                                  y: facedata.fearful,
                                },
                              ]}
                            />
                            <VictoryBar
                              data={[
                                {
                                  x: "happy",
                                  y: facedata.happy,
                                },
                              ]}
                            />
                            <VictoryBar
                              data={[
                                {
                                  x: "neutral",
                                  y: facedata.neutral,
                                },
                              ]}
                            />
                            <VictoryBar
                              data={[
                                {
                                  x: "sad",
                                  y: facedata.sad,
                                },
                              ]}
                            />
                            <VictoryBar
                              data={[
                                {
                                  x: "surprised",
                                  y: facedata.surprised,
                                },
                              ]}
                            />
                          </VictoryGroup>
                        </VictoryChart>
                        <p className="graph-description">表情分析グラフ</p>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default FaceGraph;
