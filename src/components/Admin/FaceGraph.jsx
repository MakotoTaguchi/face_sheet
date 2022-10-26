import React, { useEffect, useState } from "react";
import { VictoryChart, VictoryGroup, VictoryBar } from "victory";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Manage from "./Manage";
import { db, storage } from "../../firebase";
import "../css/FaceGraph.css";

const FaceGraph = (props) => {
  const date1 = new Date();
  const m = date1.getMonth() + 1;
  const d = date1.getFullYear() + "年" + m + "月" + date1.getDate() + "日";
  const [num, setNum] = useState();
  const [url, setUrl] = useState();
  const [facedata, setFacedata] = useState([{}]);
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);
  const [button3, setButton3] = useState(false);
  const [button4, setButton4] = useState(false);
  const [button5, setButton5] = useState(false);

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
    getDownloadURL(
      ref(storage, "image/" + props.count + "/" + d + ".jpeg")
    ).then((url) => {
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
            <div className="FaceGraph">
              <ArrowBackRoundedIcon
                sx={{ fontSize: 60 }}
                className="back"
                onClick={Back}
              />
              <Box className="buttonBox" sx={{ "& button": { m: 1 } }}>
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={button1}
                    onClick={() => {
                      setNum(2);
                      setButton1(true);
                      setButton2(false);
                      setButton3(false);
                      setButton4(false);
                      setButton5(false);
                    }}
                  >
                    {date1.getFullYear() +
                      "/" +
                      m +
                      "月" +
                      date1.getDate() +
                      "日"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={button2}
                    onClick={() => {
                      setButton1(false);
                      setButton2(true);
                      setButton3(false);
                      setButton4(false);
                      setButton5(false);
                    }}
                  >
                    {date1.getFullYear() +
                      "/" +
                      m +
                      "月" +
                      date1.getDate() +
                      "日"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={button3}
                    onClick={() => {
                      setButton1(false);
                      setButton2(false);
                      setButton3(true);
                      setButton4(false);
                      setButton5(false);
                    }}
                  >
                    {date1.getFullYear() +
                      "/" +
                      m +
                      "月" +
                      date1.getDate() +
                      "日"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={button4}
                    onClick={() => {
                      setButton1(false);
                      setButton2(false);
                      setButton3(false);
                      setButton4(true);
                      setButton5(false);
                    }}
                  >
                    {date1.getFullYear() +
                      "/" +
                      m +
                      "月" +
                      date1.getDate() +
                      "日"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={button5}
                    onClick={() => {
                      setButton1(false);
                      setButton2(false);
                      setButton3(false);
                      setButton4(false);
                      setButton5(true);
                    }}
                  >
                    {date1.getFullYear() +
                      "/" +
                      m +
                      "月" +
                      date1.getDate() +
                      "日"}
                  </Button>
                </div>
              </Box>
              {(() => {
                if (num === 2) {
                  if (url !== undefined) {
                    return (
                      <div className="wrap">
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
                                  <p className="graph-description">
                                    表情分析グラフ
                                  </p>
                                </div>
                              );
                            } else {
                              return <div>aaa</div>;
                            }
                          })()}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        <p>まだ画像が提出されていません。</p>
                      </div>
                    );
                  }
                }
              })()}
            </div>
          );
        }
      })()}
    </div>
  );
};

export default FaceGraph;
