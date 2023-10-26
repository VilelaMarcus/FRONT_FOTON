// AddCustomerModal.js

import React, { useState }from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';

const AddCustomerModal = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    laserModel: '',
    name: '',
    email: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCLose = () => {
    setFormData({
        laserModel: '',
        name: '',
        email: '',
        address: '',
      });
    onClose();
  }

  const handleSave = () => {
    // Perform save logic and pass data to parent component
    onSave(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
      <TextField
          label="Laser"
          name="laserModel"
          value={formData.laserModel}
          onChange={handleInputChange}
          fullWidth
          sx={{
            '& .MuiInputLabel-root': {
              color: 'white', // Label color
            },
          }}
          margin="normal"
        />
        <TextField
          label="Médico"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          sx={{
            '& .MuiInputLabel-root': {
              color: 'white', // Label color
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
          sx={{
            '& .MuiInputLabel-root': {
              color: 'white', // Label color
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
          sx={{
            '& .MuiInputLabel-root': {
              color: 'white', // Label color
            },
          }}
          margin="normal"
        />
        <Button onClick={handleSave} variant="outlined" color="secondary" sx={{ mt: 2, }}>
          Save
        </Button>
        <Button onClick={handleCLose} variant="outlined" color="error" sx={{ mt: 2, ml: '200px' }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default AddCustomerModal;