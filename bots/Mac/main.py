
from MessageBot import MessageBot
from GroupBot import GroupBot
import sys

if __name__ == "__main__":
    try:
        my_username = sys.argv[1]
        my_password = sys.argv[2]
        print(f'username: {my_username} - password: {my_password}')
        # group_bot = GroupBot(my_username, my_password, "chromedriver.exe")
        # group_bot.scrape()
        # message_bot = MessageBot(my_username, my_password, "chromedriver.exe", "Test")
        # message_bot.scrape()
    except IndexError:
        print("Missing arguments. Enter '[py/python3] main.py email password")
    except Exception as err:
        print(f"{type(err)}: err")
    

    