import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const EquipmentModal = ({ isOpen, onRequestClose, onSelectEquipment }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedEquipment, setSelectedEquipment] = useState('');

  const handleEquipmentChange = (event) => {
    setSelectedEquipment(event.target.value);
  };

  
  const { Lasers } = useSelector(state => state.dashboard);

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
      <DialogTitle>Escolha o Equipamento</DialogTitle>
      <DialogContent>
        <Select value={selectedEquipment} onChange={handleEquipmentChange} fullWidth style={{ color: theme.palette.primary.contrastText }}>
          {/* {Lasers?.map(equipment => {         
            return (<MenuItem key={equipment.id} value={equipment.id}>{equipment.laser_name}</MenuItem>)
          })} */}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleProceed} style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}>
          Editar OS
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EquipmentModal;
