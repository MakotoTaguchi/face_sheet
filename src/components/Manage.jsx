import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import FaceGraph from "./FaceGraph";
import { collection, onSnapshot } from "firebase/firestore";

import { db } from "../firebase";
import "./css/Manage.css";
import { useEffect } from "react";
import Edit from "./Edit";

const Manage = () => {
  const [count, setCount] = useState();
  const [num, setNum] = useState();
  const [datas, setDatas] = useState([]);
  const [object, setObject] = useState({});

  useEffect(() => {
    const Snapshot = collection(db, "users");
    onSnapshot(Snapshot, (user) => {
      setDatas(user.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  const columns = [
    {
      field: "EditBtn",
      headerName: "編集",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setCount(params.id);
            setNum(1);
            for (let i = 0; i < datas.length; i++) {
              if (datas[i].id === params.id) {
                setObject(datas[i]);
                break;
              }
            }
          }}
        >
          編集
        </Button>
      ),
    },
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
            setNum(2);
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
        if (num === 1) {
          return <Edit object={object} data={datas} count={count} />;
        } else if (num === 2) {
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
