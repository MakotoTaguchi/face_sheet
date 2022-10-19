import React, { useState } from "react";
import { VictoryChart, VictoryGroup, VictoryBar } from "victory";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import Manage from "./Manage";
import { auth, db } from "../firebase";

const FaceGraph = async (props) => {
  const date1 = new Date();
  const m = date1.getMonth()+1
  const d = date1.getFullYear() + "年" + m + "月" + date1.getDate() + "日";
  // const [num, setNum] = useState();
  // const Back = () => {
  //   setNum(1);
  // };

  const querySnapshot = await getDocs(
    query(collection(db, "expressions"), where("uid", "==", auth.currentUser.uid), where("date", "==", d)));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
  });
    // const getRef = getDoc(doc(db, "expressions", docId));

  return (
    <div>
      あ
      {/* {(() => {
        if (num === 1) {
          return <Manage />;} */
        // } else {
        //   return (
        //     <div className="wrap">
        //       <ArrowBackRoundedIcon
        //         sx={{ fontSize: 60 }}
        //         className="back"
        //         onClick={Back}
        //       />
        //       <div className="face-graph">
        //         <div className="image-area">
        //           <img src={data[props.props - 1].image} />
        //           <p className="description">今日の画像</p>
        //         </div>
        //         <div className="graph-area">
        //           <VictoryChart height={500} width={550} domainPadding={20}>
        //             <VictoryGroup colorScale={"qualitative"}>
        //               <VictoryBar
        //                 data={[
        //                   {
        //                     x: "angry",
        //                     y: data[props.props - 1].expression.angry,
        //                   },
        //                 ]}
        //               />
        //               <VictoryBar
        //                 data={[
        //                   {
        //                     x: "disguest",
        //                     y: data[props.props - 1].expression.disgusted,
        //                   },
        //                 ]}
        //               />
        //               <VictoryBar
        //                 data={[
        //                   {
        //                     x: "fearful",
        //                     y: data[props.props - 1].expression.fearful,
        //                   },
        //                 ]}
        //               />
        //               <VictoryBar
        //                 data={[
        //                   {
        //                     x: "happy",
        //                     y: data[props.props - 1].expression.happy,
        //                   },
        //                 ]}
        //               />
        //               <VictoryBar
        //                 data={[
        //                   {
        //                     x: "neutral",
        //                     y: data[props.props - 1].expression.neutral,
        //                   },
        //                 ]}
        //               />
        //               <VictoryBar
        //                 data={[
        //                   { x: "sad", y: data[props.props - 1].expression.sad },
        //                 ]}
        //               />
        //               <VictoryBar
        //                 data={[
        //                   {
        //                     x: "surprised",
        //                     y: data[props.props - 1].expression.surprised,
        //                   },
        //                 ]}
        //               />
        //             </VictoryGroup>
        //           </VictoryChart>
        //           <p className="graph-description">表情分析グラフ</p>
        //         </div>
        //       </div>
        //     </div>
        //   );
        // }
      })()}
    </div>
  );
}

export default FaceGraph;
