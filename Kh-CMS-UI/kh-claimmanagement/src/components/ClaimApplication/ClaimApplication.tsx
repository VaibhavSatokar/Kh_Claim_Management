import React, { useState, useEffect, ChangeEvent } from 'react';
import { TextField, Button, Grid, Typography, Box, Snackbar, Alert, FormControl, Select, MenuItem, SelectChangeEvent, InputLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { format } from 'date-fns';
import { addClaimApplication, GetAllClaimTypes } from '../../service/cmsservices';
import { useAppSelector } from '../../app/hooks';
import { IClaimType } from '../../types/cmstypes';

export function SaveClaimApplication() {
    const [currentDate, setCurrentDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
    const [attachment, setAttachment] = useState('');
    const [claimTypes, setClaimTypes] = useState<IClaimType[]>([]); // Define the type for Claimtype
    const [selectedClaimTypeId, setSelectedClaimTypeId] = useState('');
    const [selectedProject, setSelectedProject] = useState<'Internal' | 'Customer' | ''>('Internal');

    // State for form input values
    const [formValues, setFormValues] = useState({
        Title: '',
        Description: '',
        ClaimTypeId: '',
        InvoiceDate: currentDate,
        ClaimAmount: '',
        Attachment: '',
        ClaimType: '',
    });

    // Function to handle form input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // Function to clear form data
    const clearForm = () => {
        setFormValues({
            Title: '',
            Description: '',
            ClaimTypeId: '',
            InvoiceDate: currentDate,
            ClaimAmount: '',
            Attachment: '',
            ClaimType: '',
        });
        // setSelectedProject(''); // Clear selected project as well
    };

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

    const User = useAppSelector((state) => state.user.UserData);
    const UserId = User?.UserId;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedProject) {
            showAlert("Select Project Type!", "warning");
            return; // Prevent form submission
        }
        const data = new FormData(event.currentTarget);
        const passedData = {
            ClaimApplicationId: '', // Set ClaimApplicationId to null
            UserId: UserId,
            Title: data.get('Title'),
            Description: data.get('Description'),
            ClaimTypeId: data.get('ClaimTypeId'),
            Project: selectedProject,
            InvoiceDate: data.get('InvoiceDate'),
            ClaimAmount: data.get('ClaimAmount'),
            CreatedBy: UserId,
        };

        addClaimApplication(passedData)
            .then((response) => {
                if (response.status === 200) {
                    showAlert("Claim Application Saved successfully!", "success");
                    clearForm(); // Clear the form data
                    setSelectedClaimTypeId(''); 
                    setSelectedProject('Internal');
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

    useEffect(() => {
        GetAllClaimTypes()
            .then((response) => {
                setClaimTypes(response.data); // Update the claimTypes state
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Function to handle changes in the "Invoice" date field
    const handleInvoiceDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedDate = new Date(event.target.value);
        const currentDate = new Date();

        // Check if the selected date is in the future
        if (selectedDate > currentDate) {
            showAlert("Expenses occurred on date cannot be in the future.", "warning");
        } else {
            setFormValues({ ...formValues, InvoiceDate: event.target.value });
        }
    };

    const handleClaimType = (event: SelectChangeEvent) => {
        setSelectedClaimTypeId(event.target.value);
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

            <Box
                component={'form'}
                onSubmit={handleSubmit}
                style={{
                    width: '500px',
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                    marginBottom: '20px'
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ alignItems: "center", justifyContent: 'center', display: 'flex', justifyItems: 'center' }}>
                        <Typography variant="h1" style={{ color: 'purple', fontWeight: "bold", fontSize: "50px" }}>Claim Application</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='Title'
                            label="Title"
                            name="Title"
                            fullWidth
                            required
                            value={formValues.Title}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='Description'
                            label="Description"
                            name="Description"
                            fullWidth
                            multiline
                            rows={3}
                            required
                            value={formValues.Description}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth required>
                            <InputLabel id="claim-type-label">Claim Type</InputLabel>
                            <Select
                                labelId="claim-type-label"
                                id="ClaimTypeId"
                                name="ClaimTypeId"
                                value={selectedClaimTypeId}
                                onChange={handleClaimType}
                                label="Claim Type"
                            >
                                {claimTypes.map((claimtype) => (
                                    <MenuItem key={claimtype.ClaimTypeId} value={claimtype.ClaimTypeId}>
                                        {claimtype.ClaimType}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <TextField
                            id='InvoiceDate'
                            label="Expenses Incurred On"
                            name="InvoiceDate"
                            type='Date'
                            value={formValues.InvoiceDate}
                            onChange={handleInvoiceDateChange}
                            // onChange={(event) => setFormValues({ ...formValues, InvoiceDate: event.target.value })}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id='ClaimAmount'
                            label="Claim Amount"
                            name="ClaimAmount"
                            fullWidth
                            required
                            value={formValues.ClaimAmount}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="Attachment"
                            name="Attachment"
                            type="file"
                            value={formValues.Attachment}
                            onChange={(event) => setAttachment(event.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item style={{ display: "flex", justifyContent: "space-around", alignItems: "center", width: "100%" }}>
                        <Grid>
                            <Button variant="contained" color="secondary" type="submit">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}
