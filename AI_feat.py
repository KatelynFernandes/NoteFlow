from google import genai
import numpy as np

def finance_AI(budget): 
    client = genai.Client(api_key="AIzaSyCn5-qUOF12fzbQ5gwyC9o0ITeVA0ztTdY")
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents="Make a budget for music artist based on" + str(budget) + " amount of money." \
        "make it in the form like marketing: 400 , website: 500 , ads: 40, etc. Do not add any other words or formatting at all"
    )
    print(response.text)

def gigFinder_AI(month, city, state, country): 
    client = genai.Client(api_key="AIzaSyCn5-qUOF12fzbQ5gwyC9o0ITeVA0ztTdY")
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents="Make a list of venues that a music artist can perform at in " + city + ", " + state + ", " + country + \
            " on " + month + ". List them with just the names and address and phone number and dates avaiaable. Do not add any other words at all nor any formatting"
    )
    print(response.text)

def chatBot(input): 
    client = genai.Client(api_key="AIzaSyCn5-qUOF12fzbQ5gwyC9o0ITeVA0ztTdY")
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents= input
        )
    print(response.text)


#finance_AI(1000)
gigFinder_AI("February", "Athens", "GA")
#chatBot("what genre should I do?")
