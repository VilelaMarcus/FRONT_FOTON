import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Allegretto = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const slotColumnCommonFields = {
    minWidth: 140,
  };

  const columns = [
    { field: "date", headerName: "Cliente", ...slotColumnCommonFields },
    {
      field: "days",
      headerName: "Data",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "unresolvedDefect",
      headerName: "Defeito não resolvido",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "oph",
      headerName: "OP/H",
      flex: 1,
    },
    {
      field: "surgery",
      headerName: "Cirurg",
      flex: 1,
    },
    {
      field: "arf",
      headerName: "Arf",
      flex: 1,
    },
    {
      field: "arfChange",
      headerName: "Troca Arf",
      flex: 1,
    },
    {
      field: "changeNr",
      headerName: "Nr Troca",
      flex: 1,
    },
    {
        field: "v1",
        headerName: "V1",
        flex: 1,
    },
    {
      field: "v2",
      headerName: "V2",
      flex: 1,
    },
    {
      field: "energy",
      headerName: "Energia",
      flex: 1,
    },
    {
      field: "e1g",
      headerName: "E 1G",
      flex: 1,
    },
    {
      field: "e100",
      headerName: "E 100",
      flex: 1,
    },
    {
      field: "e1",
      headerName: "E1",
      flex: 1,
    },
    {
      field: "hom",
      headerName: "Hom",
      flex: 1,
    },
    {
      field: "mirrow45p1",
      headerName: "45(1)",
      flex: 1,
    },
    {
      field: "mirrow45p2",
      headerName: "45(2)",
      flex: 1,
    },
    {
      field: "e100",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "e100",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "e100",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "e100",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "e100",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "e100",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "e100",
      headerName: "Zip Code",
      flex: 1,
    },
    {
      field: "e100",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Allegretto;
