import React, { useState,  } from 'react';
import { Modal, Box, Button, TextField, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import Select from 'react-select'
import { useCreateCustomerMutation } from './customerSlicer';
import { v4 as uuidv4 } from 'uuid';
import { Lasers } from '../../data/mockData';


const AddCustomerModal = ({ open, onClose }) => {
  const [createTeste] = useCreateCustomerMutation()

  const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
    color: colors.greenAccent[300],

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      display: 'block',
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


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const options = Lasers;

  const [formData, setFormData] = useState({
    laserModel: '',
    name: '',
    email: '',
    cidade: '',
    address: '',
  });

  const [validationError, setValidationError] = useState({
    laserModel: '',
    name: '',
    email: '',
    cidade: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error when user starts typing
    setValidationError({ ...validationError, [name]: '' });
  };

  const handleCLose = () => {
    setFormData({
      laserModel: '',
      cidade: '',
      name: '',
      email: '',
      address: '',
    });

    
    // Reset all validation errors
    setValidationError({});
    onClose();
  };

  const handleSave = () => {
    console.log('aqui')
    // Validation checks
    const errors = {};
    let isValid = true;

    // Check each field for empty values
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        errors[key] = 'This field is required.';
        isValid = false;
      }
    });

    // Set validation errors and return if any field is empty
    setValidationError(errors);
    if (!isValid) {
      return;
    }

    // If all validations pass, proceed with saving
    const id = uuidv4();
    const payload = {
      id: id,
      custumer_name: formData.cidade,
      owner: formData.name,
      email: formData.email,
      address: formData.address,
    }

    createTeste(payload);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 450, bgcolor: `${colors.primary[400]}`, boxShadow: 24, p: 4 }}>
       <Select          
          options={options} 
          placeholder="Laser"
          styles={colourStyles}
        />  
        <TextField
          label="Médico"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          error={!!validationError.name}
          helperText={validationError.name}
          sx={{
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'white',
            },
          }}
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          error={!!validationError.email}
          helperText={validationError.email}
          sx={{
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'white',
            },
          }}
          margin="normal"
        />
        <TextField
          label="Cidade"
          name="cidade"
          value={formData.cidade}
          onChange={handleInputChange}
          fullWidth
          error={!!validationError.cidade}
          helperText={validationError.cidade}
          sx={{
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'white',
            },
          }}
          margin="normal"
        />
        <TextField
          label="Endereço"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          fullWidth
          error={!!validationError.address}
          helperText={validationError.address}
          sx={{
            '& .MuiInputLabel-root': {
              color: 'white',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'white',
            },
          }}
          margin="normal"
        />
        <Button onClick={handleSave} variant="outlined" color="secondary" sx={{ mt: 2, height: '40px' }}>
          Save
        </Button>
        <Button onClick={handleCLose} variant="outlined" color="error" sx={{ mt: 2, ml: '255px', height: '40px' }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default AddCustomerModal;
