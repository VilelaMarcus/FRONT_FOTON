import React, { useState,  } from 'react';
import { Modal, Box, Button, TextField, useTheme } from '@mui/material';
import { tokens } from "../../../theme";
import { useCreateCustomerMutation } from '../ownerSlicer';
import { v4 as uuidv4 } from 'uuid';


const AddCustomerModal = ({ open, onClose }) => {
  const [createNewCustomer] = useCreateCustomerMutation()

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const [validationError, setValidationError] = useState({
    name: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error when user starts typing
    setValidationError({ ...validationError, [name]: '' });
  };

  const handleCLose = () => {
    setFormData({
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
        errors[key] = 'Esse campo é necessário.';
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
      customer_name: formData.cidade,
      owner: formData.name,
      email: formData.email,
      address: formData.address,
    }

    
    
    const success = createNewCustomer(payload);
    console.log({success});
    // dispatch(actions.addCostumer(payload))

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 450, bgcolor: `${colors.primary[400]}`, boxShadow: 24, p: 4 }}>
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
