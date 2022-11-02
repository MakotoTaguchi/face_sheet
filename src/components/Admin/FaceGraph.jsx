import React, { useEffect, useState } from "react";
import {
  VictoryChart,
  VictoryGroup,
  VictoryBar,
  VictoryLine,
  VictoryScatter,
} from "victory";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Manage from "./Manage";
import { db, storage } from "../../firebase";
import "../css/FaceGraph.css";

const FaceGraph = (props) => {
  const [d, setD] = useState("trend");
  const [num, setNum] = useState();
  const [graphNum, setGraphNum] = useState();
  const [url, setUrl] = useState();
  const [facedata, setFacedata] = useState([{}]);
  const [graphData, setGraphData] = useState([{}]);
  const [happy, setHappy] = useState([{}]);

  let before = new Date(); //date関数が不要になる。
  let week = [];
  for (let i = 0; i < 7; i++) {
    week.unshift(before.getMonth() + 1 + "月" + before.getDate() + "日");
    before.setDate(before.getDate() - 1); //１日もどす
  }

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
    getDownloadURL(ref(storage, "image/" + props.count + "/" + before.getFullYear() + "年" + d + ".jpeg"))
      .then((url) => {
        setUrl(url);
      })
      .catch((e) => {
        console.log(e.message);
        setNum(3);
      });
  }, [d, props.count]);

  useEffect(() => {
    for (let i = 6; i >= 0; i--) {
      const p = query(
        collection(db, "expressions"),
        where("id", "==", props.count),
        where("date", "==", week[i])
      );
      onSnapshot(p, (expression) => {
        expression.forEach((doc) => {
          setGraphData((prevState) => [...prevState, doc.data()]);
        });
      });
    }
  }, []);

  if (graphData.length > 2) {
    console.log(graphData[1].date);
  }

  useEffect(() => {
    if (graphData.length === 2 || graphData.length === 1) {
      setGraphNum(1);
    } else if (graphData.length > 2) {
      for (let i = 6; i >= 2; i--) {
        console.log(week[i]);
        for (let j = 1; j <= graphData.length - 1; j++) {
          console.log(graphData[j].date);
          if (graphData[j].date === week[i]) {
            setHappy((prevState) => [...prevState, graphData[j].happy]);
            break;
          } else if (
            j === graphData.length - 1 &&
            graphData[j].date !== week[2]
          ) {
            setHappy((prevState) => [...prevState, 0]);
          }
        }
      }
      setGraphNum(2);
    }
  }, [graphData.length]);

  console.log(happy);

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
                onClick={() => {
                  setNum(1);
                }}
              />
              <Box className="buttonBox" sx={{ "& button": { m: 1 } }}>
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      setD("trend");
                    }}
                  >
                    総合
                  </Button>
                  {(function () {
                    const list = [];
                    for (let i = 6; i >= 2; i--) {
                      list.push(
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => {
                            setD(week[i]);
                          }}
                        >
                          {before.getFullYear() + "年" + week[i]}
                        </Button>
                      );
                    }
                    return <div>{list}</div>;
                  })()}
                </div>
              </Box>
              {(() => {
                if (d === facedata.date) {
                  return (
                    <div className="wrap">
                      <div className="face-graph">
                        <div className="image-area">
                          <img src={url} alt="" />
                          <p className="description">今日の画像</p>
                        </div>

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
                      </div>
                    </div>
                  );
                } else if (d === "trend") {
                  return (
                    <div>
                      {(() => {
                        if (graphNum === 1) {
                          return (
                            <div>
                              <p>十分なデータがありません。</p>
                            </div>
                          );
                        } else {
                          return (
                            <div>
                              <VictoryChart
                                height={300}
                                width={600}
                                domainPadding={0}
                              >
                                <VictoryGroup
                                  data={[
                                    {
                                      x: week[2],
                                      y: happy[5],
                                    },
                                    {
                                      x: week[3],
                                      y: happy[4],
                                    },
                                    {
                                      x: week[4],
                                      y: happy[3],
                                    },
                                    {
                                      x: week[5],
                                      y: happy[2],
                                    },
                                    {
                                      x: week[6],
                                      y: happy[1],
                                    },
                                  ]}
                                >
                                  <VictoryLine />
                                  <VictoryScatter />
                                </VictoryGroup>
                              </VictoryChart>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <p>まだ画像が提出されていません。</p>
                    </div>
                  );
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
