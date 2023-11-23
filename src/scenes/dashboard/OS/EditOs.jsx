import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TextField, Typography, Box, Paper, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReadOsByLaserIdQuery } from './osSlice';

const EditOS = ({ onUpdateOS, onDeleteOS }) => {
  const { equipmentId } = useParams();
  const [editingOSId, setEditingOSId] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const editRef = useRef(null);
  useReadOsByLaserIdQuery(equipmentId);
  const osList = useSelector((state) => state.os.osList);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editRef.current && !editRef.current.contains(event.target)) {
        // Check if the click is on the edit button
        const isEditButton = event.target.closest('.edit-button');
        if (!isEditButton) {
          setEditingOSId(null);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleEditClick = (osId, description) => {
    setEditingOSId(osId);
    setEditedDescription(description);
  };

  const handleDeleteClick = (osId) => {
    onDeleteOS(osId);
  };


  const handleSaveClick = () => {
    if (editingOSId !== null) {
      onUpdateOS(editingOSId, editedDescription);
      setEditingOSId(null);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Editando OS DO Equipamento {equipmentId}
      </Typography>
      {osList &&
        osList.map((os) => (
          <Paper
            key={os.id}
            elevation={3}
            style={{ padding: 16, margin: 16, background: '#748CAB' }}
          >
            {editingOSId === os.id ? (
              <Box ref={editRef} display="flex" flexDirection="column" alignItems="flex-end">
                <TextField
                  label="Descrição"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  fullWidth
                  margin="dense"
                  inputProps={{ style: { fontSize: '18px', color: '#fff' } }}
                />
                <Box mt={2}>
                  <Button
                    className="edit-button"
                    variant="contained"
                    color="primary"
                    endIcon={<SaveIcon />}
                    onClick={handleSaveClick}
                  >
                    Salvar
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" style={{ color: '#fff' }}>
                  {os.description}
                </Typography>
                <Box>
                  <IconButton
                    className="edit-button"
                    color="primary"
                    onClick={() => handleEditClick(os.id, os.description)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteClick(os.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Paper>
        ))}
    </div>
  );
};

export default EditOS;
