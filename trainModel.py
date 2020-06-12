import os
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import pymongo
import argparse
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Reshape, Dot
from tensorflow.keras.layers import Embedding
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.regularizers import l2
from tensorflow.keras.layers import Add, Activation, Lambda


class EmbeddingLayer:
    def __init__(self, n_items, n_factors):
        self.n_items = n_items
        self.n_factors = n_factors

    def __call__(self, x):
        x = Embedding(self.n_items, self.n_factors, embeddings_initializer='he_normal',
                      embeddings_regularizer=l2(1e-6))(x)
        x = Reshape((self.n_factors,))(x)
        return x


def RecommenderV2(n_users, n_movies, n_factors, min_rating, max_rating):
    user = Input(shape=(1,))
    u = EmbeddingLayer(n_users, n_factors)(user)
    ub = EmbeddingLayer(n_users, 1)(user)

    movie = Input(shape=(1,))
    m = EmbeddingLayer(n_movies, n_factors)(movie)
    mb = EmbeddingLayer(n_movies, 1)(movie)
    x = Dot(axes=1)([u, m])
    x = Add()([x, ub, mb])
    x = Activation('sigmoid')(x)
    x = Lambda(lambda x: x * (max_rating - min_rating) + min_rating)(x)
    model = Model(inputs=[user, movie], outputs=x)
    opt = Adam(lr=0.001)
    model.compile(loss='mean_squared_error', optimizer=opt)
    return model


def RecommenderV1(n_users, n_movies, n_factors):
    user = Input(shape=(1,))
    u = Embedding(n_users, n_factors, embeddings_initializer='he_normal',
                  embeddings_regularizer=l2(1e-6))(user)
    u = Reshape((n_factors,))(u)

    movie = Input(shape=(1,))
    m = Embedding(n_movies, n_factors, embeddings_initializer='he_normal',
                  embeddings_regularizer=l2(1e-6))(movie)
    m = Reshape((n_factors,))(m)

    x = Dot(axes=1)([u, m])
    model = Model(inputs=[user, movie], outputs=x)
    opt = Adam(lr=0.001)
    model.compile(loss='mean_squared_error', optimizer=opt)
    return model


parser = argparse.ArgumentParser()
parser.add_argument('collection')
# parser.add_argument('id')
parser.add_argument('ratings_collection')
parser.add_argument('join_column')
parser.add_argument('title')
parser.add_argument('rating')
parser.add_argument('user_id')
parser.add_argument('path_to_save_model')
args = parser.parse_args()
client = pymongo.MongoClient(
    'mongodb+srv://mathangi_s:Meenakshi12@cluster0-mvtbq.mongodb.net/test?retryWrites=true&w=majority')
print(client.list_database_names())
db = client.critle
print(db.collection_names())
artData = list(db[args.collection].find({}))
artDataValues = list()
for row in artData:
    rowValues = row.values()
    artDataValues.append(rowValues)
art = pd.DataFrame(artDataValues, columns=artData[0].keys())
print(art)
ratingData = list(db[args.ratings_collection].find({}))
artRatingDataValues = list()
for row in ratingData:
    rowValues = row.values()
    artRatingDataValues.append(rowValues)
rating = pd.DataFrame(artRatingDataValues, columns=ratingData[0].keys())
rating = rating.drop(['_id'], axis=1)
print(rating)
art_rating = pd.merge(rating, art, on=args.join_column)
print(art_rating.head())
rating_count = rating.groupby(args.user_id)[args.rating].count()
top_users = rating_count.sort_values(ascending=False)[:15]
movie_count = rating.groupby(args.title)[args.rating].count()
top_movies = movie_count.sort_values(ascending=False)[:15]
top_r = rating.join(top_users, rsuffix='_r', how='inner', on=args.user_id)
top_r = top_r.join(top_movies, rsuffix='_r', how='inner', on=args.title)
print(pd.crosstab(top_r[args.user_id], top_r[args.title], top_r[args.rating], aggfunc=np.sum))

user_enc = LabelEncoder()
rating['user'] = user_enc.fit_transform(rating[args.rating].values)
n_users = rating['user'].nunique()
item_enc = LabelEncoder()
rating['movie'] = item_enc.fit_transform(rating[args.title].values)
n_movies = rating['movie'].nunique()
rating['rating'] = rating[args.rating].values.astype(np.float32)
min_rating = min(rating['rating'])
max_rating = max(rating['rating'])
print(n_users, n_movies, min_rating, max_rating)
X = rating[['user', 'movie']].values
y = rating['rating'].values
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=42)
print(X_train.shape, X_test.shape, y_train.shape, y_test.shape)
n_factors = 50
X_train_array = [X_train[:, 0], X_train[:, 1]]
X_test_array = [X_test[:, 0], X_test[:, 1]]
model = RecommenderV2(n_users, n_movies, n_factors, min_rating, max_rating)
model.summary()
history = model.fit(x=X_train_array, y=y_train, batch_size=128, epochs=100, verbose=1,
                    validation_data=(X_test_array, y_test))
tf.saved_model.save(model, os.getcwd() + os.sep + args.path_to_save_model)
