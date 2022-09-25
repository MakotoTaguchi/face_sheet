import React from "react";
import { VictoryChart, VictoryGroup, VictoryBar } from "victory";
import { data } from "./tableData2";

function FaceGraph(props) {
  console.log(props.props);
  console.log(data[props.props - 1].expression.angry);
  return (
    <div className="wrap">
      <div className="face-graph">
        <div>
          <img src={data[props.props - 1].image} />
        </div>
        <div>
          <VictoryChart height={400} width={550} domainPadding={20}>
            <VictoryGroup colorScale={"qualitative"}>
              <VictoryBar
                data={[
                  { x: "angry", y: data[props.props - 1].expression.angry },
                ]}
              />
              <VictoryBar
                data={[
                  {
                    x: "disguest",
                    y: data[props.props - 1].expression.disgusted,
                  },
                ]}
              />
              <VictoryBar
                data={[
                  { x: "fearful", y: data[props.props - 1].expression.fearful },
                ]}
              />
              <VictoryBar
                data={[
                  { x: "happy", y: data[props.props - 1].expression.happy },
                ]}
              />
              <VictoryBar
                data={[
                  { x: "neutral", y: data[props.props - 1].expression.neutral },
                ]}
              />
              <VictoryBar
                data={[{ x: "sad", y: data[props.props - 1].expression.sad }]}
              />
              <VictoryBar
                data={[
                  {
                    x: "surprised",
                    y: data[props.props - 1].expression.surprised,
                  },
                ]}
              />
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
    </div>
  );
}

export default FaceGraph;
