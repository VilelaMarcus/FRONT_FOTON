import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Lasers, mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { useReadCustomerByLaserIdQuery, useReadCustomerVisitMeasurementByCustomerIdQuery } from "./customerSlicer";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

const Custumer = (props) => {

  const location = useLocation();
  const { customerName } = location.state || '';

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [customer, setCustomer] = useState(customerName);
  const [options, setOptions] = useState({});
  const [rows, setRows] = useState([]);
  useReadCustomerByLaserIdQuery('');

  const customersList = useSelector(state => state.customers.list);
 
  console.log({ customersList })
  
  useEffect(() => {
    const opts = customersList.map((e) => {
      const obj ={ 
        value : e.custumer_name,
        label: e.custumer_name,
       }
      return obj
      
    })
    setOptions(opts)
  },
  [customersList])

  useEffect(() => {
    // Your other code here (before the conditional block)
    
    if (customersList && customer) {
      const customerData = customersList.find(obj => obj.custumer_name === customer);
  
      if (customerData) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useReadCustomerVisitMeasurementByCustomerIdQuery(customerData.id);
        console.log({ customerData });
      } else {
        console.log("Customer not found.");
      }
    }
  }, [customersList, customer]);

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

  const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
    color: colors.greenAccent[300],

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: '' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: 'black',

        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('') }),
    singleValue: (styles, ) => ({ ...styles, ...dot('') }),
  };


  const handleSelect = (e) => {
    const { value } = e;
    value && setCustomer(value);
  }

  return (
    <Box m="20px">
      <Box sx={{ display: 'flex',  justifyContent: 'space-between'}}>
        <Header
          title="Custumer"
          subtitle="Details"
        />
        <Box>
            <Select 
              defaultValue={{label:customerName, value: customerName}}
              options={options} 
              styles={colourStyles}
              onChange={handleSelect}
            />          
        </Box>
      </Box>
      <Box sx={{ display: 'flex',  justifyContent: 'space-between'}}>
        {/* <PanelClient /> */}
        <Box height="15vh" sx={{}}>
          <h2>{customer}</h2>
          <p>Dr. Joao</p>
          <p>Exibindo as ultimas "numero" visitas</p>
        </Box>
      </Box>
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
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Custumer;
