import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TextField, Typography, Box, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReadOsByLaserIdQuery } from './osSlice';

const EditOS = ({ onUpdateOS, onDeleteOS }) => {
  const { equipmentId } = useParams();
  const [editingOSId, setEditingOSId] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  useReadOsByLaserIdQuery(equipmentId);
  const osList = useSelector((state) => state.os.osList);

  const handleEditClick = (osId, description) => {
    setEditingOSId(osId);
    setEditedDescription(description);
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
        Edit OS for Equipment {equipmentId}
      </Typography>
      {osList &&
        osList.map((os) => (
          <Paper
            key={os.id}
            elevation={3}
            style={{ padding: 16, margin: 16, background: '#748CAB' }}
          >
            {editingOSId === os.id ? (
              <Box display="flex" flexDirection="column" alignItems="flex-start">
                <TextField
                  label="Description"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  fullWidth
                  margin="dense"
                />
                <Box marginTop={1}>
                  <IconButton color="primary" onClick={handleSaveClick}>
                    <EditIcon />
                  </IconButton>
                </Box>
              </Box>
            ) : (
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography>{os.description}</Typography>
                <Box>
                  <IconButton color="primary" onClick={() => handleEditClick(os.id, os.description)}>
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
