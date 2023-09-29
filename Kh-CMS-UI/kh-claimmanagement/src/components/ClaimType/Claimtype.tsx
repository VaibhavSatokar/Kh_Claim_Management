import React, { useState, useRef } from 'react';
import { TextField, Button, Grid, Typography, Snackbar, Alert  } from '@mui/material';
import { SaveClaimType } from '../../service/cmsservices';
import { useAppSelector } from '../../app/hooks';

export function ClaimType() {
  const User = useAppSelector((state) => state.user.UserData);
  const UserId = User?.UserId;
  
  const formRef = useRef<HTMLFormElement | null>(null); // Initialize with null
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const passedData = {
      ClaimTypeId: '',
      ClaimType: data.get('ClaimType'),
      ClaimTypeDescription: data.get('ClaimTypeDescription'),
      CreatedBy: UserId,
     
    };

    SaveClaimType(passedData)
      .then((response) => {
        if (response.status === 200) {
          showAlert("Claim Type Saved successfully!", "success");
          // Reset the form after successful submission
         formRef.current?.reset();
        } else {
          showAlert("Server problem", "error");
        }
        // Handle the successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  
  // Alert msg state
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertSeverity, setAlertSeverity] = React.useState<"success" | "error" | "warning">("success");

  const showAlert = (
    message: string,
    severity: "success" | "error" | "warning"
  ) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

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
      <form
        ref={formRef} // Add the ref to the form
        onSubmit={handleSubmit}
        style={{ width: '500px', justifyContent: "center", alignItems: "center", margin: "auto", marginBottom: '20px' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ alignItems: "center", justifyContent: 'center', display: 'flex', justifyItems: 'center' }}>
            <Typography variant="h6" style={{ color: 'purple', fontWeight: "bold", fontSize: "50px" }}>Add New Claim Type</Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id='ClaimType'
              label="Claim Type"
              name="ClaimType"
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={30}>
            <TextField
              id='ClaimTypeDescription'
              label="Claim Type Description"
              name="ClaimTypeDescription"
              rows={5}
              fullWidth
              required
              multiline
            />
          </Grid>
          
          <Grid item style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%" }}>
            <Grid>
              <Button variant="contained" color="secondary" type="submit">
                ADD
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )
}

