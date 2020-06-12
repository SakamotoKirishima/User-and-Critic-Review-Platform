import json

import pymongo
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('path_to_file')
parser.add_argument('collection')
args = parser.parse_args()
client = pymongo.MongoClient(
    'mongodb+srv://mathangi_s:Meenakshi12@cluster0-mvtbq.mongodb.net/test?retryWrites=true&w=majority')
print(client.list_database_names())
db = client.critle
# db.drop_collection('users')
# fp = open('BX-CSV-Dump/processed/BX-Books.json')
# fp = open('BX-CSV-Dump/processed/BX-Book-Ratings.json')
fp = open(args.path_to_file)
documents = fp.readlines()
fp.close()
json_documents = list()
# # print(len(book_documents))
for string_json in documents:
    json_documents.append(json.loads(string_json))
# # print(len(book_json_documents))
# db_ids = db.books.insert_many(book_json_documents)
# print(len(db_ids))
# for book in db.books.find({"Book-Title": {"$regex": "R*"}}):
#     print(book)
collection = db[args.collection]
print(db.collection_names())
collection.insert_many(json_documents)
