import clsx from 'clsx';

const slotColumnCommonFields = {
    minWidth: 140,
};

export const columnsAllegreto = [
    { 
        field: "custumer_name",
        editable: true,
        headerClassName: 'super-app-theme--fixed',
        cellClassName: 'super-app-theme--fixed',
        headerName: "Cliente",
        ...slotColumnCommonFields
    },
    { 
        field: "date",
        editable: true,
        headerName: "Data",
        ...slotColumnCommonFields
    },
    {
      field: "days",
      editable: true,
      headerName: "Days",
      flex: 1,
      minWidth: 100,
      background: "red",
      cellClassName: (params) => {
        if (params.value == null) {
          return '';
        }
  
        return clsx('super-app', {
          negative: params.value < 90 && params.value > 60 ,
          positive: params.value >= 90,
        });
      },
    },
    {
      field: "unresolvedDefect",
      editable: true,
      headerName: "Defeito não resolvido",
      align: "left",
      cellClassName: "name-column--cell",
      minWidth: 300,
    },
    {
      field: "oph",
      editable: true,
      headerName: "OP/H",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "surgery",
      editable: true,
      headerName: "Cirurg",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "arf",
      editable: true,
      minWidth: 150,
      headerName: "Arf",
      flex: 1,
    },
    {
      field: "arfChange",
      editable: true,
      minWidth: 150,
      headerName: "Troca Arf",
      flex: 1,
    },
    {
      field: "changeNr",
      editable: true,
      minWidth: 150,
      headerName: "Nr Troca",
      flex: 1,
    },
    {
        field: "v1",
        editable: true,
        minWidth: 130,
        headerName: "V1",
        flex: 1,
    },
    {
      field: "v2",
      editable: true,
      minWidth: 130,
      headerName: "V2",
      flex: 1,
    },
    {
      field: "energy",
      editable: true,
      minWidth: 130,
      headerName: "Energia",
      flex: 1,
    },
    {
      minWidth: 130,
      field: "e1g",
      editable: true,
      headerName: "E 1G",
      flex: 1,
    },
    {
      minWidth: 150,
      field: "e100",
      editable: true,
      headerName: "E 100",
      flex: 1,
    },
    {
      minWidth: 150,
      field: "e1",
      editable: true,
      headerName: "E1",
      flex: 1,
    },
    {
      minWidth: 150,
      field: "hom",
      editable: true,
      headerName: "Hom",
      flex: 1,
    },
    {
      field: "mirrow45p1",
      editable: true,
      headerName: "45(1)",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "mirrow45p2",
      editable: true,
      headerName: "45(2)",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "foco1",
      editable: true,
      headerName: "Foco 1",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "foco2",
      editable: true,
      headerName: "Foco2",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "e4",
      editable: true,
      headerName: "E4",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "main",
      editable: true,
      headerName: "Main",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "galvos",
      editable: true,
      headerName: "Galvos",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "head",
      editable: true,
      headerName: "Head",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "oc",
      editable: true,
      headerName: "OC",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "hr",
      editable: true,
      headerName: "HR",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "tecnic",
      editable: true,
      headerName: "Tecnico",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "servicePerformed",
      editable: true,
      headerName: "Serviço Executado",      
      minWidth: 350,
      flex: 1,
    },
    {
      field: "observation",
      editable: true,
      headerName: "Observação",
      minWidth: 150,
      flex: 1,
    },
];

export const columnsVisx = [
  { 
      field: "custumer_name",
      editable: true,
      headerClassName: 'super-app-theme--fixed',
      cellClassName: 'super-app-theme--fixed',
      headerName: "Cliente",
      ...slotColumnCommonFields
  },
  { 
      field: "date",
      editable: true,
      headerName: "Data",
      ...slotColumnCommonFields
  },
  {
    field: "days",
    editable: true,
    headerName: "Days",
    flex: 1,
    minWidth: 100,
    background: "red",
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        negative: params.value < 90 && params.value > 60 ,
        positive: params.value >= 90,
      });
    },
  },
  {
    field: "unresolvedDefect",
    editable: true,
    headerName: "Defeito não resolvido",
    align: "left",
    cellClassName: "name-column--cell",
    minWidth: 300,
  },
  {
    field: "arf",
    editable: true,
    headerName: "Arf",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "change",
    editable: true,
    headerName: "Change",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "he",
    editable: true,
    headerName: "He",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "halogen",
    editable: true,
    headerName: "Halogen",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "fill",
    editable: true,
    headerName: "Fill",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "trans",
    editable: true,
    headerName: "Trans",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "arfPorcentage",
    editable: true,
    headerName: "% ARF",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "water",
    editable: true,
    headerName: "Água",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "oc",
    editable: true,
    headerName: "OC",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "hr",
    editable: true,
    headerName: "HR",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "spliter",
    editable: true,
    headerName: "Spliter",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "m1",
    editable: true,
    headerName: "M1",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "integrator",
    editable: true,
    headerName: "Integrator",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "m2",
    editable: true,
    headerName: "M2",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "l2",
    editable: true,
    headerName: "L2",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "l3",
    editable: true,
    headerName: "L3",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "m3",
    editable: true,
    headerName: "M3",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "motor",
    editable: true,
    headerName: "Motores",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "tecnic",
    editable: true,
    headerName: "Tecnico",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "servicePerformed",
    editable: true,
    headerName: "Serviço Executado",      
    minWidth: 350,
    flex: 1,
  },
  {
    field: "observation",
    editable: true,
    headerName: "Observação",
    minWidth: 150,
    flex: 1,
  },
];

