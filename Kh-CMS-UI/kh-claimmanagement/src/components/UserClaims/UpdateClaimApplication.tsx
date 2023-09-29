import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Grid, Typography, Box, InputLabel, SelectChangeEvent, Snackbar, Alert, FormControl, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { IClaimApplicationStatus } from '../../types/cmstypes';
import { UpdateClaimApplication } from '../../service/cmsservices';
import { GetUserNewAndRejectedClaims } from '../../service/cmsservices';
import { useAppSelector } from "../../app/hooks"; 
import { IClaimType } from '../../types/cmstypes';
import { GetAllClaimTypes } from '../../service/cmsservices';


export interface IUpdateClaimProp {
  ClaimApplicationId: number | string;
  onClose: () => void;
  onClaimUpdate: (updatedUser: IClaimApplicationStatus) => void;
}

const UpdateClaimApplications: React.FC<IUpdateClaimProp> = (props) => {
    const { ClaimApplicationId, onClose } = props
    const [claim, setClaim] = useState<IClaimApplicationStatus[]>([]);
    const [attachment, setAttachment] = useState('');
    const [ClaimData, setClaimData] = useState<IClaimApplicationStatus | null>(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [claimTypes, setClaimTypes] = useState<IClaimType[]>([]); // Define the type for Claimtype
    const [selectedClaimTypeId, setSelectedClaimTypeId] = useState(''); // State to track selected claim type
    const [selectedProject, setSelectedProject] = useState<'Internal' | 'Customer' | ''>('');
    const [attachmentFile, setAttachmentFile] = useState<File | null>(null);


    const User = useAppSelector((state)=>state.user.UserData)
     const UserId = User?.UserId

  

      useEffect(() => {
        if(UserId){
          GetUserNewAndRejectedClaims(UserId)
          .then((response) => {
            setClaim(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
        }
      }, [UserId]);
  
    useEffect(() => {
      // Find the Permisson by its ID and set it in the state
      const selectedClaim = claim.find((claim) => claim.ClaimApplicationId === ClaimApplicationId);
      if (selectedClaim) {
        setClaimData(selectedClaim);
      }
    }, [claim, ClaimApplicationId]);

       // Alert msg state
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState<
    "success" | "error" | "warning"
  >("success");

  const showAlert = (
    message: string,
    severity: "success" | "error" | "warning"
  ) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };
  // Alert END
  
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setClaimData((prevData: any) => ({
        ...(prevData as IClaimApplicationStatus), // Use a type assertion to handle 'undefined'
        [name]: value,
      }));
    };
  
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (ClaimData) {

          // Add the CreatedBy field to AppFeature
          const updatedClaim = {
            ...ClaimData,
            CreatedBy: UserId, // Hardcoded CreatedBy value
            ClaimStatus : 'N',
            Attachment: attachmentFile,

          };
        // Call the API to save the updated ClaimData
        UpdateClaimApplication(updatedClaim)
          .then((response) => {
            if (response.status === 200) {
              showAlert("Claim Saved successfully!", "success");
              props.onClaimUpdate(updatedClaim); // Notify parent about the update
            } else {
              showAlert("Server problem", "error");
            }
            // Handle the successful response if needed
            console.log(response.data);
            onClose(); // Close the modal after successful save
          })
          .catch((error) => {
            // Handle the error if needed
            console.error(error);
          });
      }
    };

    useEffect(() => {
      GetAllClaimTypes()
          .then((response) => {
              setClaimTypes(response.data); // Update the claimTypes state
          })
          .catch((error) => {
              console.error(error);
          });
  }, []);

  const handleClaimType = (event: SelectChangeEvent) => {
      setSelectedClaimTypeId(event.target.value);
  };
  useEffect(() => {
    if (ClaimData) {
        setSelectedProject(ClaimData.Project);
    }
}, [ClaimData]);

useEffect(() => {
  GetAllClaimTypes()
      .then((response) => {
          setClaimTypes(response.data);
          if (ClaimData) {
              setSelectedClaimTypeId(ClaimData.ClaimTypeId);
          }
      })
      .catch((error) => {
          console.error(error);
      });
}, [ClaimData]);
  
    if (!ClaimData) {
      return <div>Loading...</div>;
    }

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alertOpen}
        autoHideDuration={8000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Box component={'form'} onSubmit={handleSubmit} style={{ width: '500px', justifyContent: 'center', alignItems: 'center', margin: 'auto', marginBottom: '20px', overflowY: 'auto', maxHeight: '90vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', justifyItems: 'center' }}>
            <Typography variant="h6" style={{ color: 'purple', fontWeight: 'bold', fontSize: '30px' }}>Update Claim Application</Typography>
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              id="ClaimApplicationId"
              label="Claim Application Id"
              name="ClaimApplicationId"
              fullWidth
              value={ClaimData.ClaimApplicationId}
              InputProps={{ readOnly: true }}
            />
          </Grid> */}
          <Grid item xs={12} >
            <TextField
              id="Title"
              label="Title"
              name="Title"
              fullWidth
              required
              value={ClaimData.Title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Description"
              label="Description"
              name="Description"
              fullWidth
              multiline
              rows={3}
              required
              value={ClaimData.Description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs = {6}>
                        <FormControl component="fieldset">
                            <Typography variant="subtitle1">Select Project Type:</Typography>
                            <RadioGroup
                                aria-label="project-type"
                                name="project-type"
                                value={selectedProject}
                                onChange={(event) =>
                                    setSelectedProject(event.target.value as 'Internal' | 'Customer')
                                }
                            >
                                <FormControlLabel value="Internal" control={<Radio />} label="Internal" />
                                <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
          <Grid item xs = {6}>
                        <FormControl fullWidth required>
                            <InputLabel id = "claim-type-label">Claim Type</InputLabel>
                            <Select
                                labelId = "claim-type-label"
                                id = "ClaimTypeId"
                                name = "ClaimTypeId"
                                value = {selectedClaimTypeId}
                                onChange = {handleClaimType}
                            >
                                {claimTypes.map((claimtype) => (
                                    <MenuItem key = {claimtype.ClaimTypeId} value = {claimtype.ClaimTypeId}>
                                        {claimtype.ClaimType}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    
          <Grid item xs={6}>
            <TextField
              id="InvoiceDate"
              label="Expenses Incurred On"
              name="InvoiceDate"
              fullWidth
              type='Date'
              required
              value={ClaimData.InvoiceDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="ClaimAmount"
              label="Claim Amount"
              name="ClaimAmount"
              fullWidth
              required
              value={ClaimData.ClaimAmount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
    <TextField
        id="Attachment"
        // label="Attachment"
        name="Attachment"
        type="file"
        onChange={(event) => {
            const fileInput = event.target as HTMLInputElement;
            if (fileInput.files && fileInput.files.length > 0) {
                const file = fileInput.files[0];
                setAttachmentFile(file);
            }
        }}
        fullWidth
    />
</Grid>
          <Grid item style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
            <Grid>
              <Button variant="contained" color="secondary" type="submit">
                Update
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default UpdateClaimApplications;