from google import genai
import numpy as np
import pypdf as PdfReader
from pdfquery import PDFQuery
from flask import Flask, jsonify
import json



def budget_AI(budget): 
    client = genai.Client(api_key="AIzaSyCn5-qUOF12fzbQ5gwyC9o0ITeVA0ztTdY")
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents="Make a budget for music artist based on" + str(budget) + " amount of money." \
        "make it in the form like marketing: 400 , website: 500 , ads: 40, etc. Do not add any other words or formatting at all"
    )
    #print(response.text)
    return response.text

''' def bank_statement_analysis(bank): 
    
    
   
    client = genai.Client(api_key="AIzaSyCn5-qUOF12fzbQ5gwyC9o0ITeVA0ztTdY")
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents="Analyze this bank statement and give the overall score of financially healthy spending from 1 - 100. No formatting" \
        + " Only give the score and 4 sentences of advice to fix their spending and separate it with a :" + "here is the pdf content of the bank statement" + \
              bank_statement)
    print(" bank statement: " + response.text)
    return response.text '''


def gigFinder_AI(month, city, state, country): 
    client = genai.Client(api_key="AIzaSyCn5-qUOF12fzbQ5gwyC9o0ITeVA0ztTdY")
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents="Make a list of venues that a music artist can perform at in " + city + ", " + state + ", " + country + \
            " on " + month + ". List only 10 of them with just the names and address and phone number and dates avaiaable with everything seaprated by :. Do not add any other words at all nor any formatting"
    )
    #print(response.text)
    return response.text

# age, genre, city, state, expereince, groupsize, instruments, position, income, budget
# long term and short term financial goals goals. 
# Are you collecting any royalties
# Are you a Business entity or a sole propreitor
# what do you beleive is your biggest business expense
# Is your main source of income from Gigs, streaming, royalties, merch, brand deals, etc
# Do you recieve 1099s from venues, platforms, or companies? 
#Do you have a separate bank account for music-related finances
# Are you using a credit card or loans to fund your music career? If so how much debt. 
# Do you have a emergency savings fund
# Are you investing in any assets
# what is your biggest expense

def financial_health_AI(longterm, shortterm, royalties, busi_sole, biggest_expense,\
                        savings, investments, loan_credit, bank_account, \
                            ten_ninety_nine, income): #, age, genre, city, state, experienceLvl, groupsize, instruments, position, income, budget ): 
    client = genai.Client(api_key="AIzaSyCn5-qUOF12fzbQ5gwyC9o0ITeVA0ztTdY")
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents=" The musician that you are financially managing is asking for you to rank their financial health on a scale of 1 - 100. "\
        + " You asked them the following questions and got the following answers. " + \
        "1. long term and short term financial goals goals. answer: " + longterm + " " + shortterm + \
        "2. Are you collecting any royalties? answer: " + royalties + \
        "3.  Are you a Business entity or a sole propreitor? answer: " + busi_sole +\
        "4. what do you beleive is your biggest business expense answer: " + biggest_expense + \
        "5. Is your main source of income from Gigs, streaming, royalties, merch, brand deals, etc? answer: " + income + \
        "6. Do you recieve 1099s from venues, platforms, or companies? answer: " + ten_ninety_nine + \
        "7. Do you have a separate bank account for music-related finances? answer: " + bank_account + \
        "8. Are you using a credit card or loans to fund your music career? If so how much debt. " + loan_credit + \
        " 9. Do you have a emergency savings fund? answer: " + savings + \
        "10. Are you investing in any assets? answer: " + investments + \
        " just give the number on a scale of 1 - 100 and then a brief 3 sentence advisement of how to improve it and the classification\
              (0-25: Very Bad, 26-50: Needs Work, 51-75: Good, 76-85: Great, 86-100: Amazing!) NO FORMATTING separate the score, classification and advise with a : "
    )
    financial_health = response.text.split(":")
    financial_health = {"score": financial_health[0],
                        "class": financial_health[1],
                        "advisement": financial_health[2]}

    json_fin_health = json.dumps(financial_health)

    with open("fin_health.json", "w") as file: 
       json.dump(json_fin_health, file, indent=4)
    print(json_fin_health)
    return json_fin_health

def chatBot(input, name, age, genre, city, state, experienceLvl, groupsize, instruments, position, income, budget ): 
   

    client = genai.Client(api_key="AIzaSyCn5-qUOF12fzbQ5gwyC9o0ITeVA0ztTdY")
    response = client.models.generate_content(
        model="gemini-2.0-flash", contents= "Pretend you are the financial and logistical manager of a " + position + "(group) named " + name + " your job is to do the logistically and all nonmusic \
            portion of what is needed to be a top music artist. Their budget is" + budget + "\
            the artist(s) ages is " + age + "they live in " +city + ", " + state + " they've been making " + genre + "music for " + str(experienceLvl) + \
                " years and theyre group has" + str(groupsize) + " members who play" + instruments +"They hava a average income of " + str(income) + \
                    "Be specific and super detailed. give resources and give recommendations in max 6 sentenences and soltions based on this persons details. Dont over explain things unless prompted and dont add formatting. Do not make a revised budget" + input
        )
   
    chat_resp = {"input": input, 
                 "response": response.text}
    json_chatBot = json.dumps(chat_resp)

    with open("chatBot.json", "w") as file: 
       json.dump(json_chatBot, file, indent=4)

    print(chat_resp)

    return chat_resp


def parse_budget(budget): 
    breakdown = budget_AI(budget)

    areas = breakdown.split("\n")
    i = 0
    for line in areas: 
       if ": " in areas[i]: 
        areas[i] = areas[i].split(": ")
        areas[i] = {
           "expense": areas[i][0],
           "amount": areas[i][1]
        }
        print(areas[i])
        i +=1

    json_budget = json.dumps(areas)

    with open("budget.json", "w") as file: 
       json.dump(json_budget, file, indent=1)

    return areas

def parse_gigs(month, city, state, country): 
    breakdown = gigFinder_AI(month, city, state, country)

    gigs = breakdown.split("\n")
    i = 0
    for line in gigs: 
       if ":" in gigs[i]: 
          gigs[i] = gigs[i].split(":")
          gigs[i] = {
             "name": gigs[i][0],
             "address": gigs[i][1],
             "number": gigs[i][2],
             "availabilty" : gigs[i][3]
          }
          print(gigs[i])
          i +=1

    json_gigs = json.dumps(gigs)

    with open("gigs.json", "w") as file: 
       json.dump(json_gigs, file, indent=1)

    return gigs

#input, age, genre, city, state, experienceLvl, groupsize, instruments, position, income
chatBot("How can i make my budget better. what are", "MothersCradle", "18-24", "punk", "Athens", "GA", 3, 4, "vocal, piano, guitar, drums", "music", 1000, budget_AI(1000))
parse_budget(1000)
parse_gigs("February", "Athens", "GA", "United States")

#bank_statement_analysis("C:/Users/9jrus/Downloads/alex_beats_bank_statement_fixed.pdf")

#longterm, shortterm, royalties, busi_sole, biggest_expense,\savings, investments, loan_credit, bank_account, \ ten_ninety_nine, income):
financial_health_AI("become full-time musician that is signed to a record company" , "to make enough gigs to be able to afford my rent",\
                     "I am collecting some royalties but sometimes i forget", "I am a business entity, LLC", "my biggest expense is travel",\
                          "I have an emergency fund with $1000", "No i do not invest anything", "yes, i have 10,000 in loans and 500 credit card debt", \
                            "I do not have a separate bank account", "I have completed my 1099 tax form this year", "my main source of income is live gigs")

