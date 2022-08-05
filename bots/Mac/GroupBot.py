import re
from Group import Group
from AbstractBot import AbstractBot
import time
from selenium.webdriver.common.by import By
from selenium.common.exceptions import ElementClickInterceptedException

# Bot which will look for groups and send the join-requests

class GroupBot(AbstractBot):
    
    def __init__(self, my_username, my_password, web_driver):
        super().__init__(my_username, my_password, web_driver)
    
    # Given a city, the bot searches for "apartments {city}" and clicks on the 'Join' button for the first groups. We keep in the group_list.txt file the links to the page of every requested group
    def request_group(self, city, f):
        url = f'https://www.facebook.com/search/groups/?q=apartments%20{city}'
        try:
            # Enter in Search bar "milan apartments"
            # time.sleep(1200)
            self.browser.get(url)
            print(f"Searched for 'apartments {city}'")

            # Click on page to ignore popup
            print("Loading...")
            self.click_on('/html/body/div[2]', wait=True)
            print("Clicked")
        except Exception as err:
            print(f'{type(err)}: {err}')

        

        self.empty_click()


        print("Scrolling...")
        for i in range(3):
            self.browser.execute_script("window.scrollBy(0,1000);")
            time.sleep(0.5)

        
        print("Looking for join buttons")
        join_buttons = self.browser.find_elements(By.XPATH, "//span[text()='Join']")
        i = 1
        for button in join_buttons:
            try:
                self.check_correct_url(url)
                group_name = self.browser.find_element(By.XPATH,
                                                f'/html/body/div[1]/div/div[1]/div/div[3]/div/div/div/div[1]/div[1]/div[2]/div/div/div/div/div/div[{i}]/div/div/div/div/div/div/div[2]/div[1]/div/div/div[1]/span/div/a').text
                group_link = self.browser.find_element(By.LINK_TEXT, group_name).get_attribute('href')

                button.click()
                time.sleep(1)   #Wait 1 sec to wait for potential popup window
                self.empty_click()   #Empty click event for ignoring popup window
                self.empty_click()
                self.empty_click()
                print(f"Adding link of '{group_name}' to txt file: {group_link}")
                
                self.write_to(f, group_link)
                
               
    
                
                
            except UnicodeEncodeError:
                print("Couldn't recognize characters in name. Skipping group")
            except ElementClickInterceptedException:
                self.empty_click()
                time.sleep(0.5)
            except Exception as err:
                print(f'{type(err)}: {err}')
                return
            
            finally:
                i = i + 1

        return 
    
    def request_group_with_JSON(self, city):
        url = f'https://www.facebook.com/search/groups/?q=apartments%20{city}'
        try:
            # Enter in Search bar "milan apartments"
            # time.sleep(1200)
            self.browser.get(url)
            print(f"Searched for 'apartments {city}'")

            # Click on page to ignore popup
            print("Loading...")
            self.click_on('/html/body/div[2]', wait=True)
            print("Clicked")
        except Exception as err:
            print(f'{type(err)}: {err}')

        

        self.empty_click()


        print("Scrolling...")
        for i in range(3):
            self.browser.execute_script("window.scrollBy(0,1000);")
            time.sleep(0.5)

        
        print("Looking for join buttons")
        join_buttons = self.browser.find_elements(By.XPATH, "//span[text()='Join']")
        i = 1
        for button in join_buttons:
            try:
                self.check_correct_url(url)
                group_name = self.browser.find_element(By.XPATH,
                                                f'/html/body/div[1]/div/div[1]/div/div[3]/div/div/div/div[1]/div[1]/div[2]/div/div/div/div/div/div[{i}]/div/div/div/div/div/div/div[2]/div[1]/div/div/div[1]/span/div/a').text
                group_link = self.browser.find_element(By.LINK_TEXT, group_name).get_attribute('href')

                button.click()
                time.sleep(1)   #Wait 1 sec to wait for potential popup window
                self.empty_click()   #Empty click event for ignoring popup window
                self.empty_click()
                self.empty_click()
                print(f"Adding link of '{group_name}' to txt file: {group_link}")
                
               
                group = Group(group_name, group_link, city, False, self.my_username, self.my_password)
                self.append_json_to("data/groups.json", "groups", group.toJSON())
                
                
            except UnicodeEncodeError:
                print("Couldn't recognize characters in name. Skipping group")
            except ElementClickInterceptedException:
                self.empty_click()
                time.sleep(0.5)
            except Exception as err:
                print(f'{type(err)}: {err}')
                return
            
            finally:
                i = i + 1

        return 
    
    # We iterate over all the cities from the cities.txt file and exectue the request_group() method for each city
    def scrape(self):
        self.auth()
        # Open file with group-names
        print("Opening group_list.txt...")
        f = open('group_links.txt', 'a')
        print("Reading cities.txt...")

        cities_file = open("cities.txt","r+")
        cities = self.read_file(cities_file)
        cities_file.close()
        

        requested = open('requestedCities.txt','a')
        cursor_file = open('curseur.txt',"r+")
        cursor = self.read_file(cursor_file)

        i = 0
        for city in cities:
            if(int(cursor[0]) < i):
                self.request_group_with_JSON(city)
                self.write_to(requested, city)
                self.write_to(cursor_file,i)


            i += 1
            #self.delete_line(cities_file,0)

        
        f.close()
        requested.close()
        self.close_browser()
        
    def scrape_avec_json(self):
        self.auth()
        
        cities_file = open("cities.txt","r+")
        cities = self.read_file(cities_file)
        
        
        cities_file.close()
        
        for city in cities:
            self.request_group_with_JSON(city)
            #ptet faite meme structure pour les villes
        
        self.close_browser()
            
        
        