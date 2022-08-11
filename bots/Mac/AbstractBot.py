from abc import ABC, abstractmethod
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
import time, random

# Basic Bot architecture
class AbstractBot(ABC):
    
    
    def __init__(self, my_username, my_password, web_driver):
        self.my_username = my_username
        self.my_password = my_password
        options = webdriver.ChromeOptions()
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        options.add_argument("--disable-infobars")
        options.add_experimental_option("prefs", { \
            "profile.default_content_setting_values.media_stream_mic": 2,     # 1:allow, 2:block 
            "profile.default_content_setting_values.media_stream_camera": 2,  # 1:allow, 2:block 
            "profile.default_content_setting_values.geolocation": 2,          # 1:allow, 2:block 
            "profile.default_content_setting_values.notifications": 2         # 1:allow, 2:block 
        })
        self.browser = webdriver.Chrome(web_driver, options=options)
        
    def write_json(self, file_name, data, write_mode='a'):
        with open(file_name, write_mode) as f:
            json.dump(data, f, indent=4)
    
    def read_json(self, file_name):
        with open(file_name, 'r') as f:
            data = json.load(f)
        f.close()
        return data
    
    def append_json_to(self, file_name, tag, data):
        previous_data = self.read_json(file_name)
        previous_data = previous_data[tag]
        previous_data.append(data)
        
        new_data = {tag : previous_data}
        self.write_json(file_name, new_data, write_mode='w')
        
    def remove_json_from(self, file_name, tag, data):
        previous_data = self.read_json(file_name)
        previous_data = previous_data[tag]
        
        data_filtered = list(filter(lambda json_data: json_data != data, previous_data))
        
        new_data = {tag : data_filtered}
        self.write_json(file_name, new_data, write_mode='w')

        
    def write_to(self, file, text):
        file.write(text + "\n")
        print("     Requested " + text)
        
    def delete_line(self, fp, line):
        lines = fp.read().splitlines()
        
        # move file pointer to the beginning of a file
        fp.seek(0)
        # truncate the file
        fp.truncate()
        
        first_new_line = lines[0:line]
        second_new_line = lines[line+1:]
        
        new_lines = [*first_new_line, *second_new_line]

        fp.writelines(new_lines)
        fp.close()

    #en test
    def delete_first_line(self, fp):
        data = fp.read().splitlines(True)
        fp.writelines(data[1:])

    def sleep(self, t):
        time.sleep(random.randrange(t, 2 * t))


    def check_exists_by_xpath(self, xpath):
        try:
            self.browser.find_element(By.XPATH, xpath)
        except NoSuchElementException:
            return False
        return True

    def check_exists_by_css(self, css):
        try:
            self.browser.find_element(By.CSS_SELECTOR, css)
        except NoSuchElementException:
            return False
        return True

    def wait_until_shows_css(self, css):
        while not self.check_exists_by_css(css):
            time.sleep(0.5)
        time.sleep(0.2)

    def wait_until_shows(self, xpath):
        while not self.check_exists_by_xpath(xpath):
            time.sleep(0.5)
        time.sleep(0.2)
        
    def wait_until_disappears(self, xpath):
        while self.check_exists_by_xpath(xpath):
            time.sleep(0.5)
        time.sleep(0.2)


    def empty_click(self):
        self.browser.find_element(By.XPATH, 'html').click()
        self.sleep(1)


    def click_on(self, xpath, wait=False):
        if wait: self.wait_until_shows(xpath)
        self.browser.find_element(By.XPATH, xpath).click()

    def check_correct_url(self, url):
        if self.browser.current_url != url:
            print("Left group page. Redirecting...")
            self.browser.get(url)
            self.sleep(2)
            self.empty_click()
            self.sleep(2)

            return False
        return True

    def read_file(self, f):
        cities = []
        try:
            cities =  f.read().splitlines()
        except Exception as err:
            print(f'{type(err)}: {err}')
        finally:
            return cities
        
    def close_browser(self):
        self.browser.close()
        


    # Authorization:
    def auth(self):
        try:
            self.browser.get('https://www.facebook.com/')
            # sleep(1200)
            self.sleep(1)

            # Press ENTER to access page behind cookie-popup
            self.browser.find_element(By.XPATH, 'html').send_keys(Keys.ENTER)

            input_username = self.browser.find_element(By.ID, 'email')
            input_password = self.browser.find_element(By.ID, 'pass')

            input_username.send_keys(self.my_username)
            input_password.send_keys(self.my_password)
            input_password.send_keys(Keys.ENTER)

            print("Logged in")
            print("Loading facebook page...")
            time.sleep(2)


        except Exception as err:
            print(err)
            self.browser.quit()
            
    @abstractmethod
    def scrape(self):
        pass