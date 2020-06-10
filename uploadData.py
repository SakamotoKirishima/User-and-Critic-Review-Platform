import json

import pymongo

client = pymongo.MongoClient(
    'mongodb+srv://mathangi_s:Meenakshi12@cluster0-mvtbq.mongodb.net/test?retryWrites=true&w=majority')
print(client.list_database_names())
db = client.critle
db.drop_collection('users')
# fp = open('BX-CSV-Dump/processed/BX-Books.json')
# fp = open('BX-CSV-Dump/processed/BX-Book-Ratings.json')
fp = open('User Dataset/processed/Users.json')
user_documents = fp.readlines()
fp.close()
user_json_documents = list()
# # print(len(book_documents))
for string_json in user_documents:
    user_json_documents.append(json.loads(string_json))
# # print(len(book_json_documents))
# db_ids = db.books.insert_many(book_json_documents)
# print(len(db_ids))
# for book in db.books.find({"Book-Title": {"$regex": "R*"}}):
#     print(book)
collection = db['users']
print(db.collection_names())
collection.insert_many(user_json_documents)
