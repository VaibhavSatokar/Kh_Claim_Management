import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Grid, Typography, Box, FormControl, Select, MenuItem, SelectChangeEvent, InputLabel } from '@mui/material';
import { IClaimApplicationStatus } from '../../types/cmstypes';
// import { SaveClaimStatus, GetClaimStatusHistory } from '../../services/lmsservices';
import { SaveClaimStatus, GetClaimStatusHistory } from '../../service/cmsservices';
import { useAppSelector } from '../../app/hooks';

interface IUpdateClaimApplicationStatusProps {
  ClaimStatusId: number;
  onClose: () => void;
  onClaimStatusUpdate: () => void; 
}

const SaveStatus: React.FC<IUpdateClaimApplicationStatusProps> = ({ ClaimStatusId, onClose, onClaimStatusUpdate }) => {
    const [claimstatus, setClaimStatus] = useState<IClaimApplicationStatus[]>([]);
    const [ClaimData, setClaimData] = useState<IClaimApplicationStatus | null>(null);
    const [selectedClaimStatus, setSelectedClaimStatus] = useState('');

    const handleChangeClaimStatus = (event: SelectChangeEvent<any>) => {
        const { value } = event.target;
        setSelectedClaimStatus(value);
      
        // Update the ClaimData state with the selected value
        setClaimData((prevData: IClaimApplicationStatus | null) => ({
          ...(prevData as IClaimApplicationStatus), // Use a type assertion to handle 'undefined'
          ClaimStatus: value,
        }));
      };
      const User = useAppSelector((state)=> state.user.UserData)
      const UserId = User?.UserId
  
    useEffect(() => {
      // Fetch all leave types and set them in the state
      GetClaimStatusHistory()
        .then((response) => {
          // Handle the successful response
          setClaimStatus(response.data);
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    }, []);
  
    useEffect(() => {
      // Find the Claim by its ID and set it in the state
      const selectedClaimStatus = claimstatus.find((Claim) => Claim.ClaimStatusId === ClaimStatusId);
      if (selectedClaimStatus) {
        setClaimData(selectedClaimStatus);
      }
    }, [claimstatus, ClaimStatusId]);
  
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
        // Include CreatedBy field with UserId
        const claimDataWithCreatedBy = {
          ...ClaimData,
          CreatedBy: UserId,
        };
    
        SaveClaimStatus(claimDataWithCreatedBy)
          .then((response) => {
            // Notify the parent component about the update
            onClaimStatusUpdate();
            onClose();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };
    
    
    if (!ClaimData) {
      return <div>Loading...</div>;
    }

  return (
    <React.Fragment>
      <Box component={'form'} onSubmit={handleSubmit} style={{ width: '500px', justifyContent: 'center', alignItems: 'center', margin: 'auto', marginBottom: '20px', overflowY: 'auto', maxHeight: '90vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', justifyItems: 'center' }}>
            <Typography variant="h6" style={{ color: 'purple', fontWeight: 'bold', fontSize: '50px' }}>Update Claim Status</Typography>
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              id="ClaimStatusId"
              label="Claim Type Id"
              name="ClaimStatusId"
              fullWidth
              value={ClaimData.ClaimStatusId}
              InputProps={{ readOnly: true }}
            />
          </Grid> */}
                    <Grid item xs={6}>
                        <TextField
                            id="FullName"
                            label="Full Name"
                            name="FullName"
                            fullWidth
                            // required
                            value={`${ClaimData.FirstName} ${ClaimData.LastName}`}
                            InputProps={{ readOnly: true }}
                            className="readonly-textfield"
                        />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="Title"
                        label="Title"
                        name="Title"
                        fullWidth
                        // required
                        value={ClaimData.Title}
                        onChange={handleChange}
                        InputProps={{ readOnly: true }}
                        className="readonly-textfield"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="Description"
                        label="Description"
                        name="Description"
                        multiline
                        rows={3}
                        fullWidth
                        // required
                        value={ClaimData.Description}
                        onChange={handleChange}
                        InputProps={{ readOnly: true }}
                        className="readonly-textfield"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="InvoiceDate"
                        label="Expenses Incurred On"
                        name="InvoiceDate"
                        fullWidth
                        // required
                        value={ClaimData.InvoiceDate}
                        onChange={handleChange}
                        InputProps={{ readOnly: true }}
                        className="readonly-textfield"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="ClaimAmount"
                        label="Claim Amount"
                        name="ClaimAmount"
                        fullWidth
                        // required
                        value={ClaimData.ClaimAmount}
                        onChange={handleChange}
                        InputProps={{ readOnly: true }}
                        className="readonly-textfield"
                      />
                    </Grid>
          <Grid item xs = {12}>
              <FormControl fullWidth>
                  <InputLabel id="ClaimStatus">Claim Status</InputLabel>
                  <Select
                      labelId="ClaimStatus"
                      id="ClaimStatus"
                      name="ClaimStatus"
                      value={selectedClaimStatus}
                      onChange={handleChangeClaimStatus}
                      fullWidth
                      required
                  >
                      <MenuItem value="A">Approve</MenuItem>
                      <MenuItem value="R">Reject</MenuItem>
                  </Select>
                </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="Reason"
              label="Reason"
              name="Reason"
              multiline
              rows={3}
              fullWidth
              required
              value={ClaimData.Reason}
              onChange={handleChange}
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

export default SaveStatus;