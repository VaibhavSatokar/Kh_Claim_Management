import React, { useEffect, useState } from "react";
import { GetNewClaimApplications } from "../../service/cmsservices";
import { Paper, Typography, IconButton, Divider, Modal, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveStatus from "./UpdateClaimStatus";


export interface IUpdateClaimStatusProp {}

export default function NewClaimApplications(props: IUpdateClaimStatusProp) {
  // State to store the list of claim status
  const [claimstatus, setClaimStatus] = useState<any>([]);

  // State to control the visibility of the edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // State to store the selected Claim  ID to be edited
  const [selectClaimStatusId, setSelectClaimStatusIs] = useState<number>();

  // Handler for clicking the edit icon in a leave type row
  const handleEditIconClick = (ClaimStatusId: number) => {
    setSelectClaimStatusIs(ClaimStatusId);
    setIsEditModalOpen(true);
  };

    // Define a function to get the status label
function getStatusLabel(claimStatus : string) {
    if (claimStatus === 'A') {
      return 'Approved';
    } else if (claimStatus === 'R') {
      return 'Rejected';
    } else if (claimStatus === 'N') {
      return 'New';
    }
    // You can handle other cases or return a default label here
    return 'Unknown';
  }

  // Fetch all leave types when the component mounts
  React.useEffect(() => {
    GetNewClaimApplications()
      .then((response) => {
        // Handle the successful response
        setClaimStatus(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, []);


  const handleClaimStatusUpdate = () => {
    GetNewClaimApplications()
      .then((response) => {
        // Handle the successful response
        setClaimStatus(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };

  return (
    <React.Fragment>
      {/* Paper component to display leave type details */}
      <Paper elevation={3} style={{ width: "100%", padding: "8px" }}>
        {/* Table Header */}
        <div style={{ display: "flex", padding: "8px" }}>
          <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Edit</Typography>
          </div>
          {/* <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
            <Typography variant="h6">Leave Status Id</Typography>
          </div> */}
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Name</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Title</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Description</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Expenses Incurred On</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Claim Amount</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Claim Status</Typography>
          </div>
        </div>
        {/* Divider between header and Claim  rows */}
        <Divider />
        {/* Iterate over Claims and display them in table rows */}
        {claimstatus.map((status: any) => (
          <div key={status.ClaimStatusId} style={{ display: "flex", padding: "8px", borderBottom: "1px solid black" }}>
            <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
              <IconButton
                color="primary"
                aria-label="Edit"
                onClick={() => handleEditIconClick(status.ClaimStatusId)}
              >
                <EditIcon />
              </IconButton>
            </div>
            {/* <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{status.ClaimStatusId}</Typography>
            </div> */}
            <div style={{ flex: 2, borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{status.FirstName} {status.LastName}</Typography>
            </div>
            <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{status.Title}</Typography>
            </div>
            <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{status.Description}</Typography>
            </div>
            <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{status.InvoiceDate}</Typography>
            </div>
            <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{status.ClaimAmount}</Typography>
            </div>
            <div style={{ flex: 2, textAlign: "center",  borderRight: "1px solid black", padding: "4px" }}>
            <Typography variant="body1">{getStatusLabel(status.ClaimStatus)}</Typography>
          </div>
          </div>
        ))}
      </Paper>
      {/* Modal for updating the leave type */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 0,
          }}
          >
          {/* Render UpdateLeaveType component inside the modal */}
          {selectClaimStatusId && (
            <SaveStatus
              ClaimStatusId={selectClaimStatusId}
              onClose={() => setIsEditModalOpen(false)}
              onClaimStatusUpdate={handleClaimStatusUpdate}
            />
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
}
