
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

    
if __name__ == "__main__":
    try:
        my_username = sys.argv[1]
        my_password = sys.argv[2]
        print(f'username: {my_username} - password: {my_password}')
        group_bot = GroupBot(my_username, my_password, "/Users/meneliknouvellon/Documents/HTML/Menesite/bots/Mac/chromedriverMac") #Menelik
        #group_bot = GroupBot(my_username, my_password, "chromedriver.exe") #Rasan
        group_bot.scrape()
        # message_bot = MessageBot(my_username, my_password, "chromedriver.exe", "Test")
        # message_bot.scrape()
    except IndexError:
        print("Missing arguments. Enter '[py/python3] main.py email password")
    except Exception as err:
        print(f"{type(err)}: err")
    

    