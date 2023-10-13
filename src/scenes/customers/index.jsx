import { Box } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { useReadCustomerByLaserIdQuery } from "./customerSlicer";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import MetamorfTable from "./metamorfoTable";

const Custumer = (props) => {

  const location = useLocation();
  const { customerName } = location.state || '';

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [customer, setCustomer] = useState(customerName);
  const [options, setOptions] = useState({});
  const [customerData, setCustomerData] = useState([]);
  useReadCustomerByLaserIdQuery('');

  const customersList = useSelector(state => state.customers.list);
   
  useEffect(() => {
    const opts = customersList.map((e) => {
      const obj ={ 
        value : e.custumer_name,
        label: e.custumer_name,
       }
      return obj
      
    })
    setOptions(opts)
    const obj = customersList.find(obj => obj.custumer_name === customer);
    setCustomerData(obj)
  },
  [customersList, customer])


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

  console.log(customerData);

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
      { customerData && <MetamorfTable key={customerData.id} customer={customerData}/> }
    </Box>
  );
};

export default Custumer;
