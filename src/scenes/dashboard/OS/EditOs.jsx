import React, { useEffect, useState } from 'react';
import { tokens } from "../../../theme.js";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '@mui/material/MenuItem';
import { TextField, Typography, Box, Paper, IconButton, Checkbox, Button, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useReadOsByLaserIdQuery, useAddNewOsMutation, useDeleteOsMutation, useEditOsMutation, actions, useReadOrderOsQuery, useUpdateOrderOsMutation } from './osSlice.js';
import { v4 as uuidv4 } from 'uuid';
import { Reorder } from 'framer-motion';

const DraggableItem = ({ os, handleEditClick, handleDeleteClick, saveEdit, cancelEdit, editingOSId, editedDescription, setEditedDescription, editedType, setEditedType, pdfAppears, setPdfAppears }) => {

  return (
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
            <Box mt={2} sx={{ display: 'flex', justifyContent: "space-between" }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  checked={pdfAppears}
                  onChange={() => setPdfAppears(!pdfAppears)}
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
                  onClick={cancelEdit}
                >
                  Cancelar
                </Button>
                <Button
                  className="edit-button"
                  variant="contained"
                  color="primary"
                  endIcon={<SaveIcon />}
                  onClick={() => saveEdit(os.id)}
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
  );
};

const EditOS = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const { equipmentId } = useParams();
  const [addNewOS] = useAddNewOsMutation();
  const [onUpdateOS] = useEditOsMutation();
  const [onDeleteOS] = useDeleteOsMutation();
  const [updateOrderOs] = useUpdateOrderOsMutation();

  const [editingOSId, setEditingOSId] = useState(null);
  const [pdfAppears, setPdfAppears] = useState(false);
  const [editedType, setEditedType] = useState('');
  const [osToShow, setOsToShow] = useState([]);
  const [editedDescription, setEditedDescription] = useState('');
  const [originalOrder, setOriginalOrder] = useState([]);
  const [currentOrder, setCurrentOrder] = useState([]);

  useReadOrderOsQuery(equipmentId);
  useReadOsByLaserIdQuery(equipmentId);
  const osList = useSelector((state) => state.os.osList);
  const orderOs = useSelector((state) => state.os.orderOs);
  const Lasers = useSelector((state) => state.dashboard.Lasers);

  const LaserName = Lasers.find(e => e.id === equipmentId);

  useEffect(() => {
    if (orderOs !== null && osList !== undefined && osList.length > 0) {
      const initialOrder = orderOs.sequence_itens;
      setOriginalOrder(initialOrder);      
      setCurrentOrder(initialOrder);
  
      // Create a copy of osList to avoid modifying the original array
      const osListCopy = [...osList];
  
      // Sort osListCopy based on the IDs in orderOs
      const sortedOsToShow = osListCopy.sort((a, b) => {
        const indexA = orderOs.sequence_itens.indexOf(a.id);
        const indexB = orderOs.sequence_itens.indexOf(b.id);
        return indexA - indexB;
      });
      
      setOsToShow(sortedOsToShow);
    }
  }, [orderOs, osList]);
  
  useEffect(() => {
    const orderArray = osToShow.map(os => os.id);
    setCurrentOrder(orderArray);
  }, [osToShow]);

  const handleEditClick = (osId, description, type, pdfAppears) => {
    setEditingOSId(osId);
    setEditedDescription(description);
    setEditedType(type);
    setPdfAppears(pdfAppears);
  };

  const handleDeleteClick = (osId) => {
    onDeleteOS(osId);
    dispatch(actions.removeOs(osId));
  };

  const addOsHandler = () => {
    const id = uuidv4();
    const payload = {
      id: id,
      laser_id: equipmentId,
      description: ' ',
      type: 'Text'
    };
    dispatch(actions.addOsOnList(payload));
    addNewOS(payload);
    setEditingOSId(id);
  };

  const handleCancelClick = () => {
    setEditedDescription('');
    setEditingOSId(null);
  };

  const handleSaveClick = (osId) => {
    if (osId !== null) {
      onUpdateOS({
        id: osId,
        body: {
          description: editedDescription,
          type: editedType,
          pdf: pdfAppears
        }
      });
      dispatch(actions.updateOsListDescription({
        id: osId,
        description: editedDescription,
        type: editedType,
        pdf: pdfAppears
      }));
      setEditedDescription('');
      setEditingOSId(null);
    }
  };

  const moveItem = (fromIndex, toIndex) => {
    const updatedList = Array.from(osToShow);
    const [movedItem] = updatedList.splice(fromIndex, 1);
    updatedList.splice(toIndex, 0, movedItem);
    setOsToShow(updatedList);

    const newOrder = updatedList.map(os => os.id);
    setCurrentOrder(newOrder);
  };

  const saveNewOrder = () => {
    const orderPayload = {
      id: orderOs.id,
      body: {
      sequence_itens: currentOrder
      }
    };
    dispatch(actions.setOrderOs(currentOrder));
    updateOrderOs(orderPayload);
    setOriginalOrder(currentOrder);    
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
              marginRight: "10px",
            }}
            onClick={addOsHandler}
          >
            Adicionar novo Iten na OS.
          </Button>
          {JSON.stringify(originalOrder) !== JSON.stringify(currentOrder) && (
            <Button
              sx={{
                backgroundColor: colors.greenAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
              onClick={saveNewOrder}
            >
              Salvar Nova Ordem
            </Button>
          )}
        </Box>
      </Box>
      <Reorder.Group values={osToShow} onReorder={setOsToShow}>
        {osToShow && osToShow.map((os, index) => (
          <Reorder.Item value={os} key={os.id}>
            <DraggableItem
              key={os.id}
              os={os}
              index={index}
              moveItem={moveItem}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              saveEdit={handleSaveClick}
              cancelEdit={handleCancelClick}
              editingOSId={editingOSId}
              editedDescription={editedDescription}
              setEditedDescription={setEditedDescription}
              editedType={editedType}
              setEditedType={setEditedType}
              pdfAppears={pdfAppears}
              setPdfAppears={setPdfAppears}
            />
          </Reorder.Item>
        ))}        
      </Reorder.Group>
    </>
  );
};

export default EditOS;
