export const baseUrl = 'http://localhost:56426/';
// export const baseUrl = 'http://192.168.16.9:401/';
// export const baseUrl = 'http://localhost:401/';
//export const baseUrl = 'http://212.12.179.132:401/';
export enum UrlNames {

  //ITAdmin Related
  Login = 'ITAdmin/Login',
  Registration = 'ITAdmin/AddUpdateUser',
  GetUsers = 'ITAdmin/GetUsers',
  UpdateUser = 'ITAdmin/UpdateUser',
  DeleteUser = 'ITAdmin/DeleteUser/',
  ChangePassword = "ITAdmin/changepassword",
  //HRPayroll Related 
  EmployeeMaster = 'HRPayroll/GetEmployeeMasters',
  UserProfileById = 'HRPayroll/GetEmployeeById/',
  departmentMaster = "HRPayroll/GetDepartments",
  //Common Related
  getCountries = "Common/GetCountries",
  getPayTerms = "Common/GetPaymentTerms",
  taxCode = "Common/GetTaxCodeMasters",
  getCurrencies = "Common/GetCurrencies",
  getUnitofMeasure = "Common/GetMaterialUOM",
  getCurrencyRates = "Common/GetCurrencyRates",
  //Finanace Related 
  BankMaster = 'Finance/GetBankMaster',
  BankMasterDelete = 'Finance/DeleteBankMaster/',
  bankMasterUpdate = "Finance/AddUpdateBankMaster",
  glCode = "Finance/GetGLChartofAccounts",
  taxCodeDetails = "Finance/GetTaxCodeDetail",
  GetTaxCodePercentage = "Finance/GetTaxCodePercentage",
  GetChartofAcctDesc = "Finance/GetChartofAcctDesc",
  //TicketSystem Related
  getSources = "TicketSystem/GetTicketSourceMasters",
  statusMaster = "TicketSystem/GetTicketStatusMasters",
  priorityMaster = "TicketSystem/GetTicketPriorityMasters",
  categoryMaster = "TicketSystem/GetTicketCategoryMasters",
  AddNewTicket = "TicketSystem/AddUpdateTicketMaster",
  AddTicketAttach = "TicketSystem/AddTicketAttach",
  SendEmailTicket = "TicketSystem/SendEmailTicket",
  //TicketDetails = "TicketMaster/GetTicketMasters",
  TicketDetails = "TicketSystem/GetTicketMastersEmpWise",
  TicketDetailsUpdate = "TicketSystem/AddUpdateTicketDetail",
  TicketMasterDelete = 'TicketSystem/DeleteTicketMaster/',
  TicketDetailsRemark = "TicketSystem/GetTicketDetails",
  //Procurement Related
  PoListMaster = "Procurement/GetPurchaseOrderList",
  RFQListMaster = "Procurement/GetRFQList",
  PRListMaster = "Procurement/GetPRList",
  POStatus = "Procurement/GetPOStatus",
  //Projects Related 
  getProject = "Projects/GetProjectMaster",
  getBillingSchedule = "Projects/GetProjectBillingSchedule",
  getBillingCustomer1 = "Projects/GetProjectBillingCustomer",
  getBillingCustomer = "Projects/GetProjectBillingCustomerByProject",
  getBillingScheduleByProject = "Projects/GetProjectBillingSchedulesbyProject",
  //SalesEstimation Related
  GetSalesInvoice="SalesEstimation/GetSalesInvoice",
  SalesInvoice = "SalesEstimation/GetSalesInvoiceHeaderView",
  CustomerMaster = 'SalesEstimation/GetCustomerMasters',
  customerMasterUpdate = 'SalesEstimation/AddUpdateCustomerMaster',
  customerMasterdelete = 'SalesEstimation/DeleteCustomerMaster/',
  customerPostingGlAcct = "SalesEstimation/GetCustomerPostingGroups",
  getContacts = "SalesEstimation/GetCustomerContactMaster",
  GetCustomerPostingGroupbyCustomer = "SalesEstimation/GetCustomerPostingGroupbyCustomer",
  GetContactByCustomerCode = "SalesEstimation/GetCustomerContactByProject",
  saveInvoice = 'SalesEstimation/AddUpdateSalesInvoice',
  saveInvoiceItem = 'SalesEstimation/AddUpdateSalesInvoiceItem',
  GetCreditNote="SalesEstimation/GetCreditNote",
}
