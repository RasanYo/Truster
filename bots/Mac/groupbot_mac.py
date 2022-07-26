from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException, ElementClickInterceptedException
import time, random, csv

# Username and password of your instagram account:
my_username = 'rasanhy@gmail.com'
my_password = 'procf888'


browser = webdriver.Chrome('chromedriver.exe')



def write_to(file, text):
    file.write(text + "\n")
    print("     Requested " + text)


def sleep(t):
    time.sleep(random.randrange(t, 2 * t))


def check_exists_by_xpath(xpath):
    try:
        browser.find_element(By.XPATH, xpath)
    except NoSuchElementException:
        return False
    return True


def wait_until_shows(xpath):
    while not check_exists_by_xpath(xpath):
        time.sleep(0.5)
    time.sleep(0.2)


def empty_click():
    browser.find_element(By.XPATH, 'html').click()
    sleep(1)


def click_on_xpath(xpath, wait=False):
    if wait: wait_until_shows(xpath)
    browser.find_element(By.XPATH, xpath).click()

def check_correct_url(url):
    if browser.current_url != url:
        print("Left group page. Redirecting...")
        browser.get(url)
        sleep(2)
        empty_click()
        sleep(2)

        return False
    return True

def read_file(file):
    cities = []
    try:
        f = open(file, "r")
        cities =  f.read().splitlines()
        f.close()
    except Exception as err:
        print(f'{type(err)}: {err}')
    finally:
        return cities
     


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
        input_password.send_keys(my_password)
        input_password.send_keys(Keys.ENTER)

        print("Logged in")
        print("Loading facebook page...")
        time.sleep(2)


    except Exception as err:
        print(err)
        browser.quit()


def request_group(city,f):
    url = f'https://www.facebook.com/search/groups/?q=apartments%20{city}'
    try:
        # Enter in Search bar "milan apartments"
        # time.sleep(1200)
        browser.get(url)
        print(f"Searched for 'apartments {city}'")

        # Click on page to ignore popup
        print("Loading...")
        click_on_xpath('/html/body/div[2]', wait=True)
        print("Clicked")
    except Exception as err:
        print(f'{type(err)}: {err}')

    

    empty_click()


    print("Scrolling...")
    for i in range(3):
        browser.execute_script("window.scrollBy(0,1000);")
        time.sleep(0.5)

    
    print("Looking for join buttons")
    join_buttons = browser.find_elements(By.XPATH, "//span[text()='Join']")
    i = 1
    for button in join_buttons:
        try:
            group_name = browser.find_element(By.XPATH,
                                              f'/html/body/div[1]/div/div[1]/div/div[3]/div/div/div/div[1]/div[1]/div[2]/div/div/div/div/div/div[{i}]/div/div/div/div/div/div/div[2]/div[1]/div/div/div[1]/span/div/a').text
            group_link = browser.find_element(By.LINK_TEXT, group_name).get_attribute('href')

            button.click()
            time.sleep(1)   #Wait 1 sec to wait for potential popup window
            empty_click()   #Empty click event for ignoring popup window
            print(f"Adding link of '{group_name}' to txt file: {group_link}")
            write_to(f, group_link)
        except UnicodeEncodeError:
            print("Couldn't recognize characters in name. Skipping group")
        except ElementClickInterceptedException:
            empty_click()
            time.sleep(0.5)
        except Exception as err:
            print(f'{type(err)}: {err}')
            return
        
        finally:
            i = i + 1

    return
    # while True:

    #     try:
            

    #         if check_exists_by_xpath(NOT_NOW_XPATH):
    #             print("Questions popped up. Attempting to click on 'Not Now'")
    #             click_on_xpath(NOT_NOW_XPATH, wait=True)
    #             print("Clicked")
    #             sleep(2)

    #         check_correct_url(url)



    #     except UnicodeEncodeError:
    #         print("Couldn't recognize characters in name. Skipping group")
    #     except NoSuchElementException as err:
    #         if looking_at_button:
    #             print("Couldn't find 'Join' button")
    #             print(f'{type(err)}: {err}')
    #             f.close()
    #             return
    #         check_correct_url(url)
    #         browser.execute_script("window.scrollBy(0,1000);")
    #         print(f"Scrolled down")
    #         print("Loading groups...")
    #         empty_click()
    #         sleep(3)

    #     except Exception as err:
    #         print(f'{type(err)}: {err}')
    #         f.close()
    #         return

    #     finally:
    #         i = i + 1

        
auth()
# Open file with group-names
print("Opening group_list.txt...")
f = open('group_list.txt', 'a')
print("Reading cities.txt...")
cities = read_file("cities.txt")
for city in cities:

    request_group(city,f)
    
f.close()
browser.close()
