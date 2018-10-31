from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import mysql.connector
import time

from pyvirtualdisplay import Display
display = Display(visible=0, size=(1920, 1080))
display.start()

chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-setuid-sandbox")
driver = webdriver.Chrome(chrome_options=chrome_options)

con = mysql.connector.connect(user='codeigniter_user',password='Jatipadang13',host='localhost',database='api',port='3306')

cursor = con.cursor()

sql_select_makes = "select * from makes"
cursor.execute(sql_select_makes)
makes = cursor.fetchall()

sql_select_models = "select * from models"
cursor.execute(sql_select_models)
models = cursor.fetchall()

for z in makes:
	for x in models:
		time.sleep(2)
		offset = 0
		url = "https://www.carsales.com.au/cars/{0}/{1}/?offset={2}&setype=pagination".format(z[1],x[2],offset)
		print(url)
		driver.get(url)
		time.sleep(10)
		total_pagination = driver.find_elements_by_xpath("""//div[@class="tabbed-pagination"]/div[@class="pagination-container"]/div[@class="pagination-container"]/div[@class="pagination"]/p""")[0].text
		print(total_pagination)
		number_of_pages = 2
		print(number_of_pages)
		page = 0
		if (number_of_pages > 1):
			while page < number_of_pages:
				offset = page * 12
				url = "https://www.carsales.com.au/cars/{0}/{1}/?offset={2}&setype=pagination".format(z[1],x[2],offset)
				print(url)
				driver.get(url)
				time.sleep(15)
				print(driver.find_element_by_xpath("""//*[@class="result-set-container "]""").get_attribute("outerHTML"))
				rows = driver.find_elements_by_xpath("""//div[contains(@class,"listing-item")]""")
				count = len(rows)
				i = 0
				time.sleep(3)
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
					i = i + 1
					query = """INSERT INTO car_results_raw (source, make_id, model_id, year, odometer, body, transmission, engine, price, link) VALUES ('Carsales', '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}') ON DUPLICATE KEY UPDATE price = '{7}' """.format(z[0], x[0], year, odometer, body, transmission, engine, price, link)
					print(query)
					cursor.execute(query)
					con.commit()
				page = page + 1
		else:
			time.sleep(3)
			print(driver.find_element_by_xpath("""//*[@class="result-set-container "]""").get_attribute("outerHTML"))
			rows = driver.find_elements_by_xpath("""//div[contains(@class,"listing-item")]""")
			count = len(rows)
			i = 0
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
				i = i + 1
				query = """INSERT INTO car_results_raw (source, make_id, model_id, year, odometer, body, transmission, engine, price, link) VALUES ('Carsales', '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}') ON DUPLICATE KEY UPDATE price = '{7}' """.format(z[0], x[0], year, odometer, body, transmission, engine, price, link)
				print(query)
				cursor.execute(query)
				con.commit()

cursor.close()
con.close()
driver.close()
display.popen.kill()
print("success")

				# query = """INSERT INTO fares_raw_tiket (source, origin, destination, date, airline, price, stops, baggage, link, departure, arrival) VALUES ('Tiket', 'Perth', 'Jakarta', '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}') ON DUPLICATE KEY UPDATE price = '{8}' """.format(date, airline, price, stops, baggage, url, departure, arrival, price)
				# print(query)
				# cursor.execute(query)
				# con.commit()