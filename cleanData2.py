import pandas
import ast

df = pandas.read_csv('Movies Dataset/allData.csv')
print(df.loc[12401]['original_title'])
# print(ast.literal_eval(df.loc[4194]['tagline']))
df.at[12401, 'original_title'] = 'REC'
print(df.loc[12401]['original_title'])
# print(ast.literal_eval(df.loc[4194]['tagline']))
df.to_csv('Movies Dataset/allData.csv')
