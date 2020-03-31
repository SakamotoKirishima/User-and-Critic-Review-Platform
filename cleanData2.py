# # # import pandas
# # import ast
# #
# # #
# # # df = pandas.read_csv('Movies Dataset/allData.csv')
# # # print(df.loc[22248]['overview'])
# # # # print(df.loc[28073]['original_title'])
# # # # exit()
# # # # print(ast.literal_eval(df.loc[4194]['tagline']))
# # # df.at[
# # #     22248, 'overview'] = "(Period covered: 1575-1681) Fist film in the Shinobi series starring Raizo Ichikawa. Warlord Oda Nobunaga seeks to unite a fractured Japan, a young man trained in the arts of ninjitsu is manipulated by a ninja master into attempting to assassinate the warlord before he completes his task."
# # # # df.at[28073, 'original_title'] = 'REC 4: Apocalipsis'
# # # print(df.loc[22248]['overview'])
# # # # exit()
# # # # print(ast.literal_eval(df.loc[4194]['tagline']))
# # # df.to_csv('Movies Dataset/allData.csv')
# # import json
# #
# # fp = open('allData.json')
# # s = fp.readlines()
# # fp.close()
# # print(len(s))
# # jsonDict = json.loads(s[0])
# # # print(jsonDict.keys())
# # print(s[0])
# # print(type(jsonDict['tagline']))
# import pandas
#
# df2 = pandas.read_csv('BX-CSV-Dump/raw/BX-Users.csv', delimiter=';', engine='python', error_bad_lines=False)
fp = open('BX-CSV-Dump/raw/BX-Users.csv', encoding='latin-1')
l = fp.readlines()
print(l[269])
fp.close()
