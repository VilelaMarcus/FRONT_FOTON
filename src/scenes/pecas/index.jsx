import { Box, Button, Typography, IconButton, TextField } from "@mui/material";
import { tokens } from "../../theme";
import { Edit, Delete, Save, Close } from "@mui/icons-material";
import AddCustomerModal from './modal/CreateNewPeca';
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEditPecaMutation, useReadPecasQuery, actions } from "./pecasSlice";

const Pecas = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedPrice, setEditedPrice] = useState(0);

  const [onUpdatePecas] = useEditPecaMutation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useReadPecasQuery();

  const equipmentsList = useSelector(state => state.pecas.Pecas);

  
  const dispatch = useDispatch();


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveCustomer = (formData) => {
    // Implement your logic to save the customer data
    console.log('Saving customer:', formData);
    // You can dispatch an action to save the data to your Redux store, for example.
  };

  const handleEdit = (id, name, price) => {
    setEditMode(id);
    setEditedName(name);
    setEditedPrice(price);
  };

  const handleDelete = (id) => {
    // Implement logic to delete the equipment with the given id
    console.log('Deleting equipment with id:', id);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    setEditedName('');
    setEditedPrice(0);
  };

  const handleSaveEdit = () => {
    if (editMode !== null) {
      onUpdatePecas({ id: editMode, body: {
        name: editedName,
        preco: editedPrice,
      }});
      dispatch(actions.updatePeca({ id: editMode, name: editedName, preco: editedPrice }));
      setEditMode(null);
      setEditedName('');
      setEditedPrice(0);
    }
  };

  return (
    <Box m="20px">
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Header
          title="Peças"
          subtitle="Lista de pecas cadastrados"
        />
      </Box>
      <Button
        onClick={handleOpenModal}
        sx={{
          backgroundColor: '#F4F4F9',
          color: 'black',
          '&:hover': {
            color: 'white',
            border: '1px solid white',
          },
        }}
      >
        CADASTRAR PEÇA
      </Button>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '20px' }}>
        {equipmentsList.length !== 0 && equipmentsList.map((equipment, index) => (
          <Box
            key={equipment.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              width: '40%',
            }}
          >
            {editMode === equipment.id ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <TextField
                  label="Nome"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <TextField
                  label="Preço"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                />
                <IconButton onClick={handleSaveEdit}>
                  <Save />
                </IconButton>
                <IconButton onClick={handleCancelEdit}>
                  <Close />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                  {equipment.name}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
                  R$ {equipment.preco}
                </Typography>
                <Box>
                  <IconButton onClick={() => handleEdit(equipment.id, equipment.name, equipment.preco)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(equipment.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            )}
          </Box>
        ))}
      </Box>
      <AddCustomerModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveCustomer} />
    </Box>
  );
};

export default Pecas;
