import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@material-ui/core/Button";
import { data } from "./childComponents/tableData2";
import "./Manage2.css";

export default function Manage2() {
  const columns = [
    {
      field: "editBtn",
      headerName: "詳細",
      sortable: false,
      width: 90,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Button variant="contained" color="primary">
          詳細
        </Button>
      ),
    },
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "名前", width: 130 },
    { field: "mail", headerName: "メールアドレス", width: 250 },
    { field: "point", headerName: "笑みポイント", width: 130 },
  ];
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
