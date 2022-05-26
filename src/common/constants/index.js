import React, { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Edit from "@material-ui/icons/Edit";
import SaveAlt from "@material-ui/icons/SaveAlt";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import Search from "@material-ui/icons/Search";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Remove from "@material-ui/icons/Remove";
import ViewColumn from "@material-ui/icons/ViewColumn";

const getURLFirebase = () => {
  switch (process.env.NODE_ENV) {
  case "production":
    return "http://localhost:5001/nala-system/us-central1";
  case "development":
    return "http://localhost:5001/nala-system/us-central1";
  default:
    return "http://localhost:5001/nala-system/us-central1";
  }
};

const getURLRails = () => {
  switch (process.env.REACT_APP_ENV) {
  case "production":
    return "https://staging.api.nalarocks.com";
  case "development":
    return "https://staging.api.nalarocks.com";
  default:
    return "https://staging.api.nalarocks.com";
  }
};

export const YOUTUBE_URLS = {
  main: "https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=",
  format: "&format=json",
  external: "https://youtu.be/",
};

export const CURRENT_DOMAIN = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_AUTH_DOMAIN}`;
export const FUNCTIONS_API_URL_BASE = getURLFirebase();
export const API_URL_BASE_RAILS = getURLRails();
export const API_V1 = "/api/v1";
export const API_URL_RAILS_V1 = API_URL_BASE_RAILS + API_V1;
export const CRYPTO_KEY = "dstHxekC0d4e7BDlrPTOhg";
export const GA_TRACKING_ID = `${process.env.REACT_APP_GA_TRACKING_ID}`
export const headersWithEmail = (email) => ({
  "x-email": email,
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
});

export const ROLES = {
  CANDIDATE: "candidate",
  COLLABORATOR: "collaborator",
  MANAGER: "manager",
  ADMIN: "admin",
  ADMIN_NALA: "nala_admin",
  ADMIN_COLOMBIA: "colombia_admin",
  TALENT_MANAGER: "talent_manager",
  VACATION_ADMIN: "vacation_admin",
  ONBOARDING_ADMIN: "onboarding_admin",
  TRAINING_MANAGER: "training_manager",
};

export const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox { ...props } ref={ ref } />),
  Check: forwardRef((props, ref) => <Check { ...props } ref={ ref } />),
  Clear: forwardRef((props, ref) => <Clear { ...props } ref={ ref } />),
  Delete: forwardRef((props, ref) => <DeleteOutline { ...props } ref={ ref } />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight { ...props } ref={ ref } />
  )),
  Edit: forwardRef((props, ref) => <Edit { ...props } ref={ ref } />),
  Export: forwardRef((props, ref) => <SaveAlt { ...props } ref={ ref } />),
  Filter: forwardRef((props, ref) => <FilterList { ...props } ref={ ref } />),
  FirstPage: forwardRef((props, ref) => <FirstPage { ...props } ref={ ref } />),
  LastPage: forwardRef((props, ref) => <LastPage { ...props } ref={ ref } />),
  NextPage: forwardRef((props, ref) => <ChevronRight { ...props } ref={ ref } />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft { ...props } ref={ ref } />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear { ...props } ref={ ref } />),
  Search: forwardRef((props, ref) => <Search { ...props } ref={ ref } />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward { ...props } ref={ ref } />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove { ...props } ref={ ref } />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn { ...props } ref={ ref } />),
};

export const FIRST_PAGE = "first_page";
export const PREV_PAGE = "prev_page";
export const NEXT_PAGE = "next_page";
export const LAST_PAGE = "last_page";

export const ASC = "asc"; // for ascending
export const DESC = "desc"; // for descending

export const ORDER_BY_NAME = "name";
export const ORDER_BY_UNITY = "unity";

export const PERFORMANCE_MAX = 1.2;

export const RATING = {
  initial: 0,
  stars: 5,
  total_min: 100,
  total_max: 120,
  precision: 0.1,
};

export const INFO = "info";
export const SUCCESS = "success";
export const WARNING = "warning";
export const ERROR = "error";
export const CRITIC = "critic";

export const GRAPHIC_LABEL_OFFSET = 15;
export const GRAPHIC_TOP_PERCENTAGE = 100;

export const MAX_PER_PAGE = 15;
export const ROWS_PER_PAGE = [15, 30, 45];
export const TIMEOUT_TRANSITION = 350;

export const AUTO_HIDE_DURATION = 8000;
export const ALERT_ANCHOR_ORIGIN = {
  vertical: "top",
  horizontal: "right",
};

export const STATE = {
  SELECTED: "selected",
  FILL_DATA: "fill_data",
  DATA_FILLED: "data_filled",
  REQUIRE_MORE_DATA: "require_more_data",
  DATA_REQUIRED: "data_required",
  HIRE: "hire",
  HIRED: "hired",
  DESIST: "desist",
  DESISTED: "desisted",
  turnover: "Turnover",
  start: "start",
};

export const XLSX_EXTENSION = "xlsx";
export const FILE_TYPE_EXCEL = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";

export const ERROR_VALUE = 500;


export const AUTH_NETWORK_FAILED_FIREBASE = "auth/network-request-failed";
export const CLOSED_POPUP_FAILED_FIREBASE = "auth/cancelled-popup-request";
export const CLOSED_POPUP_USER_FIREBASE = "auth/popup-closed-by-user";

export const REMOVE_OPTION = "remove-option";
export const CLEAR = "clear";

export const SKELETONS_NUMBER = {
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  EIGTH: 8,
  NINE: 9,
};

export const TIMEOUT_REDIRECT = 2000;
export const TIMEOUT_DISPATCH = 1000;

export const ORG_UNITS = {
  area: "Area",
  division: "Division",
  subarea: "Subarea",
};

export const ENTITY_OPTION = {
  country: "country",
  city: "city",
};

export const OBJECT_KEYS = {
  // A
  actions: "goals_actions",
  area: "area",
  averageCommissions: "average_commissions",
  archive: "archieve",
  // B
  birthDate: "birth_date",
  birthdate: "birthdate",
  benefit: "benefit",
  // C
  category: "category",
  cityName: "city_name",
  countryName: "country_name",
  completedValue: "completed_value",
  completationPercentage: "completation_percentage",
  compliance: "compliance",
  comment: "comment",
  createdAt: "created_at",
  collaboratorsCount: "collaborators_count",
  currency: "currency",
  companyEmail: "company_email",
  country: "country",
  country_id: "country_id",
  city: "city",
  costCenter: "cost_center",
  children: "children",
  code: "code",
  collaborator: "collaborator",
  collaboratorsIds: "collaborators_ids",
  // D
  date: "date",
  description: "description",
  division: "division",
  directory: "directory",
  dayControl: "day_control",
  dentalInsurance: "dental_insurance",
  downloadImage: "download-image",
  documentType: "document-type",
  // E
  employeeFullName: "employee_full_name",
  employee: "employee",
  employeeId: "employee_id",
  evaluationType: "evaluation_type",
  evaluation: "evaluation",
  end_date: "end_date",
  errors: "errors",
  employmentRelationship: "employment_relationship.name",
  employeesCount: "active_collaborators_count",
  employeesIds: "employees_ids",
  // F
  filename: "filename",
  finishContract: "finishContract",
  fullname: "full_name",
  frequency: "frequency",
  // G
  grossSalary: "gross_salary",
  goalRuleId: "goal_rule_id",
  gender: "gender",
  // H
  healthInsurance: "health_insurance",
  human_resources: "human_resources",
  // I
  id: "id",
  infoType: "info-type",
  isActive: "is_active",
  isMain: "is_main",
  // K
  keepDoing: "keep_doing",
  // L
  lateralMovement: "LateralMovement",
  label: "label",
  level: "level",
  legalEntityCode: "legal_entity_code",
  legalEntity: "legalEntity",
  lifeInsurance: "life_insurance",
  listings: "listings",
  lossRisk: "lossRisk",
  // M
  maritalStatus: "marital_status",
  managerName: "manager_name",
  metric: "metric",
  minWorkedDays: "min_worked_days",
  month: "month",
  managerId: "manager_id",
  mealTicket: "meal_allowance",
  multicompany: "multicompany",
  // N
  name: "name",
  nameWithCode: "name_with_code",
  null: "null",
  // O
  organizationUnit: "organization_unit",
  otherBenefits: "other_benefits",
  otherGender: "other_gender",
  // P
  promotion: "Promotion",
  profileImgUrl: "profile_img_url",
  positionName: "position_name",
  payrollItemId: "payroll_item_id",
  performance: "performance",
  principalActions: "actions",
  position: "position",
  pairs: "pairs",
  positionId: "position_id",
  personalEmail: "personal_email",
  // R
  rolesName: "roles_name",
  recommendation: "recomendation",
  revisionDate: "revision_date",
  result: "result",
  reasonOfTermination: "reason_of_termination",
  reminderDays: "reminder_days",
  // S
  salaryRaise: "SalaryRaise",
  score: "score",
  scope: "scope",
  state: "state",
  start_date: "start_date",
  startingDate: "starting_date",
  subarea: "subarea",
  salary: "salary",
  surveyProcess: "survey_process",
  stopDoing: "stop_doing",
  // T
  typeOfContractId: "type_of_contract_id",
  total: "total",
  totalGoals: "total_goals",
  title: "title",
  type: "type",
  terminationDate: "termination_date",
  typeOfContract: "type_of_contract",
  // U
  undefined: "undefined",
  userIdCompany: "user_id_company",
  userId: "user_id",
  unit: "unit",
  unarchive: "unarchieve",
  url: "url",
  // V
  value: "value",
  // W
  weight: "weight",
  zoomIn: "zoom-in",
  zoomOut: "zoom-out",
};

export const BUTTON_STYLE_TYPES = {
  SUBMIT: "submit",
  CANCEL: "cancel",
  BACK: "back",
  OUTLINED: "outlined",
  DISABLED: "disabled",
  CONTAINED: "contained",
};

export const CLASSIFICATION_RANK = {
  SUPER_STAR: "superStar",
  STAR: "star",
  CONSISTENT: "consistent",
  IN_DEVELOPMENT: "inDevelopment",
  NOT_CONSISTENT: "notConsistent",
};

export const CLASSIFICATION_RANK_WITH_DESCRIPTION = {
  "Super Estrella": CLASSIFICATION_RANK.SUPER_STAR,
  "Estrella": CLASSIFICATION_RANK.STAR,
  "Consistente": CLASSIFICATION_RANK.CONSISTENT,
  "En desarrollo": CLASSIFICATION_RANK.IN_DEVELOPMENT,
  "Poco consistente": CLASSIFICATION_RANK.NOT_CONSISTENT,
  // Scale for La Haus
  "Top Talent": CLASSIFICATION_RANK.SUPER_STAR,
  "Sobresaliente": CLASSIFICATION_RANK.STAR,
  "Inconsistente": CLASSIFICATION_RANK.NOT_CONSISTENT,
};

export const VISIBILITY = {
  COMPACT: "Compact",
  WIDE: "Wide",
};

export const PERFORMANCE_MAX_PERCENTAGE = 100;
export const FORMAT_TEXT = /([a-z])([A-Z])/g;
export const MIN_STAR_RATING = 0;

export const TYPES = {
  string: "string",
  object: "object",
  number: "number",
  email: "email",
  date: "date",
  text: "text",
  hidden: "hidden",
  checkbox: "checkbox",
};

export const NUMBER_OF_EVALUATIONS = 4;

export const RADIO_OPTIONS = {
  voluntary: "voluntary",
  involuntary: "involuntary",
};

export const GRID_DIVIDERS = 10;
export const COLORS_NAME = {
  light: "light",
  purple: "purple",
  primary: "primary",
};

export const DATE = "date";

export const LANGUAGES = {
  en: "en",
  es: "es",
  pr: "pr",
  pt: "pt",
};

export const LANGUAGES_NAMES = {
  spanish: "Español",
  english: "English",
  portuguese: "Português",
};

export const DASHBOARD_REDUCER = {
  performance: "performance",
  potential: "potential",
};

export const MIN_VALUE = 0;

export const PATTERN_OBJECT_BOUNDING = "objectBoundingBox";

export const SCROLL_BEHAVIOR = {
  smooth: "smooth",
};

export const BORDER_ACCORDION_TYPE = {
  rounded: "rounded",
  square: "square",
};

export const WEEK_DAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const CARD_TYPE = {
  evaluation: "evaluation",
  badge: "badge",
};

export const PERSONALITY_EVALUATION = {
  energizes: 0,
  drains: 1,
};

export const EXCEL_FILES_NAME = {
  potentialNineBox: "potential-nine-box",
  leadersReview: "leaders-review",
};

export const FORMAT_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const BULK_UPLOAD_FORMAT = /(.xlsx|.csv)$/i;
export const ACCEPTED_FORMATS = ".xlsx, .csv";

export const TYPE_BULK_UPLOAD = {
  onboarding: "onboarding",
  collaborators: "collaborators",
};

export const BULK_UPLOAD = {
  row_number: "row_number",
  xlsx: {
    type: {
      binary: "binary",
      array: "array",
    },
    col: 1,
    initialCounter: 2,
    firstData: 0,
    dataLimit: 10,
    ref: "!ref",
    maxCol: {
      collaborators: 29,
      onboarding: 20,
    },
  },
  requiredSign: "*",
  state: {
    pending: "pending",
    successfully: "successfully",
    failed: "failed",
  },
  calculateTime: {
    min: 100,
  },
};

export const LINEAR_PROGRESS = {
  min: 0,
  max: 100,
  diff: 10,
  interval: 300,
};

export const PASSWORD_INPUT_LABEL_WIDTH = {
  large: 150,
  medium: 110,
  default: 70,
};
export const INPUT_TYPE_TOGGLE_PASSWORD = {
  password: "password",
  text: "text",
};

export const PASSWORD_VALIDATION_UTILS = {
  length: "length",
  confirmation: "confirmation",
  minLength: 8,
};

export const AUTH_METHODS = {
  password: "password",
  token: "token",
  google: "google",
};

export const ERROR_TYPE = {
  unauthorized: "unauthorized",
};

export const RECOVER_PASSWORD_UTILS = {
  tokenSearchPosition: 2,
  emailSearchPosition: 1,
  maxLength: 16,
  typeErrorMaxLength: "maxLength",
};

export const LOCAL_STORAGE_NAMES = {
  typeOfContract: "typeOfContract",
  managers: "managers",
  countries: "countries",
  cities: "cities",
  orgUnitsTypes: "orgUnitsTypes",
  orgUnits: "orgUnits",
  currencies: "currencies",
  employmentRelationship: "employmentRelationship",
  positions: "positions",
  user: "user",
  version: "version",
  timeOffCategories: "timeOffCategories",
  timeOffTypes: "timeOffTypes",
  logOutError: "logOutError",
  accessToken: "accessToken",
  client: "client",
  uid: "uid",
  maxFollowUpDays: "maxFollowUpDays",
  isMulticompany: "isMulticompany",
  referrer: "referrer",
};

export const RobotoFont = "Roboto";

export const SIZE = {
  small: "small",
  medium: "medium",
};

export const TABLE_SIZE = {
  small: "small",
  medium: "medium",
};

export const TABLE_CELL_ALIGN = {
  left: "left",
};

export const ICON = {
  left: "left",
  right: "right",
};

export const VARIANT = {
  button: "button",
  paddingCheckbox: "checkbox",
  none: "none",
  default: "default",
  dense: "dense",
  outlined: "outlined",
  determinate: "determinate",
  contained: "contained",
  bodyOne: "body1",
  bodyTwo: "body2",
  subtitleOne: "subtitle1",
  subtitleTwo: "subtitle2",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  normal: "normal",
  dot: "dot",
  circle: "circle",
  fullWidth: "fullWidth",
  scrollable: "scrollable",
  inherit: "inherit",
  caption: "caption",
};

export const CIRCULAR_PROGRESS = {
  large: 120,
  medium: 60,
  small: 20,
};

export const DECIMAL_SCALE_NUMBER_INPUT = 0;
export const DEFAULT_MIN_DECIMAL = 2;

export const FILTER_SEACH = {
  equal: "=",
};

export const FILTERS_KEYS = {
  country: "country",
  countries: "countries",
  city: "city",
  cities: "cities",
  unit: "unit",
  unities: "unities",
  manager: "manager",
  managers: "managers",
  collaborators: "collaborators",
  periods: "periods",
  state: "state",
  states: "states",
  collaboratorsStates: "collaboratorsStates",
  timeOffTypes: "timeOffTypes",
};

export const ONBOARDING_KEYS = {
  documentTypeId: "document_type_id",
  infoTypeId: "info_type_id",
};

export const KEYS_WITH_DECIMALS = {
  salary: "salary",
  average_commissions: "average_commissions",
  health_insurance: "health_insurance",
  meal_allowance: "meal_allowance",
  dental_insurance: "dental_insurance",
  life_insurance: "life_insurance",
  other_benefits: "other_benefits",
};

export const UNDEFINED = undefined;

export const FULLDATE_FORMATS = {
  slash: "DD/MM/YYYY",
  slashShort: "DD/MM/YY",
  dash: "DD-MM-YYYY",
  slash_calendar: "YYYY/MM/DD",
};

export const FULLDATE_FORMATS_STANDARD = {
  slash: "dd/MM/yyyy",
  dash: "dd-MM-yyyy",
};

export const SORT_COMPARATOR = {
  one: 1,
  minusOne: -1,
  zero: 0,
};

export const GOALS_INDEX_TABS = {
  inProgress: 0,
  archived: 1,
};

export const DESCENDANT = "is_descendant";
export const EMPLOYEES_TO_REMOVE_NUMBER = 1;

export const COLLABORATORS_TABLE_ACTIONS = {
  view: "view",
  edit: "edit",
  promote: "promote",
  lateralMovement: "lateralMovement",
  salaryRaise: "salaryRaise",
};

export const MODE_ON_CHANGE_FORMS = "onChange";

export const ROUND = {
  min: 0,
  max: 2,
};

export const PERCENTAGE = {
  max: 100,
  min: 0,
};

export const MAX_LENGTH_INPUT = {
  currency: 20,
  number: 10,
};

export const MULTILINE = {
  min: 2,
};

export const KEY_PRESS = {
  enter: "Enter",
};

export const PAGINATION = {
  maxPerPage: 10,
  limited: 9,
  next: 1,
};

export const COMPONENT = {
  fieldset: "fieldset",
  label: "label",
  span: "span",
  th: "th",
  div: "div",
  legend: "legend",
};

export const INDEX = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
};

export const ALIGN_ITEMS = {
  center: "center",
  flex: "flex",
  flexEnd: "flex-end",
  bottom: "bottom",
  left: "left",
  right: "right",
  top: "top",
  baseline: "baseline",
  inline: "inline",
};

export const DIRECTION = {
  column: "column",
  row: "row",
};

export const ADORMENT_POSITION = {
  end: "end",
  start: "start",
};

export const JUSTIFY = {
  spaceBetween: "space-between",
};

export const WIDTH = {
  text: 300,
  date: 200,
  select: 170,
  progressBar: 130,
  actions: 50,
  name: 250,
  state: 10,
};

export const USD = "USD"; // FIXME: Temporal const; delete this when company's currency config will be ready

export const DATE_PARTS = {
  year: "year",
  month: "month",
  date: "date",
  day: "day",
  days: "days",
};

export const SURVEY_PROCESS_TYPE = {
  performance: {
    key: "PerformanceProcess",
    value: "performance_processes",
    itemData: "performance_process",
  },
  potential: {
    key: "PotentialProcess",
    value: "potential_processes",
    itemData: "potential_process",
  },
  goodLeader: {
    key: "GoodLeaderProcess",
    value: "good_leader_processes",
    itemData: "good_leader_process",
  },
  engagement: {
    key: "EngagementProcess",
    value: "engagement_processes",
    itemData: "engagement_process",
    resultTypes: {
      satisfaction: "satisfaction_by_department",
      comments: "comments_by_department",
      nps: "nps_by_department",
    },
  },
  training: {
    key: "TrainingEvaluationProcess",
    value: "training_evaluation_processes",
    itemData: "training_evaluation_process",
  },
};

export const ACTIONS = {
  new: "new",
  edit: "edit",
  close: "close",
  preview: "preview",
};

export const COMPANY_ID_PARAM = (id) => `?company_id=${id}`;
export const COLLABORATORS_PATH = "collaborators";
export const FEEDBACK_PATH = "feedbacks";
export const SURVEY_PROCESS_PATH = "survey_processes";
export const SURVEY_RESULTS_PATH = "survey_results";
export const GOOD_LEADER_PROCESSES_PATH = "good_leader_processes";
export const USER_ID_PARAM = (userId) => `user_id=${userId}`;
export const BOTTOM_RESULTS_PATH = "bottom_results";
export const TOP_RESULTS_PATH = "top_results";
export const SEND_PROCESS_PATH = "send_process";
export const SEND_PROCESS_REMINDER_PATH = "send_process_reminder";

export const DOWNLOAD_TYPE = {
  none: "none",
  excel: "excel",
  pdf: "pdf",
};

export const GOAL_RULES = {
  lessIsBetter: "LessIsBetter",
  moreIsBetter: "MoreIsBetter",
};

export const PATHS = {
  profile: "/profile",
  onboardingFollowUp: "/onboarding-follow-up",
  search: {
    collaborators: "?collaborator=",
  },
};

export const METHODS = {
  get: "get",
  post: "post",
  put: "put",
  delete: "delete",
};

export const LOCATION_PROPS = {
  search: "search",
  pathname: "pathname",
  state: "state",
  key: "key",
  hash: "",
};

export const INPUT_TYPE = {
  text: "text",
  select: "select",
  password: "password",
  file: "file",
};

export const INPUT_RULES = {
  isValidEmail: {
    required: true,
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    },
  },
  required: {
    required: true,
  },
  maxAndMinLength: (maxLength, required = true, minLength) => ({ required, maxLength, minLength }),
  passwordMatch: (password, t) => ({
    required: true,
    validate: (value) => (value === password.current) || t("formValidations:validations.password_dont_match"),
  }),
};

export const BUTTON_TYPE = {
  submit: "submit",
};

export const NO_AUTOCOMPLETE = "no";

export const FORM_MODE = {
  onChange: "onChange",
};

export const EXCEL_PROPS = {
  eachCell: "eachCell",
  style: {
    minWidth: 15,
    minLength: 0,
    maxLength: 5,
    border: {
      thin: "thin",
    },
    colors: {
      fgColorRequired: "FFFFFF00",
      bgColorRequired: "FF0000FF",
    },
  },
  type: {
    list: "list",
    pattern: "pattern",
  },
  errorStyle: {
    error: "error",
  },
  plusCell: "0000",
  pattern: {
    solid: "solid",
  },
  font: "Calibri",
  state: {
    hidden: "hidden",
  },
  position: {
    one: 1,
  },
};

export const COUNTRIES = {
  colombia: "Colombia",
};

export const IFRAME = {
  min: 500,
};

export const TARGET = {
  blank: "_blank",
  self: "_self",
};

export const FEEDBACK_TYPE = {
  feedbackSimple: "FeedbackSimple",
  feedbackSSC: "FeedbackStartStopContinue",
  feedbackSimpleSN: "feedback_simple",
  feedbackSSCSN: "feedback_start_stop_continue",
};

export const PARAMS_SERIALIZER_OPTIONS = { encode: false, arrayFormat: "brackets" };

export const signInPath = "sign-in";
export const signInTitle = "sign_in";

export const RADIX_PARAMETER = 10;

export const SCOPE = {
  row: "row",
};

export const FOLLOW_UP_STATUS = {
  complete: "complete",
  incomplete: "incomplete",
  pending: "pending",
  closed: "closed",
};
export const SENTRY_DSN = "https://0101010@1.ingest.sentry.io/12";

export const SIGN_IN_URLS = [`${CURRENT_DOMAIN}/${signInPath}`, `http://localhost:3000/${signInPath}`];

export const DEVELOPMENT_PLAN_INDEX_TABS = {
  inProgress: 0,
  overview: 1,
};

export const FILTER_TYPE = {
  general: "general",
};

export const GENERAL_ADMINISTRATOR = {
  units: "units",
};

export const TOAST_ERROR_DURATION = 5000;
export const COMMENTS = {
  maxLength: 255,
};

export const REL = "noopener noreferrer";

export const PLACEMENT_LENGTH = {
  min: 2,
  max: 30,
};

export const SCALE_COUNT = {
  min: 5,
};

export const CODE_EDITOR = {
  totalPercentage: "100%",
  height: "220px",
};

export const WRAP = {
  nowrap: "nowrap",
};

export const RESULT_TYPE = {
  submitted: "submitted",
  received: "received",
};
