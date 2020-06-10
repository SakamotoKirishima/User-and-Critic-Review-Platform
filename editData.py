import pandas
import json

import pymongo

client = pymongo.MongoClient(
    'mongodb+srv://mathangi_s:Meenakshi12@cluster0-mvtbq.mongodb.net/test?retryWrites=true&w=majority')
print(client.list_database_names())
db = client.critle
print(db.collection_names())
movieData = list(db.movies.find({}))
movieDataValues = list()

for row in movieData:
    rowValues = row.values()
    movieDataValues.append(rowValues)
movieDataDf = pandas.DataFrame(movieDataValues, columns=movieData[0].keys())
print(movieDataDf)
