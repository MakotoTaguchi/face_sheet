import React, { 
  useEffect,
  useState,
} from "react";
import { VictoryChart, VictoryGroup, VictoryBar } from "victory";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import Manage from "./Manage";
import { db } from "../firebase";

const FaceGraph = async (props) => {
  const date1 = new Date();
  const m = date1.getMonth()+1
  const d = date1.getFullYear() + "年" + m + "月" + date1.getDate() + "日";
  const [num, setNum] = useState();
  const facedata = [];
  
  const querySnapshot = await getDocs(
    query(collection(db, "expressions"), where("id", "==", props.count), where("date", "==", d)));
    querySnapshot.forEach((doc) => {
      facedata.push(doc.data());
    });

    console.log(facedata[0].angry);
    
    const Back = () => {
      setNum(1);
    };
    
  return (
    <div>
      { (() => {
        if (num === 1) {
          return (
          <Manage />
          );
        }else {
          return (
            <div className="wrap">
              <ArrowBackRoundedIcon
                sx={{ fontSize: 60 }}
                className="back"
                onClick={Back}
              />
              <div className="face-graph">
                <div className="image-area">
                  {/* <img src={} /> */}
                  <p className="description">今日の画像</p>
                </div>
                <div className="graph-area">
                  <VictoryChart height={500} width={550} domainPadding={20}>
                    <VictoryGroup colorScale={"qualitative"}>
                      <VictoryBar
                        data={[
                          {
                            x: "angry",
                            y: facedata[0].angry,
                          },
                        ]}
                      />
                      <VictoryBar
                        data={[
                          {
                            x: "disguest",
                            y: facedata[0].disguest,
                          },
                        ]}
                      />
                      <VictoryBar
                        data={[
                          {
                            x: "fearful",
                            y: facedata[0].fearful,
                          },
                        ]}
                      />
                      <VictoryBar
                        data={[
                          {
                            x: "happy",
                            y: facedata[0].happy,
                          },
                        ]}
                      />
                      <VictoryBar
                        data={[
                          {
                            x: "neutral",
                            y: facedata[0].neutral,
                          },
                        ]}
                      />
                      <VictoryBar
                        data={[
                          { 
                            x: "sad", 
                            y: facedata[0].sad, 
                          },
                        ]}
                      />
                      <VictoryBar
                        data={[
                          {
                            x: "surprised",
                            y: facedata[0].suprised,
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
        }
      })()}
    </div>
  );
}

export default FaceGraph;
