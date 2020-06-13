"""File to edit the number of values in the paintings dataset"""
import pandas
import random

if __name__ == '__main__':
    ratingsDf = pandas.read_csv('Drawings Dataset/raw/MoMACollection/ratings.csv')
    rows_to_delete = random.sample(range(0, len(ratingsDf.index)), 24000100)
    ratingsDf = ratingsDf.drop(rows_to_delete)
    print(ratingsDf.shape)
    ratingsDf.to_csv('Drawings Dataset/raw/MoMACollection/ratings.csv', index=False)
