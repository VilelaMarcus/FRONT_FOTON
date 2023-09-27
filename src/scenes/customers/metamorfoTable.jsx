import { Box } from "@mui/system";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { mockDataContacts } from "../../data/mockData";
import { useTheme } from "@mui/material";

import { tokens } from "../../theme";
import {  useReadCustomerVisitMeasurementByCustomerIdQuery } from "./customerSlicer";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

const MetamorfTable = ({customer}) => {    
    const [laserName, setLaserName] =  useState('');

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { data, isLoading } = useReadCustomerVisitMeasurementByCustomerIdQuery(customer.id);
    
    console.log({data});

    useEffect(()=>{
      
      if(data){
        setLaserName(data[0].laser_name);
      }
    },[data])

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "registrarId", headerName: "Registrar ID" },
        {
          field: "name",
          headerName: "Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "age",
          headerName: "Age",
          type: "number",
          headerAlign: "left",
          align: "left",
        },
        {
          field: "phone",
          headerName: "Phone Number",
          flex: 1,
        },
        {
          field: "email",
          headerName: "Email",
          flex: 1,
        },
        {
          field: "address",
          headerName: "Address",
          flex: 1,
        },
        {
          field: "city",
          headerName: "City",
          flex: 1,
        },
        {
          field: "zipCode",
          headerName: "Zip Code",
          flex: 1,
        },
      ];
    

    return(
        <Box
        m="40px 0 0 0"
        height="50vh"
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
         <ClipLoader
            loading={isLoading}
            color="white"
            size={120}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        {!isLoading && 
          <DataGrid
            rows={mockDataContacts}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        }
      </Box>
    );
}


export default MetamorfTable;
