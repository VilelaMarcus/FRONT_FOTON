import React, { useState,  } from 'react';
import { Modal, Box, Button, TextField, useTheme } from '@mui/material';
import { tokens } from "../../../theme";
import { useCreateEquipmentMutation, actions } from "../../dashboard/dashboardSlice";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";

const AddCustomerModal = ({ open, onClose }) => {
  const [createNewEquipment] = useCreateEquipmentMutation()

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    laser_name: '',
    preco: '',
  });

  const [validationError, setValidationError] = useState({
    laser_name: '',
    preco: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear validation error when user starts typing
    setValidationError({ ...validationError, [name]: '' });
  };

  const handleCLose = () => {
    setFormData({
      laser_name: '',
      preco: '',
    });

    
    // Reset all validation errors
    setValidationError({});
    onClose();
  };

  const handleSave = () => {
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

    console.log('aqui1')

    // If all validations pass, proceed with saving
    const id = uuidv4();
    const payload = {
      id: id,
      laser_name: formData.laser_name,
      preco: formData.preco,
    }   
    
    createNewEquipment(payload);
    dispatch(actions.addEquipment(payload))

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 450, bgcolor: `${colors.primary[400]}`, boxShadow: 24, p: 4 }}>
        <TextField
          label="Equipamento"
          name="laser_name"
          value={formData.laser_name}
          onChange={handleInputChange}
          fullWidth
          error={!!validationError.laser_name}
          helperText={validationError.laser_name}
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
          label="Preço"
          name="preco"
          value={formData.brand}
          onChange={handleInputChange}
          fullWidth
          error={!!validationError.brand}
          helperText={validationError.brand}
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
