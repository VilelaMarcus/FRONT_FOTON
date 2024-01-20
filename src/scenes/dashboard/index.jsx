import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { tokens } from "../../theme";
import BuildIcon from '@mui/icons-material/Build';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FlightIcon from '@mui/icons-material/Flight';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import StatBox from "../../components/StatBox";
import { useReadDashboardInfoQuery, useReadEquipmentsQuery } from "./dashboardSlice";
import { useNavigate } from 'react-router-dom';
import EquipmentModal from './OS/osModal'; 
import { useSelector } from "react-redux";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 
  
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState('');

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSelectEquipment = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleEditOS = () => {
    setModalOpen(true);
  };


  useReadDashboardInfoQuery();
  useReadEquipmentsQuery();
  const {  currentMonthVisitCount, lastVists } = useSelector(state => state.dashboard);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Foton tecnologia" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={currentMonthVisitCount}
            subtitle="Visitas feitas"
            progress="0.75"
            icon={
              <FlightIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="2"
            subtitle="Novos Clientes"
            progress="0.30"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
            to="/editar-os"
            gridColumn="span 4"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Button
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={handleEditOS}
              fullWidth
            >
              <Box textAlign="center">
                <EditIcon sx={{ color: colors.greenAccent[600], fontSize: '36px' }} />
                <Typography variant="h6" sx={{ marginTop: '8px', color: 'white' }}>
                  Editar OS
                </Typography>
              </Box>
            </Button>
        </Box>
        {/* ROW 2 */}
        {/* <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Visitas Realizadas
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                36
              </Typography>
            </Box>
          </Box>
          <Box height="260px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box> */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Ultimas Visitas
            </Typography>
          </Box>
          {lastVists && lastVists.map((visit, i) => (
            <Box
              key={`${visit.customer_name}` + i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {visit.customer_name}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {visit.tecnic}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{visit.date}</Box>
              <Box
                backgroundColor={visit?.unresolvedDefect?.length > 0 ? colors.redAccent[500] : colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                <BuildIcon />
              </Box>
            </Box>
          ))}
        </Box>        
      </Box>
      <EquipmentModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onSelectEquipment={handleSelectEquipment}
      />
    </Box>
  );
};

export default Dashboard;
