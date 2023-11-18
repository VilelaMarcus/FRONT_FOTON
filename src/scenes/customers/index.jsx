import { Box, Button  } from "@mui/material";
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
  useReadCustomerByLaserIdQuery();

  const customersList = useSelector(state => state.customers.list);
   
  useEffect(() => {
    const opts = customersList.map((e) => {
      const obj ={ 
        value : e.customer_name,
        label: e.customer_name,
       }
      return obj
      
    })
    setOptions(opts)
    const obj = customersList.find(obj => obj.customer_name === customer);
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
      display: 'block',
      marginRight: 20,
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
          title="Visitas / Cidades"
          subtitle="Detalhes"
        />
        <Box>
            <Select 
              options={options}
              noOptionsMessage={() => "...carregando"}
              placeholder="Selecione a cidade"
              styles={colourStyles}
              onChange={handleSelect}
            />          
        </Box>
      </Box>
      <Box sx={{ display: 'flex',  justifyContent: 'space-between'}}>
        {/* <PanelClient /> */}
        {customerData && <Box height="10vh" sx={{}}>
          <h2>{customer}</h2>
          <p>Visitas já realizadas</p>
        </Box>}
      </Box>
      { customerData && <MetamorfTable key={customerData.id} customer={customerData}/> }
    </Box>
  );
};

export default Custumer;
