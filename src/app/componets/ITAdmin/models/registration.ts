export interface Registration {
  empId: number;
  emailId: string;
  userName: string;
  password: string;
  isActive: boolean;
  userTypeId: number;
  createBy: number;
  cretedDate: Date;
  lastModifiedBy: number;
  lastModifiedDate: Date;
}
