import json
from pprint import pprint

import pandas
import ast

csvFilePath = 'Movies Dataset/allData.csv'
jsonFilePath = 'allData.json'
jsonDictList = list()
df = pandas.read_csv(csvFilePath)
jsonKeys = df.columns.tolist()
# print(type(jsonKeys))
# exit()
# print(df.head())
for index, row in df.iterrows():
    rowList = row.tolist()
    jsonDict = dict()
    i = 0
    for item in rowList:
        if type(item) == type('s') and (item.startswith('[') or item.startswith('{')):
            try:
                ast.literal_eval(item)
            except Exception as e:
                print(index)
                print(jsonKeys[i])
                print(e)
            # print(eval(item))
            # jsonDict[jsonKeys[i]] = json.loads(item)
        # else:
        #     jsonDict[jsonKeys[i]] = item
        i += 1
    # pprint(jsonDict)
    # jsonDictList.append(jsonDict)
    # exit()
# print(len(jsonDictList))
