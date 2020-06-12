import pandas
import random

df = pandas.read_csv('Drawings Dataset/raw/MoMACollection/ratings.csv')
# print(df.shape)
# exit()
rows_to_delete = random.sample(range(0, len(df.index)), 24000100)
df = df.drop(rows_to_delete)
print(df.shape)
df.to_csv('Drawings Dataset/raw/MoMACollection/ratings.csv', index=False)
