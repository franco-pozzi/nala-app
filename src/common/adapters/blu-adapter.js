export const bluMapper = (arrData) => ({
  users: arrData.map((obj) => ({
    name: obj.Nombre,
    CPF: obj["Documento de Identidad"],
    CPFManager: obj["Documento de Identidad líder"],
    managerName: obj["Líder"],
    email: obj["e-mail"],
    startingDate: obj["Fecha de inicio"],
    birthDate: obj["Fecha de nacimiento"],
    companyArea: {
      country: obj["País"],
      city: obj.Ciudad,
      division: obj.Departamento,
      area: obj["Área"],
      subarea: obj["Sub-área"],
      costCenter: obj["Centro de costo"],
      position: obj.Cargo,
      herarchyLevel: "Nível Jerárquico",
    },
    taxes: {
      healthInsurance: obj["Seguro médico"],
      mealAllowance: obj["Vale comida"],
      dentalInsurance: obj["Seguro odontologico"],
      lifeInsurance: obj["Seguro de vida"],
      accrued: obj.Provisiones,
      value: obj.Impuestos,
    },
    role: {
      id: obj["Nível Jerárquico"].toUpperCase(),
      name: obj["Nível Jerárquico"],
    },
    salary: {
      grossSalary: obj["Salario Bruto"],
      salaryPayment: obj["Salario pago en nómina"],
      CTCMonth: obj["Costo nómina"],
      flatCTC: obj["Costo nómina Proyectada"],
    },
    company: {
      id: "BLU",
      name: "BLU",
    },
    leaf: obj["Mes de nómina"],
    typeOfContract: obj["Tipo de contrato"],
  })),
});
