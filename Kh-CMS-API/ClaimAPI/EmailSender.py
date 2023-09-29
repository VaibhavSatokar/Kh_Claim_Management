import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.conf import settings

class EmailSender:
    def __init__(self):
        mail_server_config = getattr(settings, 'MAIL_SERVERS', {}).get('Kh_Gmail_Smtp', {})
        self.smtp_server = mail_server_config.get('HOST', '')
        self.smtp_port = mail_server_config.get('PORT', '')
        self.sender_email = mail_server_config.get('EMAIL', '')
        self.sender_password = mail_server_config.get('PASSWORD', '')
        
    def send_email(self, recipient_emails, subject, body):
        msg = MIMEMultipart()
        msg['From'] = self.sender_email
        msg['To'] = ", ".join(recipient_emails)  # Join recipient emails into a comma-separated string
        msg['Subject'] = subject

        msg.attach(MIMEText(body, 'html'))

        try:
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.sendmail(self.sender_email, recipient_emails, msg.as_string())
        except smtplib.SMTPAuthenticationError:
            return False, "SMTP Authentication Error : Failed to login to the SMTP server. Check your email and password."
        except smtplib.SMTPException as e:
            return False, f"SMTP Exception: An error occurred while sending the email. {e}"
        except Exception as e:
            print("Error: ",e)
            return False, f"An unexpected error occurred: {e}"


            
# table_rows = generate_table_rows(time_entries)
# # Complete HTML template with dynamic table rows
# complete_html_template = html_template.format(table_rows=table_rows)
                
# # Email sending configuration using environment variables
# smtp_server = 'smtp.gmail.com'
# smtp_port = 587  # Replace with your SMTP port (e.g., 587 for TLS)
# sender_email = os.environ.get('SENDER_EMAIL')  # Access sender email from environment variable
# sender_password = os.environ.get('SENDER_PASSWORD')  # Access sender password from environment variable
# recipient_emails = ['abc@gmail.com', 'xyz@gmail.com']  # Add more recipient emails as needed
# email_subject = 'Project Time Entry Status'

# # Create an EmailSender instance
# email_sender = EmailSender(smtp_server, smtp_port, sender_email, sender_password)

# # Send the email to multiple recipients with the complete HTML content
# email_sender.send_email(recipient_emails, email_subject, complete_html_template)            