status_html_template = """
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
        <p>Dear <b>{FirstName}</b>,</p>
    </div>
    <div class="header">
        <h5>Claim Entry Status</h5>
    </div>
    <table>
        <thead>
            <tr>
                <td>Title</td>
                <td>Type</td>
                <td>Project Type</td>
                <td>Incurred on</td>
                <td>Amount (Rs.)</td>
                <td>Status</td>
                <td>Reason</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{claimTitle}</td>
                <td>{claimType}</td>
                <td>{projectType}</td>
                <td>{invoiceDate}</td>
                <td>{claimAmt}</td>
                <td style="color: {status_color}">{status_text}</td>
                <td>{reason}</td>
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