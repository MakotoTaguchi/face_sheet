import * as React from "react";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@material-ui/core";
import FaceGraph from "./FaceGraph";
import { addDoc, collection, onSnapshot, where, query, getDocs } from "firebase/firestore";

import { auth, db } from "../../firebase";
import "../css/Manage.css";
import { useEffect } from "react";
import Edit from "./Edit";
import Talk from "../Talk";

const Manage = ({id ,role}) => {
  const [count, setCount] = useState();
  
  const [num, setNum] = useState();
  const [name, setName] = useState();
  const [datas, setDatas] = useState([]);
  const [object, setObject] = useState({});
  let column;
  if(role === "admin"){
    column = "members2";
  }else {
    column = "members";
  }

  useEffect(() => {
    const Snapshot = collection(db, "users");
    onSnapshot(Snapshot, (user) => {
      setDatas(user.docs.map((doc) => ({ ...doc.data() })));
    });
  }, []);

  const roomsDB = async (params, id, column) => {
    console.log(params);
    console.log(id);
    console.log(column);
    const querySnapshot = await getDocs(
      query(collection(db, "rooms"), where(column, "==", params.id)));
    const q = querySnapshot.docs.map((doc) => doc.id);
    if(q.length === 0){
      await addDoc(collection(db, "rooms"), {
        members: id,
        name: auth.currentUser.displayName,
        members2: params.row.id,
        name2: params.row.name
      });
      console.log("登録");
    }else {
      console.log("既存です");
    }
  };

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
    {
      field: "talkBtn",
      headerName: "",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setCount(params.id);
            setName(params.row.name);
            setNum(3);
            roomsDB(params, id, column);
          }}
        >
          トーク
        </Button>
      ),
    },
  ];

  return (
    <div>
      {(() => {
        if (num === 1) {
          return <Edit object={object} data={datas} count={count} />;
        } else if (num === 2) {
          return <FaceGraph count={count} />;
        } else if(num === 3) {
          return <Talk count={count} name={name} id={id}  role={role}/>;
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
