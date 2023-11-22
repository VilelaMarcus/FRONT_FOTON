import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EquipmentModal = ({ isOpen, onRequestClose, onSelectEquipment }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedEquipment, setSelectedEquipment] = useState('');

  const handleEquipmentChange = (event) => {
    setSelectedEquipment(event.target.value);
  };

  const handleProceed = () => {
    if (selectedEquipment) {
      onSelectEquipment(selectedEquipment);
      setSelectedEquipment('');
      onRequestClose();
      // Navigate to the edit OS screen
      navigate(`/edit-os/${selectedEquipment}`);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onRequestClose} fullWidth maxWidth="xs" PaperProps={{ style: { backgroundColor: theme.palette.primary.main } }}>
      <DialogTitle>Choose Equipment</DialogTitle>
      <DialogContent>
        <Select value={selectedEquipment} onChange={handleEquipmentChange} fullWidth style={{ color: theme.palette.primary.contrastText }}>
          <MenuItem value="equipment1">Equipment 1</MenuItem>
          <MenuItem value="equipment2">Equipment 2</MenuItem>
          {/* Add more options as needed */}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleProceed} style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}>
          Proceed to Edit OS
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EquipmentModal;
