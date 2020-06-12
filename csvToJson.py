import json
from pprint import pprint

import numpy
import pandas
import ast

csvFilePath = 'Drawings Dataset/raw/MoMACollection/ratings.csv'
jsonFilePath = 'Drawings Dataset/processed/ratings.json'
jsonDictList = list()
df = pandas.read_csv(csvFilePath)
# df = df.rename(columns={'Duration (sec.)': 'Duration(sec)'})
jsonKeys = df.columns.tolist()
print(jsonKeys)
# exit()
# print(df['Artist'])
# exit()
# affectedColumns = set()
for index, row in df.iterrows():
    print(index)
    rowList = row.tolist()
    jsonDict = dict()
    i = 0
    for item in rowList:
        if type(item) == type('s') and (item.startswith('[') or item.startswith('{')):
            try:
                jsonDict[jsonKeys[i]] = ast.literal_eval(item)
            except Exception as e:
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
# exit()
fp = open(jsonFilePath, 'w')
fp.writelines(jsonDictList)
fp.close()
df.to_csv(csvFilePath, index=False)
# print(affectedColumns)
