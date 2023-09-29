import React, { useEffect, useState } from "react";
import { GetUserNewAndRejectedClaims } from "../../service/cmsservices";
import { Paper, Typography, IconButton, Divider, Modal, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { UpdateClaimApplication } from "../../service/cmsservices";
import { IClaimApplicationStatus } from "../../types/cmstypes";
import { useAppSelector } from "../../app/hooks";
import UpdateClaimApplications from "./UpdateClaimApplication";



export interface IUpdateAppFeatureProp { }

export default function NewAndRejectedClaims(props: IUpdateAppFeatureProp) {
  // State to store the list of feature
  const [claim, setClaim] = useState<IClaimApplicationStatus[]>([]);
  const User = useAppSelector((state) => state.user.UserData)
  const UserId = User?.UserId

  // State to control the visibility of the edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // State to store the selected claimApplication Id to be edited
  const [selectClaimApplicationId, setSelectClaimApplicationId] = useState<string>("");

  // Handler for clicking the edit icon in a role
  const handleEditIconClick = (ClaimApplicationId: any) => {
    setSelectClaimApplicationId(ClaimApplicationId);
    setIsEditModalOpen(true);
    console.log(ClaimApplicationId);
  };
  const handleClaimUpdate = (updatedclaim: IClaimApplicationStatus) => {
    const updatedclaims = claim.map((appfeature) =>
      appfeature.ClaimApplicationId === updatedclaim.ClaimApplicationId ? updatedclaim : appfeature
    );
    setClaim(updatedclaims);
  };

  // Define a function to get the status label
  function getStatusLabel(claimStatus: string) {
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


  // Fetch all Claims when the component mounts
  useEffect(() => {
    if (UserId) {
      GetUserNewAndRejectedClaims(UserId)
        .then((response) => {
          setClaim(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [UserId]);

  return (
    <React.Fragment>
      {/* Paper component to display leave type details */}
      <Paper elevation={3} style={{ width: "100%", padding: "8px" }}>
        {/* Table Header */}
        <div style={{ display: "flex", padding: "8px" }}>
          <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Edit</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Claim Application Id</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Title</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Description</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Claim Type</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Project Type</Typography>
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
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Reason</Typography>
          </div>
        </div>
        {/* Divider between header and leave type rows */}
        <Divider />
        {/* Iterate over leave types and display them in table rows */}
        {claim.map((feature) => (
          <div key={feature.ClaimApplicationId} style={{ display: "flex", padding: "8px", borderBottom: "1px solid black" }}>
            <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
              <IconButton
                color="primary"
                aria-label="Edit"
                onClick={() => handleEditIconClick(feature.ClaimApplicationId)}
              >
                <EditIcon />
              </IconButton>
            </div>
            <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{feature.ClaimApplicationId}</Typography>
            </div>
            <div style={{ flex: 2, borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{feature.Title}</Typography>
            </div>
            <div style={{ flex: 2, borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{feature.Description}</Typography>
            </div>
            <div style={{ flex: 2, borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{feature.ClaimType}</Typography>
            </div>
            <div style={{ flex: 2, borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{feature.Project}</Typography>
            </div>
            <div style={{ flex: 2, borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{feature.InvoiceDate}</Typography>
            </div>
            <div style={{ flex: 2, borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{feature.ClaimAmount}</Typography>
            </div>
            <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">
                {feature.ClaimStatus === "R" ? (
                  <strong style={{ color: "red" }}>Rejected</strong>
                ) : feature.ClaimStatus === "A" ? (
                  <strong style={{ color: "green" }}>Approved</strong>
                ) : (
                  getStatusLabel(feature.ClaimStatus)
                )}
              </Typography>
            </div>
            <div style={{ flex: 2, borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{feature.Reason}</Typography>
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
          {/* Render UpdateUser component inside the modal */}
          {selectClaimApplicationId && (
            <UpdateClaimApplications
              ClaimApplicationId={selectClaimApplicationId}
              onClose={() => setIsEditModalOpen(false)}
              onClaimUpdate={handleClaimUpdate} // Pass the callback function
            />
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
}



