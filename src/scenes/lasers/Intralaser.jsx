import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Intrelaser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const slotColumnCommonFields = {
        minWidth: 140,
    };

    const columns = [
        { 
          field: "date",
          editable: true,
          headerName: "Cliente",
          ...slotColumnCommonFields
        },
        {
          field: "days",
          editable: true,
          headerName: "Data",
          flex: 1,
          minWidth: 150,
          cellClassName: "name-column--cell",
        },
        {
          field: "unresolvedDefect",
          editable: true,
          headerName: "Defeito não resolvido",
          type: "number",
          headerAlign: "left",
          align: "left",
          cellClassName: "name-column--cell",
          minWidth: 220,
        },
        {
          field: "oph",
          editable: true,
          headerName: "OP/H",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "surgery",
          editable: true,
          headerName: "Cirurg",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "arf",
          editable: true,
          minWidth: 150,
          headerName: "Arf",
          flex: 1,
        },
        {
          field: "arfChange",
          editable: true,
          minWidth: 150,
          headerName: "Troca Arf",
          flex: 1,
        },
        {
          field: "changeNr",
          editable: true,
          minWidth: 150,
          headerName: "Nr Troca",
          flex: 1,
        },
        {
            field: "v1",
            editable: true,
            minWidth: 130,
            headerName: "V1",
            flex: 1,
        },
        {
          field: "v2",
          editable: true,
          minWidth: 130,
          headerName: "V2",
          flex: 1,
        },
        {
          field: "energy",
          editable: true,
          minWidth: 130,
          headerName: "Energia",
          flex: 1,
        },
        {
          minWidth: 130,
          field: "e1g",
          editable: true,
          headerName: "E 1G",
          flex: 1,
        },
        {
          minWidth: 150,
          field: "e100",
          editable: true,
          headerName: "E 100",
          flex: 1,
        },
        {
          minWidth: 150,
          field: "e1",
          editable: true,
          headerName: "E1",
          flex: 1,
        },
        {
          minWidth: 150,
          field: "hom",
          editable: true,
          headerName: "Hom",
          flex: 1,
        },
        {
          field: "mirrow45p1",
          editable: true,
          headerName: "45(1)",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "mirrow45p2",
          editable: true,
          headerName: "45(2)",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "foco1",
          editable: true,
          headerName: "Foco 1",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "foco2",
          editable: true,
          headerName: "Foco2",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "e4",
          editable: true,
          headerName: "E4",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "Main",
          editable: true,
          headerName: "Main",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "Galvos",
          editable: true,
          headerName: "galvos",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "Head",
          editable: true,
          headerName: "head",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "oc",
          editable: true,
          headerName: "OC",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "hr",
          editable: true,
          headerName: "HR",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "tecnic",
          editable: true,
          headerName: "Tecnico",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "serviceExecuted",
          editable: true,
          headerName: "Serviço Executado",
          minWidth: 150,
          flex: 1,
        },
        {
          field: "observation",
          editable: true,
          headerName: "Observação",
          minWidth: 150,
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
            fontSize: "16px",
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

export default Intrelaser;

