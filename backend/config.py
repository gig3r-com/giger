# Values are loaded from file .config.json
#
# Example:
#
# {
#   "postgres": {
#     "username": "giger",
#     "password": "superSecuredPassword1",
#     "host": "localhost",
#     "database": "postgres"
#   },
#   "flask": {
#     "host": "127.0.0.1",
#     "port": "7315",
#     "debug": true
#   }
# }


import json

with open(".config.json") as file:
    config_file = json.load(file)

SQLALCHEMY_DATABASE_URI = \
    f'postgresql://{config_file["postgres"]["username"]}:{config_file["postgres"]["password"]}' \
    f'@{config_file["postgres"]["host"]}/{config_file["postgres"]["database"]}'
SQLALCHEMY_TRACK_MODIFICATIONS = False

SERVER_NAME = f'{config_file["flask"]["host"]}:{config_file["flask"]["port"]}'
DEBUG = config_file["flask"]["debug"]
