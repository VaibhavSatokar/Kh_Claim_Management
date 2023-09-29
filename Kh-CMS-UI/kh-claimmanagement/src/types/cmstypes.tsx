export interface IRoutesState {
    UserId: number;
    AppId: number;
    AppFeatureId: any;
    FeatureName: string;
    Icon: any;
    Link: string;
    Components: any;
  }

export interface IClaimApplication{
  ClaimApplicationId : number| string,
  UserId : string | number,
  Title : string,
  Description : string,
  InvoiceDate : any,
  ClaimAmount : number,
  Attachment : any,

}
export interface IClaimApplicationStatus{
  ClaimStatusId : number,
  ClaimApplicationId : number| string,
  FirstName : string,
  LastName : string,
  UserId : string | number,
  Title : string,
  Description : string,
  InvoiceDate : any,
  ClaimAmount : number,
  Attachment : any,
  ClaimStatus : string,
  ClaimTypeId : string,
  ClaimType : string,
  Project : any,
  ApproverId : number,
  Reason : string

}

export interface IClaimType{
  ClaimTypeId : number,
  ClaimType : string,
  ClaimTypeDescription : string,
  Created : any,
  CreatedBy : any,
  Modified : any,
  ModifiedBy : number,
  Enable : number
}