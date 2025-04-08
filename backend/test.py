import requests

def get_location():
    try:
        response = requests.get('https://ipinfo.io/')
        data = response.json()
        location = data['country']
        return location
    except Exception as e:
        print("An error occurred:", e)
        return None

print(get_location())
