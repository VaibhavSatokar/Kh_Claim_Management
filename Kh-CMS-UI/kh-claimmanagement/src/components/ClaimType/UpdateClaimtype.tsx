import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Grid, Typography, Box, InputLabel, Snackbar, Alert, Switch } from '@mui/material';
import { IClaimType } from '../../types/cmstypes';
import { UpdateClaimTypes, GetEntireClaimTypes } from '../../service/cmsservices';
import { useAppSelector } from '../../app/hooks';

export interface IUpdateClaimTypeProp {
  ClaimTypeId: number | string;
  onClose: () => void;
  onClaimTypeUpdate: (updatedClaimType: IClaimType) => void;
}

const UpdateClaimType: React.FC<IUpdateClaimTypeProp> = (props) => {
  const { ClaimTypeId, onClose } = props;
  const [claimtype, setClaimType] = useState<IClaimType[]>([]);
  const [ClaimtypeData, setClaimTypeData] = useState<IClaimType | null>(null);
  const [enable, setEnable] = useState(false);
  const User = useAppSelector((state) => state.user.UserData);
  const UserId = User?.UserId;

  useEffect(() => {
    // Fetch all Claim types and set them in the state
    GetEntireClaimTypes()
      .then((response) => {
        // Handle the successful response
        setClaimType(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Find the claimtype by its ID and set it in the state
    const selectedClaimType = claimtype.find((claimtype) => claimtype.ClaimTypeId === ClaimTypeId);
    if (selectedClaimType) {
      setClaimTypeData(selectedClaimType);
      // Initialize the 'enable' state with the value from 'ClaimtypeData.Enable'
      setEnable(selectedClaimType.Enable === 1);
    }
  }, [claimtype, ClaimTypeId]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === 'Enable') {
      // Handle changes to the 'Enable/Disable' toggle button
      setEnable(value === '1');
    } else {
      setClaimTypeData((prevData: any) => ({
        ...(prevData as IClaimType),
        [name]: value,
      }));
    }
  };

  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (ClaimtypeData) {
      // Update the 'Enable' property in 'ClaimtypeData' based on the 'enable' state
      ClaimtypeData.Enable = enable ? 1 : 0;

      // Add the 'CreatedBy' field to 'ClaimtypeData'
      const updatedClaimTypeData = {
        ...ClaimtypeData,
        CreatedBy: UserId,
      };

      // Call the API to save the updated 'ClaimtypeData'
      UpdateClaimTypes(updatedClaimTypeData)
        .then((response) => {
          if (response.status === 200) {
            showAlert('Claim Type Saved successfully!', 'success');
            props.onClaimTypeUpdate(updatedClaimTypeData); // Notify parent about the update
          } else {
            showAlert('Server problem', 'error');
          }
          // Handle the successful response if needed
          console.log(response.data);
          onClose(); // Close the modal after a successful save
        })
        .catch((error) => {
          // Handle the error if needed
          console.error(error);
        });
    }
  };

  // Alert msg state
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState<
    'success' | 'error' | 'warning'
  >('success');

  const showAlert = (message: string, severity: 'success' | 'error' | 'warning') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  if (!ClaimtypeData) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={alertOpen}
        autoHideDuration={8000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Box
        component={'form'}
        onSubmit={handleSubmit}
        style={{
          width: '500px',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
          marginBottom: '20px',
          overflowY: 'auto',
          maxHeight: '90vh',
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              justifyItems: 'center',
            }}
          >
            <Typography variant="h6" style={{ color: 'purple', fontWeight: 'bold', fontSize: '50px' }}>
              Update Claim Type
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="ClaimTypeId"
              label="Claim Type Id"
              name="ClaimTypeId"
              fullWidth
              value={ClaimtypeData.ClaimTypeId}
              InputProps={{ readOnly: true }}
              className="readonly-textfield"
            />
          </Grid>
          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <InputLabel>Enable/Disable:</InputLabel>
            <Switch
              checked={enable}
              onChange={() => setEnable(!enable)} // Toggle the 'enable' state directly
              color="primary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="ClaimType"
              label="Claim Type"
              name="ClaimType"
              fullWidth
              required
              value={ClaimtypeData.ClaimType}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="ClaimTypeDescription"
              label="Claim Type Description"
              name="ClaimTypeDescription"
              fullWidth
              multiline
              rows={3}
              required
              value={ClaimtypeData.ClaimTypeDescription}
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

export default UpdateClaimType;
