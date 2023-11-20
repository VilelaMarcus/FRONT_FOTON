import { Box, Button, useTheme } from "@mui/material";
import AddCustomerModal from './AddCustomerModal';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddEquipmentToClient from "./AddEquipmentToClient";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import Select from 'react-select'
import { useGetLasersByCostumerIdQuery, useReadAllOwnersQuery } from "./ownerSlicer";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import { ClipLoader } from "react-spinners";

const override = {
  display: "block",
  position: 'relative',
  top: '30%',
  left: '2',
  margin: "0 auto",
};

const CustomerDetail = ({ customer, onDelete, onEdit, onAddEquipment }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const { data, isLoading } = useGetLasersByCostumerIdQuery(customer.id);

    console.log({data});

    if (!customer) {
        return <p>Detalhes do cliente não disponíveis.</p>;
    }

    const openModal = () => {
    setIsModalOpen(true);
    };

    const closeModal = () => {
    setIsModalOpen(false);
    };

    const handleEdit = () => {
    onEdit(customer.id);
    };

    const handleDelete = (equipmentId) => {
    onDelete(equipmentId);
    };

    const handleAddEquipment = () => {
    openModal();
    };
    

    const handleSaveEquipment = (formData) => {
    // Add your logic to save equipment data
    // You can pass this function to your modal component
    console.log('Saving equipment data:', formData);
    // Close the modal after saving
    closeModal();
    };

    return (
    <>
        <ClipLoader
            loading={isLoading}
            color="white"
            size={120}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader" 
        />
        {data && (
            <Paper sx={{ padding: '30px', backgroundColor: '#A9A9A9', borderRadius: '15px', flexGrow: 1, position: 'relative' }}>
            <IconButton
                sx={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    color: 'black',
                    fontSize: '24px', // Increase icon size
                }}
                onClick={handleEdit}
            >
                <EditIcon fontSize="inherit" />
            </IconButton>
            <p style={{ fontSize: '18px' }}>Dr. {customer.owner}</p>
            <p style={{ fontSize: '18px' }}>Email: {customer.email}</p>
            {/* <p style={{ fontSize: '18px' }}>Address: {customer.address}, {customer.city}, {customer.zip_code}</p>
            <img src={customer.logoUrl} alt={`${customer.customer_name} Logo`} style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} /> */}
            <Box mt="20px">
                <h3 style={{ fontSize: '20px' }}>Equipamentos:</h3>
                <ul>
                    {data && data.map((equipment) => (
                        <Paper key={equipment.id} sx={{ padding: '15px', margin: '10px 0', backgroundColor: '#EFEFEF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <p style={{ fontSize: '18px', margin: 0, color: colors.greenAccent[400] }}>{equipment.laser_name}</p>
                                <p style={{ fontSize: '16px', margin: 0, color: '#777' }}>{equipment.customer_name}</p>
                            </div>
                            <div>
                                <IconButton color="error" onClick={() => handleDelete(equipment.id)}>
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </div>
                        </Paper>
                    ))}
                </ul>
            </Box>
            <Box mt="20px">
                <Button variant="outlined" onClick={handleAddEquipment} style={{ fontSize: '18px' }}>
                    Adicionar Novo Equipamento
                </Button>
            </Box>
            </Paper>
        )}
        <AddEquipmentToClient open={isModalOpen} onClose={closeModal} customer_id={customer.id}/>
    </>
    );
};


export default CustomerDetail;