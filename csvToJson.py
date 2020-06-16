"""To convert .csv files to .json files"""
import json
import numpy
import pandas
import ast
import argparse


def convert(csv_file_path, json_file_path):
    """
    Function to take a csv file path and json file path and write the CSV file into JSON objects
    :param csv_file_path: path of CSV file to be converted
    :param json_file_path: path to the JSON file where the JSON objects will be stored
    :return:
    """
    json_dict_list = list()
    df = pandas.read_csv(csv_file_path)
    json_keys = df.columns.tolist()
    for index, row in df.iterrows():
        row_list = row.tolist()
        json_dict = dict()
        i = 0
        for item in row_list:
            if type('s') == type(item) and (item.startswith('[') or item.startswith('{')):
                try:
                    json_dict[json_keys[i]] = ast.literal_eval(item)
                except:
                    if item == numpy.nan:
                        json_dict[json_keys[i]] = "nan"
                    else:
                        json_dict[json_keys[i]] = item
            elif item == numpy.nan:
                json_dict[json_keys[i]] = "nan"
            else:
                json_dict[json_keys[i]] = item
            i += 1
        json_str = json.dumps(json_dict)
        json_dict_list.append(json_str + '\n')


def save_file(json_file_path, json_dict_list):
    fp = open(json_file_path, 'w')
    fp.writelines(json_dict_list)
    fp.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('csv_file_path', help='Path of CSV file')
    parser.add_argument('json_file_path', help='Path pf JSON file')
    args = parser.parse_args()
    csvFilePath = args.csv_file_path
    jsonFilePath = args.json_file_path
    convert(csvFilePath, jsonFilePath)
