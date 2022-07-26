from asyncore import read
from pyparsing import PositionToken
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


options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
browser = webdriver.Chrome('chromedriver.exe', options=options)

# Message that we want to post
msg = "Test"



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

def check_exists_by_css(css):
    try:
        browser.find_element(By.CSS_SELECTOR, css)
    except NoSuchElementException:
        return False
    return True

def wait_until_shows_css(css):
    while not check_exists_by_css(css):
        time.sleep(0.5)
    time.sleep(0.2)

def wait_until_shows(xpath):
    while not check_exists_by_xpath(xpath):
        time.sleep(0.5)
    time.sleep(0.2)


def empty_click():
    browser.find_element(By.XPATH, 'html').click()
    sleep(1)


def click_on(wait=False):
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
        
def post_message(message, url):
    try:
        # Opening group page
        print(f"Loading {url}...")
        browser.get(url)
        time.sleep(1)
        empty_click()
        
        
        # Opening post form
        post = browser.find_element(By.XPATH, "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div/div[1]/div[1]/div[4]/div/div/div/div/div/div[1]/div[1]/div/div/div/div[1]/div")
        post.click()
        time.sleep(1)
        
        # Locate message area and write message
        text_area = browser.find_element(By.XPATH, "/html/body/div[1]/div/div[1]/div/div[4]/div/div/div[1]/div/div[2]/div/div/div/div/div[1]/form/div/div[1]/div/div/div[1]/div/div[2]/div[1]/div[1]/div[1]/div/div/div/div/div/div/div/div")
        text_area.send_keys(message)
        
        # Locate 'Post' button and press it
        post_button = browser.find_element(By.XPATH, "//span[text()='Post']")
        post_button.click()
        print(f"Posted message to {url}\n")
    except Exception as err:
        print(f'{type(err)}: {err}')
        
auth()
for group in read_file("group_list.txt"):
    post_message(msg, group)
