import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()
Email=os.getenv("email")
password=os.getenv("password")
hr_email=os.getenv("hr_email")


def send_logout_email():
    msg=EmailMessage()
    msg["Subject"]="Logout Update"
    msg["From"]=Email
    msg["To"]=hr_email
    msg.set_content(f"""
Dear HR Team,

I am writing to confirm my attendance for Today 
Emp Id: CIN-73880
Logout Time: {datetime.now().strftime("%I:%M %p")}



Regards,
Srikanth Pandaraboina 
Phone: +91 8340032723
Email: srikanthpandaraboina38@gmail.com
""")
    try:
        with smtplib.SMTP('smtp.gmail.com',587) as server:
            server.starttls()
            server.login(Email,password)
            server.send_message(msg)
        print("Logout email sent succesfully")
    except Exception as e:
        print("Error",e)
send_logout_email()
