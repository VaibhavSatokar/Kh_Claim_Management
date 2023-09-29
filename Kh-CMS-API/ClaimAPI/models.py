from django.db import models

# Create your models here.

class ClaimApplicationsInfo:
    def __init__(self, ClaimApplicationId,  FirstName, LastName, UserId, Title, Description, InvoiceDate, ClaimAmount, Attachment, Created, CreatedBy, Modified, ModifiedBy, Enable, ClaimTypeId, Project, ClaimStatus ):

        self.ClaimApplicationId = ClaimApplicationId
        self.FirstName = FirstName
        self.LastName = LastName
        self.UserId = UserId
        self.Title = Title
        self.Description = Description
        self.InvoiceDate = InvoiceDate
        self.ClaimAmount = ClaimAmount
        self.Attachment = Attachment
        self.Created = Created
        self.CreatedBy = CreatedBy
        self.Modified = Modified
        self.ModifiedBy = ModifiedBy
        self.Enable = Enable
        self.ClaimTypeId = ClaimTypeId
        self.Project = Project
        self.ClaimStatus = ClaimStatus
        
class UserClaimApplicationsInfo:
    def __init__(self, ClaimApplicationId,  FirstName, LastName, UserId, Title, Description, InvoiceDate, ClaimAmount, Attachment, Created, CreatedBy, Modified, ModifiedBy, Enable, ClaimTypeId, ClaimType, Project, ClaimStatus, Reason ):

        self.ClaimApplicationId = ClaimApplicationId
        self.FirstName = FirstName
        self.LastName = LastName
        self.UserId = UserId
        self.Title = Title
        self.Description = Description
        self.InvoiceDate = InvoiceDate
        self.ClaimAmount = ClaimAmount
        self.Attachment = Attachment
        self.Created = Created
        self.CreatedBy = CreatedBy
        self.Modified = Modified
        self.ModifiedBy = ModifiedBy
        self.Enable = Enable
        self.ClaimTypeId = ClaimTypeId
        self.ClaimType = ClaimType
        self.Project = Project
        self.ClaimStatus = ClaimStatus
        self.Reason = Reason
        
class ClaimStatusInfo:
    def __init__(self, ClaimStatusId, ClaimApplicationId,  FirstName, LastName, UserId, Title, Description, InvoiceDate, ClaimAmount, Attachment, Created, CreatedBy, Modified, ModifiedBy, Enable, ClaimTypeId, ClaimType,  Project, ClaimStatus, ApproverId, Reason ):

        self.ClaimStatusId = ClaimStatusId
        self.ClaimApplicationId = ClaimApplicationId
        self.FirstName = FirstName
        self.LastName = LastName
        self.UserId = UserId
        self.Title = Title
        self.Description = Description
        self.InvoiceDate = InvoiceDate
        self.ClaimAmount = ClaimAmount
        self.Attachment = Attachment
        self.Created = Created
        self.CreatedBy = CreatedBy
        self.Modified = Modified
        self.ModifiedBy = ModifiedBy
        self.Enable = Enable
        self.ClaimTypeId = ClaimTypeId
        self.ClaimType = ClaimType
        self.Project = Project
        self.ClaimStatus = ClaimStatus
        self.ApproverId = ApproverId
        self.Reason = Reason
        
class SaveClaimApplicationsInfo:
    def __init__(self, ClaimApplicationId, UserId, Title, Description, InvoiceDate, ClaimAmount, Attachment, ClaimTypeId, Project, CreatedBy ):

        self.ClaimApplicationId = ClaimApplicationId
        self.UserId = UserId
        self.Title = Title
        self.Description = Description
        self.InvoiceDate = InvoiceDate
        self.ClaimAmount = ClaimAmount
        self.Attachment = Attachment
        self.ClaimTypeId = ClaimTypeId
        self.Project = Project
        self.CreatedBy = CreatedBy


class SaveStatusInfo:
    def __init__(self, ClaimStatusId, ApproverId, ClaimStatus, Reason, CreatedBy ):

        self.ClaimStatusId = ClaimStatusId
        self.ApproverId = ApproverId
        self.ClaimStatus = ClaimStatus
        self.Reason = Reason
        self.CreatedBy = CreatedBy
        
        
class ClaimTypeInfo:
    def __init__(self, ClaimTypeId,  ClaimType, ClaimTypeDescription, Created, CreatedBy, Modified, ModifiedBy, Enable ):

        self.ClaimTypeId = ClaimTypeId
        self.ClaimType = ClaimType
        self.ClaimTypeDescription = ClaimTypeDescription
        self.Created = Created
        self.CreatedBy = CreatedBy
        self.Modified = Modified
        self.ModifiedBy = ModifiedBy
        self.Enable = Enable
        
class SaveClaimTypeInfo:
    def __init__(self, ClaimTypeId, ClaimType, ClaimTypeDescription,  CreatedBy ):

        self.ClaimTypeId = ClaimTypeId
        self.ClaimType = ClaimType
        self.ClaimTypeDescription = ClaimTypeDescription
        self.CreatedBy = CreatedBy
        
        
class UpdateClaimTypeInfo:
    def __init__(self, ClaimTypeId, ClaimType, ClaimTypeDescription,  CreatedBy, Enable ):

        self.ClaimTypeId = ClaimTypeId
        self.ClaimType = ClaimType
        self.ClaimTypeDescription = ClaimTypeDescription
        self.CreatedBy = CreatedBy
        self.Enable = Enable
       