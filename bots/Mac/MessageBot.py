from asyncio import SendfileNotAvailableError

import selenium
from AbstractBot import AbstractBot
import time
from selenium.webdriver.common.by import By
from selenium.common import exceptions as SeleniumExceptions
# Bot which will post on all requested groups a custom message
class MessageBot(AbstractBot):
    
    def __init__(self, my_username, my_password, web_driver, msg):
        super().__init__(my_username, my_password, web_driver)
        self.msg = msg
        
    # Define new custom message to post    
    def set_new__msg(self, msg):
        self.msg = msg
    
    def post_message(self, message, url):
        try:
            # Opening group page
            print(f"Loading {url}...")
            self.browser.get(url)
            time.sleep(1)
            self.empty_click()
            
            
            # Opening post form
            post = self.browser.find_element(By.XPATH, "/html/body/div[1]/div/div[1]/div/div[3]/div/div/div/div[1]/div[1]/div[4]/div/div/div/div/div/div[1]/div[1]/div/div/div/div[1]/div")
            post.click()
            time.sleep(1)
            
            # Locate message area and write message
            text_area = self.browser.find_element(By.XPATH, "/html/body/div[1]/div/div[1]/div/div[4]/div/div/div[1]/div/div[2]/div/div/div/div/div[1]/form/div/div[1]/div/div/div[1]/div/div[2]/div[1]/div[1]/div[1]/div/div/div/div/div/div/div/div")
            text_area.send_keys(message)
            
            # Locate 'Post' button and press it
            #post_button = self.browser.find_element(By.XPATH, "//span[text()='Post']")
            #post_button.click()
            print(f"Posted message to {url}\n")
        except SeleniumExceptions.NoSuchElementException:
            print("Couldn't find necessary element. Skipping group...")
        except Exception as err:
            print(f'{type(err)}: {err}') 
           
    # We iterate over all links in the group_list.txt file and post our custom message on their feed
    def scrape(self):
        self.auth()

        requested = open('requestedCities.txt','a')
        group_links_file = open("group_list.txt","a")

        for group in self.read_file(group_links_file):
            self.post_message(self.msg, group)
            self.write_to(requested, group)
            self.delete_line(group_links_file,0) #delete first line

        requested.close()
        self.close_browser()
        
        
    def scape_with_json(self):
        self.auth()
        
        groups_file_name = "data/groups.json"
        groups = self.read_json(groups_file_name)["groups"]

        for group in groups:
            if (group["requested"] == False) and group["requester_email"] == self.my_username:
                self.post_message(self.msg, group["link"])
                self.remove_json_from(groups_file_name, "groups", group)
                
                group["requested"] = True
                self.append_json_to(groups_file_name, "groups", group)
        
        self.close_browser()
            