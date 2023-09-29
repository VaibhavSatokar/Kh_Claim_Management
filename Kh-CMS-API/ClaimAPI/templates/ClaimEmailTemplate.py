html_template = """
<!DOCTYPE html>
<html>
<head>
    <style>
        .header {{
            background-color: #f2f2f2;
            padding: 20px;
            text-align: center;
        }}
        .footer {{
            background-color: #f2f2f2;
            padding: 10px;
            text-align: center;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
        }}
        th, td {{
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }}
        th {{
            background-color: #f2f2f2;
        }}
        tr:hover {{
            background-color: #f5f5f5;
        }}
    </style>
</head>
<body>
    <div>
        <p>Dear <b>{Approver}</b>,</p>
        <p>Please review and complete the approval process for the claim submitted by <b>{Submitter}</b>.</p>
    </div>
    <div class="header">
        <h5>Claim Entries</h5>
    </div>
    <table>
        <thead>
            <tr>
                <th>Claim Title</th>
                <th>Claim Desc.</th>
                <th>Claim Type</th>
                <th>Project Type</th>
                <th>incurred On</th>
                <th>Claim Amt.(Rs)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{claimTitle}</td>
                <td>{claimDesc}</td>
                <td>{claimType}</td>
                <td>{projectType}</td>
                <td>{invoiceDate}</td>
                <td>{claimAmt}</td>
            </tr>
        </tbody>
    </table>
    <div class="footer">
        <p>Kh Infinite Possibilities Private Limited</p>
    </div>
    <div>
      <div>Best Regards,</div>
      <div>IDT - PM Team</div>
    </div>
</body>
</html>
"""
