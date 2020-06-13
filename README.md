# User-and-Critic-Review-Platform

Critical review of an artwork allows people to express their opinions and allow others to better understand and appreciate art. This platform will allow professional critics and enthusiasts alike to review various works of art, including books, movies, paintings and songs.

The platform will include features such as

* Create a profile and have the profile verified as a critic or an artist profile
*	Access recommendations for your profile based on previous history and the trending pieces
* Score and review any form of art.
*	Add new artwork if profile is verified
*	View the average critic and user scores for movies
*	View details about the artwork
*	View user profiles and the reviews and scores they have given to various works of art

## Training the model

Requirements:

* python 3.7.4

* numpy  1.18.1

* pandas 1.0.3

*  pymongo 3.10.1

*  scikit-learn 0.21.3

* tensorflow 2.2.0  

### Datasets

* [Drive folder with datasets](https://drive.google.com/drive/folders/1KxtefA__qXWBAHI-_yFsuWdh1n8xouHK?usp=sharing)

* There are five folders in the above Drive folder: 
    
    * Book Dataset
    
    * Drawings Dataset
    
    * Movies Dataset
    
    * Music Dataset
    
    * User Dataset
    
*  Each folder has two folders: 
    * processed: 
        * Each file contains a collection of JSON objects, each stored on one line in the file
    * raw:
        * Contains csv files with all the data

### Steps

1. Download datasets

2. Choose a Dataset folder (Steps 2 and 3 have to be run for both the art and ratings data)

3. If you wish to process the files yourself, you can convert the CSV file to JSON file using csvToJson.py
    ```aidl
        $ python3 csvToJSon.py <csv_file_path> <json_file_path>
    ```
    __csv file path__ : path to CSV file
    
    __json file path__ : path to JSON file 
4. Next task is to upload the data to the MongoDb cluster using uploadData.py
    ```aidl
       $ python3 uploadData.py <username> <password> <path_to_file> <collection>
    ```
    __username__ : username to connect to the server
    
    __password__ : password to connect to the server
    
    __path_to_file__ : path to processed JSON file (can also be found in the processed folder for each dataset folder)
    
    __collection__ : name of collection where data should be uploaded
    
5. To train and save the model, run trainModel.py
    ```aidl
       $ python3 trainModel.py <username> <password> <collection> <ratings_collection> <id> <rating> <user_id> <path_to_save_model>
    ```
   
   __username__ : username to connect to the server
       
   __password__ : password to connect to the server
   
   __collection__ : name of art collection
   
   __ratings_collection__ : name of ratings collection
   
   __id__ : art ID key
   
   __ratings__ : rating key
   
   __user_id__ : user ID key
   
   __path_to_save_model__ : Path to save the model in Tensorflow SavedModel format
