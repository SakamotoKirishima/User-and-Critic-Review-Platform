import json
from pprint import pprint

import numpy
import pandas
import ast

csvFilePath = 'Movies Dataset/raw/all_movie_data.csv'
jsonFilePath = 'Movies Dataset/processed/all_movie_data.json'
jsonDictList = list()
df = pandas.read_csv(csvFilePath)
# df = df.drop(
#     ['Unnamed: 0', 'Unnamed: 0.1', 'Unnamed: 0.1.1', 'Unnamed: 0.1.1.1', 'Unnamed: 0.1.1.1.1', 'Unnamed: 0.1.1.1.1.1',
#      'Unnamed: 0.1.1.1.1.1.1', 'Unnamed: 0.1.1.1.1.1.1.1', 'Unnamed: 0.1.1.1.1.1.1.1.1', 'Unnamed: 0.1.1.1.1.1.1.1.1.1',
#      'Unnamed: 0.1.1.1.1.1.1.1.1.1.1', 'Unnamed: 0.1.1.1.1.1.1.1.1.1.1.1', 'Unnamed: 0.1.1.1.1.1.1.1.1.1.1.1.1',
#      'Unnamed: 0.1.1.1.1.1.1.1.1.1.1.1.1.1'], axis=1)
# df = df.drop('Unnamed: 0', axis=1)
jsonKeys = df.columns.tolist()
print(jsonKeys)
# exit()
# print(df.head())
affectedColumns = set()
for index, row in df.iterrows():
    rowList = row.tolist()
    jsonDict = dict()
    i = 0
    for item in rowList:
        if type(item) == type('s') and (item.startswith('[') or item.startswith('{')):
            try:
                jsonDict[jsonKeys[i]] = ast.literal_eval(item)
            except Exception as e:
                if jsonKeys[i] in {'artist_name', 'title', 'release'}:
                    if item == numpy.nan:
                        jsonDict[jsonKeys[i]] = "nan"
                    else:
                        jsonDict[jsonKeys[i]] = item
                # affectedColumns.add(jsonKeys[i])
            # print(eval(item))
            # jsonDict[jsonKeys[i]] = ast.literal_eval(item)
        elif item == numpy.nan:
            jsonDict[jsonKeys[i]] = "nan"
        else:
            jsonDict[jsonKeys[i]] = item
        i += 1
    # pprint(jsonDict)
    jsonStr = json.dumps(jsonDict)
    # print(jsonStr)
    # exit()
    jsonDictList.append(jsonStr + '\n')
    # exit()
print(len(jsonDictList))
print(len(df.index))
fp = open(jsonFilePath, 'w')
fp.writelines(jsonDictList)
fp.close()
df.to_csv(csvFilePath, index=False)
# print(affectedColumns)
