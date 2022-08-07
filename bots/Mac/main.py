
from MessageBot import MessageBot
from GroupBot import GroupBot
import sys

from AbstractBot import AbstractBot

def get_auth_info(auth_info_file_name):
    infos = []
    with open(auth_info_file_name, 'r') as auth_info:
        infos = auth_info.read().splitlines()
        infos = map(lambda el: el.split(' '), infos)
    return list(infos)

def scrape_with_auth(auth_info, chromedriver, message):
    for auth in auth_info:
        message_bot = MessageBot(auth[0], auth[1], chromedriver, message)
        message_bot.scrape()

    
if __name__ == "__main__":  
    try:
        chromedriver_path = "/Users/meneliknouvellon/Documents/HTML/Menesite/bots/Mac/chromedriverMac" #Menelik
        #chromedriver_path = "chromedriver.exe" #Rasan
        MESSAGE = """
Hi guys,
Are you looking for a lodging in a foreign country but don't have the option of visiting the place yourself ?

Link up with a trustworthy local to do the visit for you on the Scamna platform :

https://scamna-23958.web.app/
        """
        
        scrape_with_auth(get_auth_info("data/accounts.txt"), chromedriver_path, MESSAGE)
        print(MESSAGE)
    except IndexError:
        print("Missing arguments. Enter '[py/python3] main.py email password")
    except Exception as err:
        print(f"{type(err)}: err")
    

    