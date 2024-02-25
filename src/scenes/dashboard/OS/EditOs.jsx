import React, { useState } from 'react';
import { tokens } from "../../../theme";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem'; 
import { TextField, Typography, Box, Paper, IconButton, Checkbox, Button, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReadOsByLaserIdQuery, useAddNewOsMutation, useDeleteOsMutation, useEditOsMutation, actions } from './osSlice';
import { v4 as uuidv4 } from 'uuid'; 

const EditOS = () => {  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 

  const dispatch = useDispatch();
  const { equipmentId } = useParams();  
  const [addNewOS] = useAddNewOsMutation();
  const [onUpdateOS] = useEditOsMutation();
  const [onDeleteOS] = useDeleteOsMutation();

  const [editingOSId, setEditingOSId] = useState(null);
  const [pdfAppears, setPdfAppears] = useState(false);
  const [editedType, setEditedType] = useState('');
  const [editedDescription, setEditedDescription] = useState('');


  useReadOsByLaserIdQuery(equipmentId);
  const osList = useSelector((state) => state.os.osList);
  const Lasers = useSelector((state) => state.dashboard.Lasers);

  const LaserName = Lasers.find(e => e.id === equipmentId)
  console.log({osList});
  console.log({editingOSId});

  const handleEditClick = (osId, description, type, pdfAppears) => {
    setEditingOSId(osId);
    setEditedDescription(description);
    setEditedType(type);
    setPdfAppears(pdfAppears);
  };

  const handleDeleteClick = (osId) => {
    onDeleteOS(osId);
    dispatch(actions.removeOs(osId)) 
  };

  const addOsHandler = () => {      
    const id = uuidv4();  
      const payload = {
        id: id,
        laser_id: equipmentId,
        description: ' ',
        type: 'Text'
      }
    dispatch(actions.addOsOnList(payload)) 
    addNewOS(payload);
    setEditingOSId(id);
  }

  const handleCancelClick = () => {
    setEditedDescription('');
    setEditingOSId(null);
  };

  const handleSaveClick = () => {    
    if (editingOSId !== null) {
      onUpdateOS({ id: editingOSId, body: {
        description: editedDescription,
        type: editedType,
        pdf: pdfAppears
      }});
      dispatch(actions.updateOsListDescription({ id: editingOSId, description: editedDescription, type: editedType, pdf: pdfAppears}));
      setEditedDescription('');     
      setEditingOSId(null);
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex',  justifyContent: 'space-between'}}>
        <Typography variant="h4" gutterBottom>
          Editando OS do equipamento {LaserName?.laser_name}
        </Typography> 
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={addOsHandler}
          >
            Adicionar novo Iten na OS.
          </Button>
        </Box>
      </Box>
      {osList &&
        osList.map((os) => (
          <Paper
            key={os.id}
            elevation={3}
            style={{ padding: 16, margin: 16, background: '#748CAB' }}
          >
            {editingOSId === os.id ? (
              <Box display="flex" flexDirection="column">
                <TextField
                  label="Descrição"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  fullWidth
                  margin="dense"
                  inputProps={{ style: { fontSize: '18px', color: '#fff' } }}
                />
                <TextField
                  select
                  label="Type"
                  value={editedType || os.type} 
                  onChange={(e) => setEditedType(e.target.value)}
                  fullWidth
                  margin="dense"
                  inputProps={{ style: { fontSize: '18px', color: '#fff' } }}
                >
                  <MenuItem value="Text">Text</MenuItem>
                  <MenuItem value="ChekBox">Checkbox</MenuItem>
                </TextField>
                <Box mt={2} sx={{ display: 'flex', justifyContent:"space-between"}}> 
                <Box  sx={{ display: 'flex', alignItems: 'center'}}>
                <Checkbox
                    checked={pdfAppears} // You can set the initial checked state as needed
                    onChange={() => setPdfAppears(!pdfAppears)} // You need to handle the change event if you want to update its state
                  />
                  <Typography variant="body1" style={{ marginRight: '16px' }}>
                    Aparecer na impressão
                  </Typography>
                </Box>
                <Box>
                  <Button
                    className="edit-button"
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 8 }}
                    endIcon={<CloseIcon />}
                    onClick={handleCancelClick}
                  >
                    Cancelar
                  </Button>
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
                    onClick={() => handleEditClick(os.id, os.description, os.type, os.pdf)}
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
