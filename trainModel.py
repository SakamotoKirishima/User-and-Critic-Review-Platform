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
    """
    Class to define Embedding Layer
    """

    def __init__(self, n_items, n_factors):
        """
        __init__() function
        :param n_items: items to create embeddings for
        :param n_factors: number of embeddings
        """
        self.n_items = n_items
        self.n_factors = n_factors

    def __call__(self, x):
        """
        __call__() function
        :param x: neural network model
        :return: neural network model with added layer
        """
        x = Embedding(self.n_items, self.n_factors, embeddings_initializer='he_normal',
                      embeddings_regularizer=l2(1e-6))(x)
        x = Reshape((self.n_factors,))(x)
        return x


def RecommenderV2(n_users, n_art, n_factors, min_rating, max_rating):
    """
    Defines the recommender system
    :param n_users: users in the system
    :param n_art: artwork in the system
    :param n_factors: number of dimensions for the embedding
    :param min_rating: minimum rating
    :param max_rating: maximum rating
    :return: model
    """
    user = Input(shape=(1,))
    u = EmbeddingLayer(n_users, n_factors)(user)
    ub = EmbeddingLayer(n_users, 1)(user)

    movie = Input(shape=(1,))
    m = EmbeddingLayer(n_art, n_factors)(movie)
    mb = EmbeddingLayer(n_art, 1)(movie)
    x = Dot(axes=1)([u, m])
    x = Add()([x, ub, mb])
    x = Activation('sigmoid')(x)
    x = Lambda(lambda x: x * (max_rating - min_rating) + min_rating)(x)
    model = Model(inputs=[user, movie], outputs=x)
    opt = Adam(lr=0.001)
    model.compile(loss='mean_squared_error', optimizer=opt)
    return model


def get_train_test_sets(server, req_collection, req_rating_collection, user_id, ratings, art_id):
    """
    Process data and divide into train and test data
    :param server: MongoDb server
    :param req_collection: requested collection
    :param req_rating_collection: requested rating collection
    :param user_id: user id key
    :param ratings: rating key
    :param art_id: artwork id key
    :return: train and test sets, minimum and maximum rating and the processed user and art work datasets
    """
    client = pymongo.MongoClient(server)
    db = client.critle
    artData = list(db[req_collection].find({}))
    artDataValues = list()
    for row in artData:
        rowValues = row.values()
        artDataValues.append(rowValues)
    art = pd.DataFrame(artDataValues, columns=artData[0].keys())
    ratingData = list(db[req_rating_collection].find({}))
    artRatingDataValues = list()
    for row in ratingData:
        rowValues = row.values()
        artRatingDataValues.append(rowValues)
    rating = pd.DataFrame(artRatingDataValues, columns=ratingData[0].keys())
    rating = rating.drop(['_id'], axis=1)
    rating_count = rating.groupby(user_id)[ratings].count()
    top_users = rating_count.sort_values(ascending=False)[:15]
    movie_count = rating.groupby(art_id)[ratings].count()
    top_movies = movie_count.sort_values(ascending=False)[:15]
    top_r = rating.join(top_users, rsuffix='_r', how='inner', on=user_id)
    top_r = top_r.join(top_movies, rsuffix='_r', how='inner', on=art_id)
    print(pd.crosstab(top_r[user_id], top_r[art_id], top_r[ratings], aggfunc=np.sum))
    user_enc = LabelEncoder()
    rating['user'] = user_enc.fit_transform(rating[ratings].values)
    n_users = rating['user'].nunique()
    item_enc = LabelEncoder()
    rating['art'] = item_enc.fit_transform(rating[art_id].values)
    n_art = rating['art'].nunique()
    rating['rating'] = rating[ratings].values.astype(np.float32)
    min_rating = min(rating['rating'])
    max_rating = max(rating['rating'])
    X = rating[['user', 'art']].values
    y = rating['rating'].values
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.1, random_state=42)
    return X_train, X_test, y_train, y_test, min_rating, max_rating, n_art, n_users


def train_and_save(n_factors, X_train, X_test, y_train, y_test, n_users, n_art, min_rating, max_rating, file_path):
    """
    To train and save the model for the given artwork
    :param n_factors: number of dimensions for the embeddings
    :param X_train: Training values
    :param X_test: Testing values
    :param y_train: Training labels
    :param y_test: Testing labels
    :param n_users: Users in system
    :param n_art: Artworks in system
    :param min_rating: Minimum rating in system
    :param max_rating: Maximum rating in system
    :param file_path: Path to save model in
    :return:
    """
    X_train_array = [X_train[:, 0], X_train[:, 1]]
    X_test_array = [X_test[:, 0], X_test[:, 1]]
    model = RecommenderV2(n_users, n_art, n_factors, min_rating, max_rating)
    model.summary()
    history = model.fit(x=X_train_array, y=y_train, batch_size=128, epochs=100, verbose=1,
                        validation_data=(X_test_array, y_test))
    tf.saved_model.save(model, os.getcwd() + os.sep + file_path)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('user_name')
    parser.add_argument('password')
    parser.add_argument('collection')
    parser.add_argument('rating_collection')
    parser.add_argument('id')
    parser.add_argument('rating')
    parser.add_argument('user_id')
    parser.add_argument('path_to_save_model')
    args = parser.parse_args()
    server_url = "mongodb+srv://" + args.user_name + ":" + args.password + "@cluster0-mvtbq.mongodb.net/<dbname>?retryWrites=true&w=majority"
    X_train, X_test, y_train, y_test, min_rating, max_rating, movies, users = get_train_test_sets(server_url,
                                                                              args.collection,
                                                                              args.rating_collection,
                                                                              args.user_id,
                                                                              args.rating, args.id)
    n = 50
    train_and_save(n, X_train, X_test, y_train, y_test, users, movies, min_rating, max_rating, args.path_to_save_model)
