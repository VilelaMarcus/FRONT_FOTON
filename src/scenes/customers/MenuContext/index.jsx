import { Box } from "@mui/system";
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useDeleteVisitMeasurementMutation } from "../../lasers/custumerVisitMeasurementSlicer";


const MenuContext = ({y, idCustomerVisit}) => {
    console.log({idCustomerVisit});
    const [deleteVisitMeasurement] = useDeleteVisitMeasurementMutation();
    const handleClick = () => {
        deleteVisitMeasurement(idCustomerVisit);
    }
    
    return(
        <Box sx={{ 
                boxSizing: 'border-box',
                height: '40px',
                width: '100px',
                display: 'flex',
                backgroundColor: '#F4F4F9',
                color: "black",
                position: 'absolute', 
                top: `${y - 70}px`, 
                left: '120px',
                boxShadow: '0px 1px 8px 0px rgba(0,0,0,0.1)',
                gap: '10px',
                alignItems: 'center',

            }}> 
            <RemoveRedEyeOutlinedIcon />
            <Box onClick={() => handleClick()}> Deletar Linha </Box>
        </Box>
    );
}


export default MenuContext;
