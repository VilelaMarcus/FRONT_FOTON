import React, { useState,  } from 'react';
import { Modal, Box, Button, TextField, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid';
import { Lasers } from '../../data/mockData';

import { useDispatch, useSelector } from "react-redux"

import { actions, useAddEquipmentToCustomerMutation } from './ownerSlicer';

const AddEquipmentToClient = ({ open, onClose, customer_id}) => {
    
    const [addEquipmentToCustomer] = useAddEquipmentToCustomerMutation()

    
    const dispatch = useDispatch();
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
        laser_id: options[0].id,
        laser_name: options[0].value,
        customer_name: '',
        city: '',
        address: '',
        zip_code: '',
    });

    const [validationError, setValidationError] = useState({
        customer_name: '',
        city: '',
        address: '',
        zip_code: '',
    });   

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear validation error when user starts typing
        setValidationError({ ...validationError, [name]: '' });
    };

    const handleCLose = () => {
        setFormData({
            customer_name: '',
            city: '',
            address: '',
            zip_code: '',
        });

        setValidationError({});
        onClose();
    };

const handleSave = () => {
    console.log('aquie ?')
    const errors = {};
    let isValid = true;
    console.log('aqsrfwearwuie ?')

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
        laser_id: formData.laser_id,
        laser_name: formData.laser_name,
        customer_id: customer_id,
        customer_name: formData.customer_name,
        address: formData.address,
        city: formData.city,
        zip_code: formData.zip_code,
    }

    const success = addEquipmentToCustomer(payload);
    
    success && dispatch(actions.updateListEquipments(payload))
    onClose();
};

        const handleSelect = (e) => {
        console.log({e})
        const { value } = e;
        console.log({value})
        setFormData({ ...formData, laser_id: e.id, laser_name: e.value });
        }

return (
    <Modal open={open} onClose={onClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 450, bgcolor: `${colors.primary[400]}`, boxShadow: 24, p: 4 }}>
        <Select          
            options={options} 
            placeholder="Equipamento"
            defaultValue={options[0]}
            onChange={handleSelect}
            styles={colourStyles}
        />  
            <TextField
            label="Nome do equipamento"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleInputChange}
            fullWidth
            error={!!validationError.customer_name}
            helperText={validationError.customer_name}
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
            <TextField
            label="Cidade"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            fullWidth
            error={!!validationError.city}
            helperText={validationError.city}
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
            label="CEP"
            name="zip_code"
            value={formData.zip_code}
            onChange={handleInputChange}
            fullWidth
            error={!!validationError.zip_code}
            helperText={validationError.zip_code}
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

export default AddEquipmentToClient;
