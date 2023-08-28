# TODO: Add database URI
import os

SQLALCHEMY_DATABASE_URI = f'postgresql://{os.getenv("POSTGRES_USERNAME")}:{os.getenv("POSTGRES_PASSWORD")}@localhost/giger'
SQLALCHEMY_TRACK_MODIFICATIONS = False
