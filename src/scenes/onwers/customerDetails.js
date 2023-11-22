import { Box, Button, useTheme } from "@mui/material";
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddEquipmentToClient from "./ModalOwners/AddEquipmentToClient";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { useDeleteEquipmentMutation, useGetLasersByCostumerIdQuery, actions } from "./ownerSlicer";
import { useDispatch, useSelector } from "react-redux"
import { ClipLoader } from "react-spinners";
import ResponseMessage from "../../utils/responseMessage";

const override = {
  display: "block",
  position: 'relative',
  top: '30%',
  left: '2',
  margin: "0 auto",
};

const CustomerDetail = ({ customer, onEdit }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isModalOpen, setIsModalOpen] = useState(false);    
    const [submissionDone, setSubmissionDone] = useState(false);
    const { data, isLoading } = useGetLasersByCostumerIdQuery(customer.id);
    const [onDelete] = useDeleteEquipmentMutation();    
    const dispatch = useDispatch();
    
    const equipments = useSelector(state => state.owners.currentEquipments);
    const flattenedEquipments = equipments.flat().filter(e => e.customer_id === customer.id);

    useEffect(() => {
        let doneMessageTimeout;
        
        if (submissionDone) {
            // Set a timeout to clear the submissionDone after 5 seconds
            doneMessageTimeout = setTimeout(() => {
            setSubmissionDone(false);
            }, 2000);
        }

        return () => {
            clearTimeout(doneMessageTimeout);
        };
    }, [submissionDone]);


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

    const handleDelete = async (equipmentId) => {
        console.log(equipmentId)
        const payload = {
            id: equipmentId
        }
        const response = await onDelete(equipmentId);
        setSubmissionDone(true)
        dispatch(actions.deleteEquipment(payload));

        if(response){
            setSubmissionDone(true)
        } 
    };

    const handleAddEquipment = () => {
        openModal();
    };


    return (
    <>
        {submissionDone && (
            <ResponseMessage text={'Equipamento removido com sucesso'}/>
        )}
        <ClipLoader
            loading={isLoading}
            color="white"
            size={120}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader" 
        />
        {data && (
            <Paper sx={{ padding: '30px', backgroundColor: '#A9A9A9', borderRadius: '15px', flexGrow: 1, position: 'relative', }}>
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
                    {data && flattenedEquipments.map((equipment) => (
                        <Paper key={equipment.id} sx={{ padding: '15px', margin: '10px 0', backgroundColor: '#EFEFEF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <p style={{ fontSize: '16px', margin: 0, color: colors.greenAccent[600] }}>{equipment.customer_name}</p>
                                <p style={{ fontSize: '18px', margin: 0, color: '#777' }}>{equipment.laser_name}</p>
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