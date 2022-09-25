import React, { useState } from "react";
import { Button, MuiThemeProvider } from "@material-ui/core";
import { data } from "./tableData2";
import Manage3 from "../Manage3";

const InfoButton = ({ rowId }) => {
  const [count, setCount] = useState();

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => {
          setCount(rowId);
          console.log(data[count - 1].expression);
        }}
      >
        詳細
      </Button>
    </div>
  );
};

export default InfoButton;
