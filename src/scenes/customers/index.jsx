import { Box, Button  } from "@mui/material";
import { tokens } from "../../theme";
import AddCustomerModal from './addCustomerModal';
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

  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (e) => {
    const { value } = e;
    value && setCustomer(value);
  }

  const handleSaveCustomer = (formData) => {
    // Implement your logic to save the customer data
    console.log('Saving customer:', formData);
    // You can dispatch an action to save the data to your Redux store, for example.
  };

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
      <Button
        onClick={handleOpenModal}
        sx={{ 
          backgroundColor: '#F4F4F9', 
          color: 'black',          
          '&:hover': {
            color: 'white',            
            border: '1px solid white', 
          },
        }}
      >      
        Adicionar novo CLiente
      </Button>
      <Box sx={{ display: 'flex',  justifyContent: 'space-between'}}>
        {/* <PanelClient /> */}
        {customerData && <Box height="10vh" sx={{}}>
          <h2>{customer}</h2>
          <p>Visitas já realizadas</p>
        </Box>}
      </Box>
      { customerData && <MetamorfTable key={customerData.id} customer={customerData}/> }
      <AddCustomerModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveCustomer} />
    </Box>
  );
};

export default Custumer;
