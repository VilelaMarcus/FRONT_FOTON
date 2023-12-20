import clsx from 'clsx';

const slotColumnCommonFields = {
    maxWidth: 200,
    minWidth: 100,
};

export const columnsAllegreto = [
    { 
        field: "customer_name",
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
      minWidth: 50,
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
      ...slotColumnCommonFields,
      flex: 1,
    },
    {
      field: "surgery",
      editable: true,
      headerName: "Cirurg",
      ...slotColumnCommonFields,
      flex: 1,
    },
    {
      field: "arf",
      editable: true,
      ...slotColumnCommonFields,
      headerName: "Arf",
      flex: 1,
    },
    {
      field: "arfChange",
      editable: true,
      ...slotColumnCommonFields,
      headerName: "Troca Arf",
      flex: 1,
    },
    {
      field: "changeNr",
      editable: true,
      ...slotColumnCommonFields,
      headerName: "Nr Troca",
      flex: 1,
    },
    {
        field: "v1",
        editable: true,
        ...slotColumnCommonFields,
        headerName: "V1",
        flex: 1,
    },
    {
      field: "v2",
      editable: true,
      ...slotColumnCommonFields,
      headerName: "V2",
      flex: 1,
    },
    {
      field: "energy",
      editable: true,
      ...slotColumnCommonFields,
      headerName: "Energia",
      flex: 1,
    },
    {
      ...slotColumnCommonFields,
      field: "e1g",
      editable: true,
      headerName: "E 1G",
      flex: 1,
    },
    {
      ...slotColumnCommonFields,
      field: "e100",
      editable: true,
      headerName: "E 100",
      flex: 1,
    },
    {
      ...slotColumnCommonFields,
      field: "e1",
      editable: true,
      headerName: "E1",
      flex: 1,
    },
    {
      ...slotColumnCommonFields,
      field: "hom",
      editable: true,
      headerName: "Hom",
      flex: 1,
    },
    {
      field: "mirrow45p1",
      editable: true,
      headerName: "45(1)",
      ...slotColumnCommonFields,
      flex: 1,
    },
    {
      field: "mirrow45p2",
      editable: true,
      headerName: "45(2)",
      ...slotColumnCommonFields,
      flex: 1,
    },
    {
      field: "foco1",
      editable: true,
      headerName: "Foco 1",
      ...slotColumnCommonFields,
      flex: 1,
    },
    {
      field: "foco2",
      editable: true,
      headerName: "Foco2",
      ...slotColumnCommonFields,
      flex: 1,
    },
    {
      field: "e4",
      editable: true,
      headerName: "E4",
      ...slotColumnCommonFields,
      flex: 1,
    },
    {
      field: "main",
      editable: true,
      headerName: "Main",
      ...slotColumnCommonFields,
      flex: 1,
    },
    {
      field: "galvos",
      editable: true,
      headerName: "Galvos",
      ...slotColumnCommonFields,
      flex: 1,
    },
    {
      field: "head",
      editable: true,
      headerName: "Head",
      ...slotColumnCommonFields,
      flex: 1,
    },
    {
      field: "oc",
      editable: true,
      headerName: "OC",
      ...slotColumnCommonFields,
      flex: 1,
    },
    {
      field: "hr",
      editable: true,
      headerName: "HR",
      ...slotColumnCommonFields,
      flex: 1,
    },
    {
      field: "tecnic",
      editable: true,
      headerName: "Tecnico",
      ...slotColumnCommonFields,
      flex: 1,
    },
    {
      field: "servicePerformed",
      editable: true,
      headerName: "Serviço Executado",    
      minWidth: 300,
      flex: 1,
    },
    {
      field: "observation",
      editable: true,
      headerName: "Observação",
      minWidth: 300,
      flex: 1,
    },
];

export const columnsVisx = [
  { 
      field: "customer_name",
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
    ...slotColumnCommonFields,
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
    ...slotColumnCommonFields,
  },
  {
    field: "arf",
    editable: true,
    headerName: "Arf",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "change",
    editable: true,
    headerName: "Change",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "he",
    editable: true,
    headerName: "He",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "halogen",
    editable: true,
    headerName: "Halogen",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "fill",
    editable: true,
    headerName: "Fill",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "trans",
    editable: true,
    headerName: "Trans",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "arfPorcentage",
    editable: true,
    headerName: "% ARF",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "water",
    editable: true,
    headerName: "Água",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "oc",
    editable: true,
    headerName: "OC",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "hr",
    editable: true,
    headerName: "HR",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "spliter",
    editable: true,
    headerName: "Spliter",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "m1",
    editable: true,
    headerName: "M1",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "integrator",
    editable: true,
    headerName: "Integrator",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "m2",
    editable: true,
    headerName: "M2",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "l2",
    editable: true,
    headerName: "L2",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "l3",
    editable: true,
    headerName: "L3",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "m3",
    editable: true,
    headerName: "M3",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "motor",
    editable: true,
    headerName: "Motores",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "tecnic",
    editable: true,
    headerName: "Tecnico",
    ...slotColumnCommonFields,
    flex: 1,
  },
  {
    field: "servicePerformed",
    editable: true,
    headerName: "Serviço Executado",       
    minWidth: 300,
    flex: 1,
  },
  {
    field: "observation",
    editable: true,
    headerName: "Observação",    
    minWidth: 300,
    flex: 1,
  },
];

export const columnsConstellation = [
  { 
      field: "customer_name",
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
      field: "customer_name",
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
      field: "customer_name",
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