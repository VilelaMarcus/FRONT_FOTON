import { Box, Button  } from "@mui/material";
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { tokens } from "../../theme";
import AddCustomerModal from './addCustomerModal';
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { useReadAllOwnersQuery } from "./ownerSlicer";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import CustomerDetail from "./customerDetails";

const Owners = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [customerSelected, setCustomer] = useState({});
  const [options, setOptions] = useState({});
  const [customerData, setCustomerData] = useState();
  useReadAllOwnersQuery();

  const customersList = useSelector(state => state.owners.list);
  console.log({customerSelected});
  console.log({customersList});
  


  const handleDelete = () => {
    // Implement your delete logic here
    console.log('Deleting customer:', customerData);
    // You can dispatch an action to delete the data from your Redux store, for example.
  };

  const handleEdit = () => {
    // Implement your edit logic here
    console.log('Editing customer:', customerData);
    // You can navigate to an edit page or show a modal for editing
  };

  const handleAddEquipment = () => {
    // Implement your add equipment logic here
    console.log('Adding equipment for customer:', customerData);
    // You can navigate to a page for adding equipment to the selected customer
  };

  useEffect(() => {
    const opts = customersList.map((e) => {
      const obj ={ 
        value : e.owner,
        label: e.owner,
       }
      return obj
      
    })
    setOptions(opts)
    const obj = customersList.find(obj => obj.owner === customerSelected);
    setCustomerData(obj)
  },
  [customersList, customerSelected])


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
          title="Cliente"
          subtitle="Detalhes"
        />
        <Box>
            <Select 
              options={options}
              noOptionsMessage={() => "Cliente nao encontrado"}
              placeholder="Selecione um cliente"
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
        ADICIONAR NOVO CLIENTE
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {customerData && (<CustomerDetail
          key={customerData.id}
          customer={customerData}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onAddEquipment={handleAddEquipment}
        />)}
      </Box>
      <AddCustomerModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveCustomer} />
    </Box>
  );
};

export default Owners;
