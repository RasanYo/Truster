from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
import time, random, csv

# Username and password of your instagram account:
my_username = 'rasanhy@gmail.com'
my_password = 'procf888'

# Instagram username list for DM:
usernames = ['user1', 'user2', 'user3']

# Messages:
messages = ['Hey! Pls follow my page', 'Hey, how you doing?', 'Hey']

# Delay time between messages in sec:
between_messages = 2000

browser = webdriver.Chrome('chromedriver')


def write_to(file, text):
    file.write(text + "\n")
    print("     Requested " + text)


def sleep(t):
    time.sleep(random.randrange(t, 2 * t))


# Authorization:
def auth():
    try:
        browser.get('https://www.facebook.com/')
        # sleep(1200)
        sleep(1)

        # Press ENTER to access page behind cookie-popup
        browser.find_element(By.XPATH, 'html').send_keys(Keys.ENTER)

        input_username = browser.find_element(By.ID, 'email')
        input_password = browser.find_element(By.ID, 'pass')

        input_username.send_keys(my_username)
        sleep(1)
        input_password.send_keys(my_password)
        sleep(1)
        input_password.send_keys(Keys.ENTER)

        print("Logged in")
        print("Loading facebook page...")
        time.sleep(5)


    except Exception as err:
        print(err)
        browser.quit()


def request_group():
    try:
        # Enter in Search bar "milan apartments"
        # time.sleep(1200)
        browser.get('https://www.facebook.com/search/groups/?q=apartments%20milan')
        sleep(2)
        print("Searched for milan apartments")

        # Click on page to ignore popup
        browser.find_element(By.XPATH, '//*[@id="facebook"]/body/div[4]/div[1]/div/div[2]').click()
        print("Clicked")
        sleep(1)
    except Exception as err:
        print(f'{type(err)}: {err}')

    # Open csv file with group-names
    f = open('group_list.txt', 'w')
    i = 1
    while True:

        try:
            # Write group name in csv file
            group_name = browser.find_element(By.XPATH,
                                              f'/html/body/div[1]/div/div[1]/div/div[3]/div/div/div/div[1]/div[1]/div[2]/div/div/div/div/div/div[{i}]/div/div/div/div/div/div/div[2]/div[1]/div/div/div[1]/span/div/a').text
            write_to(f, group_name)

            # Click on 'Join'
            #browser.find_element(By.XPATH, f'/html/body/div[1]/div/div[1]/div/div[3]/div/div/div/div[1]/div[1]/div[2]/div/div/div/div/div/div[1]/div/div/div/div[1]/div[2]/div/div[{i}]/div/div/div[2]/div[2]/div/div/div/div/div').click()
            sleep(2)


        except UnicodeEncodeError:
            print("Couldn't recognize characters in name. Skipping group")
            pass
        except NoSuchElementException:
            browser.execute_script("window.scrollBy(0,1000);")
            print(f"Scrolled down")
            print("Loading groups...")
            sleep(3)
            pass

        except Exception as err:
            print(f'{type(err)}: {err}')
            f.close()
            return

        i = i + 1


auth()
request_group()
