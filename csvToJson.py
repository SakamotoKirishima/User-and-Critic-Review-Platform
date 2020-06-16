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
            json_dict[json_keys[i]] = get_value(item)
            i += 1
        json_str = json.dumps(json_dict)
        json_dict_list.append(json_str + '\n')
        save_file(json_file_path, json_dict_list)


def get_value(json_value):
    value = None
    if type('s') == type(json_value) and (json_value.startswith('[') or json_value.startswith('{')):
        try:
            value = ast.literal_eval(json_value)
        except ValueError:
            if json_value == numpy.nan:
                value = 'nan'
            else:
                value = json_value
    return value


def save_file(file_path, lines):
    fp = open(file_path, 'w')
    fp.writelines(lines)
    fp.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('csv_file_path', help='Path of CSV file')
    parser.add_argument('json_file_path', help='Path pf JSON file')
    args = parser.parse_args()
    csvFilePath = args.csv_file_path
    jsonFilePath = args.json_file_path
    convert(csvFilePath, jsonFilePath)
