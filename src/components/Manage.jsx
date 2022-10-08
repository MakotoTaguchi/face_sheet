import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import { data } from "./assets/tableData";
import FaceGraph from "./FaceGraph";
import {
  collection,
  getDocs
} from "firebase/firestore"

import { db } from "../firebase";
import "./css/Manage.css";

const Manage = () => {
  const [count, setCount] = useState();

  const takeDB = async () => {
    const Snapshot = await getDocs(collection(db, "users"));
    Snapshot.forEach((doc) => {
      const info = doc.data();
      console.log(info);
    });
  }

  takeDB();

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
            // console.log(data[params.id - 1].name);
            // console.log(count);
          }}
        >
          詳細
        </Button>
      ),
    },
    // { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "名前", width: 130 },
    { field: "mail", headerName: "メールアドレス", width: 250 },
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
                rows={data}
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
}
export default Manage;