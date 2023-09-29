import React, { useEffect, useState } from "react";
import { GetClaimStatusHistory } from "../../service/cmsservices";
// import { GetClaimStatusHistory } from "../../services/lmsservices";
import { Paper, Typography, Divider } from "@mui/material";

export default function ClaimHistory() {
  const [claimstatus, setClaimStatus] = useState<any>([]);

  useEffect(() => {
    GetClaimStatusHistory()
      .then((response) => {
        setClaimStatus(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Define a function to get the status label
  function getStatusLabel(claimStatus: string) {
    if (claimStatus === 'A') {
      return 'Approved';
    } else if (claimStatus === 'R') {
      return 'Rejected';
    } else if (claimStatus === 'N') {
      return 'New';
    }
    // To handle other cases or return a default label here
    return 'Unknown';
  }

  return (
    <Paper elevation={3} style={{ width: "100%", padding: "8px" }}>
      <div style={{ display: "flex", padding: "8px" }}>
        <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
          <Typography variant="h6">Name</Typography>
        </div>
        {/* <div style={{ flex: 1, borderRight: "1px solid black", padding: "4px" }}>
          <Typography variant="h6">Last Name</Typography>
        </div> */}
        <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
          <Typography variant="h6">Title</Typography>
        </div>
        <div style={{ flex: 3, textAlign: "center", borderRight: "1px solid black", padding: "4px", backgroundColor: "lightblue" }}>
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
          <Typography variant="h6">Approver Reason</Typography>
        </div>
      </div>
      <Divider />
      {claimstatus.map((status: any, index: number) => (
        <div key={index} style={{ display: "flex", padding: "8px", borderBottom: "1px solid black" }}>
          <div style={{ flex: 2, borderRight: "1px solid black", padding: "4px" }}>
            <Typography variant="body1">{status.FirstName} {status.LastName}</Typography>
          </div>
          {/* <div style={{ flex: 1, borderRight: "1px solid black", padding: "4px" }}>
            <Typography variant="body1">{status.LastName}</Typography>
          </div> */}
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
            <Typography variant="body1">{status.Title}</Typography>
          </div>
          <div style={{ flex: 3, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
            <Typography variant="body1">{status.Description}</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
            <Typography variant="body1">{status.ClaimType}</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
            <Typography variant="body1">{status.Project}</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
            <Typography variant="body1">{status.InvoiceDate}</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
            <Typography variant="body1">{status.ClaimAmount}</Typography>
          </div>
          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
            <Typography variant="body1">
              {status.ClaimStatus === "R" ? (
                <strong style={{ color: "red" }}>Rejected</strong>
              ) : status.ClaimStatus === "A" ? (
                <strong style={{ color: "green" }}>Approved</strong>
              ) : (
                getStatusLabel(status.ClaimStatus)
              )}
            </Typography>
          </div>

          <div style={{ flex: 2, textAlign: "center", borderRight: "1px solid black", padding: "4px" }}>
            <Typography variant="body1">{status.Reason}</Typography>
          </div>
        </div>
      ))}
    </Paper>
  );
}
