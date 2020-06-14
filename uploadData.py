"""Upload the JSON objects to MongoDb"""
import json
import pymongo
import argparse


def upload_data(server, path_to_file, req_collection):
    """
    Function to upload data given to MongoDb server
    :param server: path to Mongo server
    :param path_to_file: path to JSON file with all the documents
    :param req_collection: collection the documents will be appended to
    :return:
    """
    client = pymongo.MongoClient(server)

    db = client.critle
    fp = open(path_to_file)
    documents = fp.readlines()
    fp.close()
    json_documents = list()
    for string_json in documents:
        json_documents.append(json.loads(string_json))
    collection = db[req_collection]
    collection.insert_many(json_documents)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('user_name')
    parser.add_argument('password')
    parser.add_argument('path_to_file')
    parser.add_argument('collection')
    args = parser.parse_args()
    upload_data(
        "mongodb+srv://" + args.user_name + ":" + args.password + "@cluster0-mvtbq.mongodb.net/<dbname>?retryWrites=true&w=majority",
        args.path_to_file, args.collection)
