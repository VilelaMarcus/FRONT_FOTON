import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import calculateDaysPassedFromDate from '../../utils/dateUltils';
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { columnsAllegreto } from "../../data/mockColums";
import { 
  useReadVisitCustumerByLaserNameQuery, 
  useCreateVisitMeasurementMutation,
  useUpdateVisitMeasurementMutation, 
  actions
} from './custumerVisitMeasurementSlicer'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuContext from "./MenuContext";
import { v4 as uuidv4 } from 'uuid'; // Import v4 function from the uuid library

const initialContextMenu = {
  show: false,
  customerName: '',
  y:0,
}

const Allegretto = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [updateVisitMeasurement] = useUpdateVisitMeasurementMutation();
  const [createNewRecordOfVisit] = useCreateVisitMeasurementMutation();
  const [rows, setRows] = useState([]);
  const [showDateAlert, setShowDateAlert] = useState(false);
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  
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

  useEffect(() => {
    let doneMessageTimeout;

    if (showDateAlert) {
      // Set a timeout to clear the showDateAlert after 5 seconds
      doneMessageTimeout = setTimeout(() => {
        setShowDateAlert(false);
      }, 2500);
    }

    return () => {
      clearTimeout(doneMessageTimeout);
    };
  }, [showDateAlert]);

  let payload= {};
  useReadVisitCustumerByLaserNameQuery('Allegretto');
  

  const dispatch = useDispatch();
  const visitCustumerList = useSelector(state => state.visitCustomerMeasurement.allegretto);

  console.log({visitCustumerList});

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
    let fieldChanged = params.field;
    if(fieldChanged === "date"){     

      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      const isDateFormated = dateRegex.test(params.value)
      if(isDateFormated){
        const allVisitData = visitCustumerList.find(item => item.id === params.id);
        const id = uuidv4();
        payload = {
          ...allVisitData,
          name: 'Allegretto',
          id: id,
          excludedId: params.id
        };
          payload[fieldChanged] = params.value;
          createNewRecordOfVisit(payload);
          dispatch(actions.addNewDate(payload))  
      } else{
        setShowDateAlert(true);
      }  
      
      
    } else {
      payload = {
        name: 'Allegretto',
        id: params.id,
      };

        payload[fieldChanged] = params.value;
        updateVisitMeasurement(payload);
        dispatch(actions.updateList(payload))
    }
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
      {showDateAlert && (
          <div style={styleWarning}> 
            Favor coloque a data no formato DD/MM/YYYY
          </div>
      )}
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
