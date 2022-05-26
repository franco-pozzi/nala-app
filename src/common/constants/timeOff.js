export const HEADERS = {
  name: "name",
  manager: "manager",
  period: "period",
  type: "type",
  motive: "motive",
  state: "state",
  documents: "documents",
  actions: "actions",
};

export const STATES = {
  pending: "pending",
  approved: "approved",
  approved_by_leader: "approved_by_leader",
  rejected: "rejected",
};

export const STATE_CHANGE = {
  approve: "approve",
  leader_approve: "leader_approve",
  reject: "reject",
  delete: "delete",
};

// note: we need to add here all diferent types till backend resolve an endpoint
export const TYPES = {
  vacations: "vacations",
  permission: "permission",
  medical_license: "medical_license",
  ticket_days: "ticket_days",
  mourning_leave: "mourning_leave",
  mariage_leave: "mariage_leave",
  maternity_leave: "maternity_leave",
  paternity_leave: "paternity_leave",
};
