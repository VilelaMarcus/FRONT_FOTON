import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import calculateDaysPassedFromDate from '../../utils/dateUltils';
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { columnsAllegreto } from "../../data/mockColums";
import { useReadVisitCustumerByLaserNameQuery, useUpdateVisitMeasurementMutation, actions } from './custumerVisitMeasurementSlicer'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuContext from "./MenuContext";


const initialContextMenu = {
  show: false,
  customerName: '',
  y:0,
}

const Allegretto = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [updateVisitMeasurement] = useUpdateVisitMeasurementMutation();
  const [rows, setRows] = useState([]);
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  
  let payload= {};
  useReadVisitCustumerByLaserNameQuery('Allegretto');
  
  
  const dispatch = useDispatch();
  const visitCustumerList = useSelector(state => state.visitCustomerMeasurement.allegretto);


  useEffect(() => {
    setRows(Object.values(visitCustumerList))
  },
  [visitCustumerList])

  const rowsToDisplay = rows.map((measure, index) => {
    const transformedItem = {};

    for (const key in measure) {
      transformedItem[key] = measure[key] !== undefined && measure[key] !== null && measure[key] !== '' ? measure[key] : '-';
    }    
    transformedItem["days"] = calculateDaysPassedFromDate(measure?.date);

    return transformedItem;
  })

  const clientsNames = rows.map(e => e.custumer_name)

  const handleCellChange = (params, e) => {
    payload = {
      name: 'Allegretto',
      id: params.id,
    };
    payload[params.field] = params.value;
    updateVisitMeasurement(payload);
    dispatch(actions.updateList(payload))
  }

  const onContextMenu = (e) => {
    e.preventDefault();
    let target = e.target.innerHTML;
    const { pageY } = e;

    setContextMenu({
      show: false,
    })
    
    if(clientsNames.includes(target)) {
      console.log(target);
      setContextMenu({
        show: true,
        customerName: target,
        y: pageY,
      })
      
    }
      
  };
  
  return (
    <Box m="20px" position={"relative"}>
      <Header
        title="Allegretto"
        subtitle="Ultimas visitas realizadas"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
        onClick={() => setContextMenu({show: false })}
        onContextMenu={onContextMenu}
      >
        <DataGrid
          rows={rowsToDisplay}
          columns={columnsAllegreto}
          onCellEditCommit={handleCellChange}
          components={{ Toolbar: GridToolbar }}
        />
        {contextMenu.show && <MenuContext y={contextMenu.y} customerName={contextMenu.customerName} />}
      </Box>
    </Box>
  );
};

export default Allegretto;
