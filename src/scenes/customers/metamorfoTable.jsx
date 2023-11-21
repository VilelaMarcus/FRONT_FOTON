import { Box } from "@mui/system";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";

import calculateDaysPassedFromDate from '../../utils/dateUltils';

import { tokens } from "../../theme";
import {  useReadCustomerVisitMeasurementByCustomerIdQuery } from "./customerSlicer";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { columnsAllegreto, columnsConstellation, columnsVisx, columnsIntralaser, columnsLaserSigth } from '../../data/mockColums.js';
 

const override = {
  display: "block",
  position: 'relative',
  top: '30%',
  left: '2',
  margin: "0 auto",
};

const MetamorfTable = ({customer}) => {    
    console.log({customer});
    const [laserName, setLaserName] =  useState('');
    const [columns, setColumns] =  useState([]);
    const [rows, setRows] = useState([]);


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { data, isLoading } = useReadCustomerVisitMeasurementByCustomerIdQuery(customer.id);
    
    console.log({data})
    useEffect(() => {
      if (data && data.length >= 1) {
        setLaserName(data[0].laser_name);
        setRows(Object.values(data))
      }
    }, [data]);
    
    useEffect(() => {
      
      switch (laserName) {
        case 'Allegretto':
          setColumns(columnsAllegreto);
          break;
        case 'Visx':
          setColumns(columnsVisx);
          break;
        case 'LaserSight':
          setColumns(columnsLaserSigth);
          break;
        case 'Intralaser':
          setColumns(columnsIntralaser);
          break;
        case 'Constellation':
          setColumns(columnsConstellation);
            break;
        default:
    }        
}, [laserName]);


  const rowsToDisplay = rows.map((measure, index) => {
    const transformedItem = {};

    for (const key in measure) {
      transformedItem[key] = measure[key] !== undefined && measure[key] !== null && measure[key] !== '' ? measure[key] : '-';
    }    
    transformedItem["days"] = calculateDaysPassedFromDate(measure?.date);

    return transformedItem;
  })

  console.log({columns})
  console.log({rowsToDisplay})

    return(
      <Box
        m="40px 0 0 0"
        height="55vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            fontSize: "16px",
          }, 
            '& .super-app.negative': {
            backgroundColor: '#FFE66D',
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.positive': {
            backgroundColor: '#d47483',
            color: '#1a3e72',
            fontWeight: '600',
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
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        {!isLoading && 
          <DataGrid
            rows={rowsToDisplay}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        }
      </Box>
    );
}


export default MetamorfTable;
