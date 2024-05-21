import React, { useEffect, useState,  } from 'react';
import { Modal, Box, Button, TextField, useTheme, Select } from '@mui/material';
import { tokens } from "../../../theme";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { useCreatePecasMutation, actions } from '../pecasSlice';

const AddCustomerModal = ({ open, onClose }) => {
  const [createNewEquipment] = useCreatePecasMutation()

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const Lasers = useSelector((state) => state.dashboard.Lasers);
  const dispatch = useDispatch();

  // const [options, setOptions] = useState({});

  // useEffect(() => {
  //   const opts = Lasers.map((e) => {
  //     const obj ={ 
  //       value : e.name,
  //       label: e.name,
  //       id: e.id,
  //      }
  //     return obj
      
  //   })
  //   setOptions(opts)
  // },
  // [Lasers])

  const [formData, setFormData] = useState({
    laser_name: '',
    preco: '',
    // laser_id: '',
  });

  
  const [validationError, setValidationError] = useState({
    laser_name: '',
    preco: '',
    // laser_id: '',
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
      // laser_id: '',
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

    console.log('Aqui 123, antes de criar o payload')

    // If all validations pass, proceed with saving
    const id = uuidv4();
    const payload = {
      id: id,
      name: formData.laser_name,
      preco: formData.preco,
      // laser_id: formData.laser_id,
    }   
    
    createNewEquipment(payload);
    dispatch(actions.addEquipment(payload))

    onClose();
  };

  const handleSelect = (e) => {
    const { value } = e;
    value && setFormData({ ...formData, laser_id: value.id });
  }

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
        {/* <Select
          options={options}
          label="Equipamento"
          noOptionsMessage={() => "...carregando"}
          placeholder="Laser"
          onChange={handleSelect}
        />  */}

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
