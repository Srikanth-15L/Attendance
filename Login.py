import smtplib
from email.message import EmailMessage
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

Email=os.getenv("email")
Password=os.getenv("password")
Hr_email=os.getenv("hr_email")


def send_login_email():
    msg=EmailMessage()
    msg["Subject"]="Login update"
    msg["From"]=Email
    msg["To"]=Hr_email
    msg.set_content(f"""
     Dear HR Team,

I am writing to confirm my attendance for Today 
Emp Id: CIN-73880
Login Time: {datetime.now().strftime("%I:%M %p")}



Regards,
Srikanth Pandaraboina 
Phone: +91 8340032723
Email: srikanthpandaraboina38@gmail.com
""")
    try:
        with smtplib.SMTP('smtp.gmail.com',587) as server:
            server.starttls()
            server.login(Email,Password)
            server.send_message(msg)
        print("Login Email sent succesfully")
    except Exception as e:
        print("Error",e)
send_login_email()
