import React, { useEffect, useState } from "react";
import { GetEntireClaimTypes } from "../../service/cmsservices";
import { Paper, Typography, IconButton, Divider, Modal, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import UpdateClaimType from "./UpdateClaimtype";
import { IClaimType } from "../../types/cmstypes";

export interface IUpdateClaimProp {}

export default function EntireClaimTypes(props: IUpdateClaimProp) {
  // State to store the list of Claim types
  const [claimtype, setClaimtypes] = useState<IClaimType[]>([]);

  // State to control the visibility of the edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // State to store the selected Claim type Id to be edited
  const [selectClaimtypeId, setSelectClaimTypeId] = useState<string>("");

  // Handler for clicking the edit icon in a Claim  type row
  const handleEditIconClick = (ClaimTypeId: any) => {
    setSelectClaimTypeId(ClaimTypeId);
    setIsEditModalOpen(true);
    console.log(ClaimTypeId);
};

const handleClaimTypeUpdate = (updatedClaimtype: IClaimType) => {
  const updatedClaimTypes = claimtype.map((claimtype) =>
    claimtype.ClaimTypeId === updatedClaimtype.ClaimTypeId ? updatedClaimtype : claimtype
  );
  setClaimtypes(updatedClaimTypes);
};
  

  // Fetch all Claim types when the component mounts
  React.useEffect(() => {
    GetEntireClaimTypes()
      .then((response) => {
        // Handle the successful response
        setClaimtypes(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, []);

  return (
    <React.Fragment>
      {/* Paper component to display leave type details */}
      <Paper elevation={3} style={{ width: "100%", padding: "8px" }}>
        {/* Table Header */}
        <div style={{ display: "flex", padding: "8px" }}>
          <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Edit</Typography>
          </div>
          <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Claim Type</Typography>
          </div>
          <div style={{ flex: 4, borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Claim Type Description</Typography>
          </div>
          <div style={{ flex: 1, borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
            <Typography variant="h6">Enable/Disable</Typography>
          </div>
        </div>
        {/* Divider between header and leave type rows */}
        <Divider />
        {/* Iterate over leave types and display them in table rows */}
        {claimtype.map((claimtype) => (
          <div key={claimtype.ClaimTypeId} style={{ display: "flex", padding: "8px", borderBottom: "1px solid black" }}>
            <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
              <IconButton
                color="primary"
                aria-label="Edit"
                onClick={() => handleEditIconClick(claimtype.ClaimTypeId)}
              >
                <EditIcon />
              </IconButton>
            </div>
            <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{claimtype.ClaimType}</Typography>
            </div>
            <div style={{ flex: 4, borderRight: "1px solid black", padding: "4px" }}>
              <Typography variant="body1">{claimtype.ClaimTypeDescription}</Typography>
            </div>
            <div style={{ flex: 1, borderRight: "1px solid black", padding: "4px" }}>
      {/* Conditionally render "True" or "False" based on the value of Enable */}
      <Typography variant="body1" style={{ color: claimtype.Enable !== 1 ? "red" : "inherit" }} >{claimtype.Enable === 1 ? "Enabled" : "Disabled"}</Typography>
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
          {selectClaimtypeId && (
            <UpdateClaimType
              ClaimTypeId={selectClaimtypeId}
              onClose={() => setIsEditModalOpen(false)}
              onClaimTypeUpdate={handleClaimTypeUpdate} // Pass the callback function
            />
          )}
        </Box>
      </Modal>
    </React.Fragment>
  );
}