export const columnsConstellation = [
  { 
      field: "custumer_name",
      editable: true,
      headerClassName: 'super-app-theme--fixed',
      cellClassName: 'super-app-theme--fixed',
      headerName: "Cliente",
      ...slotColumnCommonFields
  },
  { 
      field: "date",
      editable: true,
      headerName: "Data",
      ...slotColumnCommonFields
  },
  {
    field: "days",
    editable: true,
    headerName: "Days",
    flex: 1,
    minWidth: 100,
    background: "red",
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        negative: params.value < 90 && params.value > 60 ,
        positive: params.value >= 90,
      });
    },
  },
  {
    field: "unresolvedDefect",
    editable: true,
    headerName: "Defeito não resolvido",
    align: "left",
    cellClassName: "name-column--cell",
    minWidth: 300,
  },
  {
    field: "useHours",
    editable: true,
    headerName: "Horas de uso",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "lampadHours",
    editable: true,
    headerName: "Horas lâmpada",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "tecnic",
    editable: true,
    headerName: "Tecnico",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "servicePerformed",
    editable: true,
    headerName: "Serviço Executado",      
    minWidth: 350,
    flex: 1,
  },
];


export const columnsIntralaser = [
  { 
      field: "custumer_name",
      editable: true,
      headerClassName: 'super-app-theme--fixed',
      cellClassName: 'super-app-theme--fixed',
      headerName: "Cliente",
      ...slotColumnCommonFields
  },
  { 
      field: "date",
      editable: true,
      headerName: "Data",
      ...slotColumnCommonFields
  },
  {
    field: "days",
    editable: true,
    headerName: "Days",
    flex: 1,
    minWidth: 100,
    background: "red",
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        negative: params.value < 90 && params.value > 60 ,
        positive: params.value >= 90,
      });
    },
  },
  {
    field: "unresolvedDefect",
    editable: true,
    headerName: "Defeito não resolvido",
    align: "left",
    cellClassName: "name-column--cell",
    minWidth: 300,
  },
  {
    field: "energy",
    editable: true,
    headerName: "Energia(mj)",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "osc",
    editable: true,
    headerName: "I Osc (A)",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "amp",
    editable: true,
    headerName: "I Amp (A)",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "powerOsc",
    editable: true,
    headerName: "Power Osc (mW)",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "powerAmp",
    editable: true,
    headerName: "Power Amp (mW)",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "pumpings",
    editable: true,
    headerName: "Pumping (ms)",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "tecnic",
    editable: true,
    headerName: "Tecnico",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "servicePerformed",
    editable: true,
    headerName: "Serviço Executado",      
    minWidth: 350,
    flex: 1,
  },
];

export const columnsLaserSigth= [
  { 
      field: "custumer_name",
      editable: true,
      headerClassName: 'super-app-theme--fixed',
      cellClassName: 'super-app-theme--fixed',
      headerName: "Cliente",
      ...slotColumnCommonFields
  },
  { 
      field: "date",
      editable: true,
      headerName: "Data",
      ...slotColumnCommonFields
  },
  {
    field: "days",
    editable: true,
    headerName: "Days",
    flex: 1,
    minWidth: 100,
    background: "red",
    cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        negative: params.value < 90 && params.value > 60 ,
        positive: params.value >= 90,
      });
    },
  },
  {
    field: "unresolvedDefect",
    editable: true,
    headerName: "Defeito não resolvido",
    align: "left",
    cellClassName: "name-column--cell",
    minWidth: 300,
  },
  {
    field: "arf",
    editable: true,
    minWidth: 150,
    headerName: "Arf",
    flex: 1,
  },
  {
    field: "arfChange",
    editable: true,
    minWidth: 150,
    headerName: "Troca Arf",
    flex: 1,
  },
  {
    field: "he",
    editable: true,
    minWidth: 150,
    headerName: "He",
    flex: 1,
  },
  {
    field: "energy",
    editable: true,
    minWidth: 130,
    headerName: "Energia",
    flex: 1,
  },
  {
    minWidth: 130,
    field: "cavity",
    editable: true,
    headerName: "Cavidade",
    flex: 1,
  },
  {
    minWidth: 150,
    field: "oc",
    editable: true,
    headerName: "OC",
    flex: 1,
  },
  {
    minWidth: 150,
    field: "hr",
    editable: true,
    headerName: "HR",
    flex: 1,
  },
  {
    minWidth: 150,
    field: "aten",
    editable: true,
    headerName: "Aten",
    flex: 1,
  },
  {
    field: "bs",
    editable: true,
    headerName: "BS",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "focus",
    editable: true,
    headerName: "Foco",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "galvos",
    editable: true,
    headerName: "Galvos",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "mirrow45",
    editable: true,
    headerName: "45",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "eletronics",
    editable: true,
    headerName: "Eletrônica",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "tecnic",
    editable: true,
    headerName: "Tecnico",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "servicePerformed",
    editable: true,
    headerName: "Serviço Executado",      
    minWidth: 350,
    flex: 1,
  },
  {
    field: "observation",
    editable: true,
    headerName: "Observação",
    minWidth: 150,
    flex: 1,
  },
]