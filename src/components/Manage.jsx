import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import FaceGraph from "./FaceGraph";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../firebase";
import "./css/Manage.css";
import { useEffect } from "react";

const Manage = () => {
  const [count, setCount] = useState();
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const Snapshot = collection(db, "users");
    onSnapshot(Snapshot, (user) => {
      setDatas(user.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  // useEffect(() => {
  //   if (datas.length >= 1) {
  //     for (let i = 0; i < datas.length; i++) {
  //       const obj = datas[i];
  //       obj.id = i + 1;
  //       console.log(obj);
  //       setTest((prevState) => [...prevState, obj]);
  //     }
  //   }
  // }, [datas]);

  // console.log(test);

  const columns = [
    {
      field: "infoBtn",
      headerName: "詳細",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setCount(params.id);
          }}
        >
          詳細
        </Button>
      ),
    },
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "名前", width: 130 },
    { field: "email", headerName: "メールアドレス", width: 250 },
    { field: "point", headerName: "笑みポイント", width: 130 },
  ];

  return (
    <div>
      {(() => {
        if (count !== undefined) {
          return <FaceGraph props={count} />;
        } else {
          return (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={datas}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          );
        }
      })()}
    </div>
  );
};
export default Manage;
