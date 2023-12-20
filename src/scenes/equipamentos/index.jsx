import { Box, Button, Typography } from "@mui/material";
import { tokens } from "../../theme";
import AddCustomerModal from './modal/CreateNewEquipment';
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useReadEquipmentsQuery } from "../dashboard/dashboardSlice";

const Equipments = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useReadEquipmentsQuery()

  const equipmentsList = useSelector(state => state.dashboard.Lasers);
  console.log(equipmentsList);

  const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',    
    color: colors.greenAccent[300],

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      display: 'block',
      marginRight: 20,
    },
  });

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

  return (
    <Box m="20px">
      <Box sx={{ display: 'flex',  justifyContent: 'space-between'}}>
        <Header
          title="Equipamentos"
          subtitle="Lista de equipamentos cadastrados"
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
        CRIAR NOVO EQUIPAMENTO
      </Button>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: '20px' }}>
        {equipmentsList.length !== 0 && equipmentsList.map((equipment, index) => (
          <Box
            key={equipment.id}
            sx={{
              padding: 2,
              borderBottom: '1px solid #ddd',
              margin: '10px',
              backgroundColor: '#f5f5f5',
              borderRadius: '5px',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: colors.primary[900] }}>
              {equipment.laser_name}             
            </Typography>
          </Box>
        ))}
      </Box>
      <AddCustomerModal open={isModalOpen} onClose={handleCloseModal} onSave={handleSaveCustomer} />
    </Box>
  );
};

export default Equipments;
