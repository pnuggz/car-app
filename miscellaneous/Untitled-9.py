from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import mysql.connector
import time
import datetime

from pyvirtualdisplay import Display
display = Display(visible=0, size=(1920, 1080))
display.start()

chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-setuid-sandbox")
driver = webdriver.Chrome(chrome_options=chrome_options)

con = mysql.connector.connect(user='carsales_user',password='Jatipadang13',host='103.253.146.240',database='api',port='3306')

cursor = con.cursor()

sql_user_searches = "SELECT user_id, make_id, make_name, model_id, model_name FROM `carsales_users_search` JOIN carsales_makes ON carsales_makes.id = carsales_users_search.make_id JOIN carsales_models ON carsales_models.id = carsales_users_search.model_id WHERE carsales_users_search.status = 0"
cursor.execute(sql_user_searches)
searches = cursor.fetchall()

for z in searches:
    offset = 0
    url = "https://www.carsales.com.au/cars/{0}/{1}/".format(z[2],z[4],offset)
    driver.get(url)
    time.sleep(10)
    number_of_pages = 2
    print(number_of_pages)
    page = 0
    while page < number_of_pages:
        offset = page * 12
        url = "https://www.carsales.com.au/cars/{0}/{1}/?offset={2}&setype=pagination".format("BMW","535d",offset)
        print(url)
        sleep_time = 5
        num_retries = 10
        error = 0
        for loopyloop in range(0, num_retries):  
            try:
                error = 0
                driver.get(url)
                time.sleep(10)
                driver.find_element_by_xpath("""//*[@class="result-set-container "]""").get_attribute("outerHTML")
                print("success")
            except NoSuchElementException:
                print("error")
                error = 1
                pass

            if error == 1:
                time.sleep(sleep_time)  # wait before trying to fetch the data again
                sleep_time += 10  # Implement your backoff algorithm here i.e. exponential backoff
            else:
                break
        rows = driver.find_elements_by_xpath("""//div[contains(@class,"listing-item")]""")
        count = len(rows)
        i = 0
        print(count)
        while i < count:
            title = rows[i].find_elements_by_xpath("""//div[contains(@class,"title ")]/a/h2""")[i].text
            odometer_raw = rows[i].find_elements_by_xpath("""//div[contains(@class,"listing-body")]/div[contains(@class,"ad-info")]/div[contains(@class,"ad-features")]/div[contains(@class,"vehicle-features")]/div[contains(@class,"listing-feature")][1]/div[contains(@class,"feature-text")]""")[i].text
            body = rows[i].find_elements_by_xpath("""//div[contains(@class,"listing-body")]/div[contains(@class,"ad-info")]/div[contains(@class,"ad-features")]/div[contains(@class,"vehicle-features")]/div[contains(@class,"listing-feature")][2]/div[contains(@class,"feature-text")]""")[i].text
            transmission = rows[i].find_elements_by_xpath("""//div[contains(@class,"listing-body")]/div[contains(@class,"ad-info")]/div[contains(@class,"ad-features")]/div[contains(@class,"vehicle-features")]/div[contains(@class,"listing-feature")][3]/div[contains(@class,"feature-text")]""")[i].text
            engine = rows[i].find_elements_by_xpath("""//div[contains(@class,"listing-body")]/div[contains(@class,"ad-info")]/div[contains(@class,"ad-features")]/div[contains(@class,"vehicle-features")]/div[contains(@class,"listing-feature")][4]/div[contains(@class,"feature-text")]""")[i].text
            price_raw = rows[i].find_elements_by_xpath("""//div[contains(@class,"ad-price")]/a/div[@class="price"][1]""")[i].text
            link_raw = rows[i].find_elements_by_xpath("""//div[contains(@class,"location-info")]/div[contains(@class,"action-buttons")]/a""")[i].get_attribute("href")
            year_raw = title[:4]
            year = int(year_raw)
            odometer_replace = odometer_raw.replace(" km","").replace(",","")
            odometer = int(odometer_replace)
            price_replace = price_raw.replace("$","").replace(",","").replace("*","")
            price = int(price_replace)
            link_split = link_raw.split("?")
            link = link_split[0]
            print(year)
            print(odometer)
            print(body)
            print(transmission)
            print(engine)
            print(price)
            print(link)
            print(z[1])
            print(z[3])
            i = i + 1
            query = """INSERT INTO carsales_results_raw (source, make_id, model_id, year, odometer, body, transmission, engine, price, link) VALUES ('Carsales', '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}') ON DUPLICATE KEY UPDATE price = '{7}' """.format(z[1], x[3], year, odometer, body, transmission, engine, price, link)
            print(query)
            cursor.execute(query)
            con.commit()
        page = page + 1

cursor.close()
con.close()
driver.quit()
display.popen.kill()
print("success")