import { Box } from "@mui/system";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import {
  GridToolbarContainer,
} from '@mui/x-data-grid';
import calculateDaysPassedFromDate from '../../utils/dateUltils';

import { v4 as uuidv4 } from 'uuid'; 
import { tokens } from "../../theme";
import {  useReadCustomerVisitMeasurementByCustomerIdQuery, actions } from "./customerSlicer";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { columnsAllegreto, columnsConstellation, columnsVisx, columnsIntralaser, columnsLaserSigth } from '../../data/mockColums.js';
import { useCreateVisitMeasurementMutation, useDeleteVisitMeasurementMutation, useUpdateVisitMeasurementMutation } from "../lasers/custumerVisitMeasurementSlicer.js";
import { useReadEquipmentsQuery } from "../dashboard/dashboardSlice.js";
import MenuContext from "./MenuContext/index.jsx";
import { Delete } from "@mui/icons-material";

const initialContextMenu = {
  show: false,
  idCustomerVisit: '',
  y:0,
}

const override = {
  display: "block",
  position: 'relative',
  top: '30%',
  left: '2',
  margin: "0 auto",
};


const styleWarning = {
  position: 'fixed', // Fixed the typo here
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(255, 255, 255)',
  color: 'black',
  padding: '20px',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'center',
  zIndex: 10000,
};

const MetamorfTable = ({customer}) => {
  useReadEquipmentsQuery();
  const [columns, setColumns] =  useState([]);
  const [rows, setRows] = useState([]);
  const [selectId, setId] = useState([]);
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const [createNewRecordOfVisit] = useCreateVisitMeasurementMutation();
  
  const dispatch = useDispatch(); 
  const [updateVisitMeasurement] = useUpdateVisitMeasurementMutation();
  const [deleteRecordOfVisit, { isSuccess }] = useDeleteVisitMeasurementMutation();  
  const [showAlert, setShowAlert] = useState(false);
  const [showDateAlert, setShowDateAlert] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { x, isLoading } = useReadCustomerVisitMeasurementByCustomerIdQuery(customer.id);    
  const lasers = useSelector((state) => state.dashboard.Lasers);
  
  const laserName = lasers?.find(laser => laser.id === customer.laser_id)?.laser_name;
  
  const data = useSelector(state => state.customers.customerVisit);

  let payload= {};
  useEffect(() => {
      if (data && data.length >= 1) {
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
    measure?.date ? transformedItem["days"] = calculateDaysPassedFromDate(measure?.date) : transformedItem["days"] = '-';
    
    return transformedItem;
  })
  
  const onContextMenu = (e) => {
    e.preventDefault();
    console.log(e.target);
    let target = e.target.innerHTML;
    const { pageY } = e;

    setContextMenu({
      show: false,
    })    

    setContextMenu({
      show: true,
      customerName: target,
      y: pageY,
    })  
    
  };

  function EditToolbar() {  
    const handleClick = () => {
      const fields = columns.map(item => item.field);

      const newObject = {};
      fields.forEach(field => {
        newObject[field] = null; 
      });

      newObject.id = uuidv4();
      newObject.laser_of_customer_id = customer.id;
      newObject.customer_name = customer.customer_name;

      console.log({newObject}); 
      
      setRows([...rows, newObject]);
      createNewRecordOfVisit(newObject);      
    };
  
    const handleDelete = () => {
      if(selectId.length === 1) {
        const newRows = rows.filter(row => !selectId.includes(row.id));
        setRows(newRows);
        deleteRecordOfVisit(selectId);
      } else {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000); 
      }

    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Addicionr visita
        </Button>
        <Button color="primary" startIcon={<Delete />} onClick={handleDelete}>
          Deletar visita
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleSelection = (itm) => {
    setId(itm);   
  }

  const handleCellChange = (params, e) => {
    
    console.log('passou');
    console.log(params.id);
    let fieldChanged = params.field;
    if(fieldChanged === "date"){     

      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      const isDateFormated = dateRegex.test(params.value)
      if(isDateFormated){
        payload = {
          name: laserName,
          id: params.id
        };
          payload[fieldChanged] = params.value;
          updateVisitMeasurement(payload);
          dispatch(actions.updateList(payload)) 
      } else{
        setShowDateAlert(true);
      }  
      
      
    } else {
      payload = {
        name: laserName,
        id: params.id,
      };

        payload[fieldChanged] = params.value;
        updateVisitMeasurement(payload);
        dispatch(actions.updateList(payload))
    }
  }


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
        onClick={() => setContextMenu({show: false })}
        onContextMenu={onContextMenu}
      >
        {showAlert && (
          <div style={styleWarning}> 
            Favor deletar uma visita por vez
          </div>
        )}
        {isSuccess && (
          <div style={styleWarning}> 
            Visita deletada com sucesso
          </div>
        )}
        
      {showDateAlert && (
          <div style={styleWarning}> 
            Favor coloque a data no formato DD/MM/YYYY
          </div>
      )}
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
            components={{ Toolbar: EditToolbar }}
            checkboxSelection   
            onCellEditCommit={handleCellChange}         
            onSelectionModelChange={itm => handleSelection(itm)}
            disableRowSelectionOnClick
          />
        }
        {contextMenu.show && <MenuContext y={contextMenu.y} idCustomerVisit={contextMenu.idCustomerVisit} />}
      </Box>
    );
}


export default MetamorfTable;
