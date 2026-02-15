import os
from flask import Flask
from pymongo import MongoClient
from auth import auth_bp
from routes import routes_bp
from flask_jwt_extended import JWTManager


MONGO_DB = os.getenv("MONGO_DB")
MONGO_HOST = os.getenv("MONGO_HOST")
MONGO_USER = os.getenv("MONGO_USER")
MONGO_PASSWORD = os.getenv("MONGO_PASSWORD")
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

jwt=JWTManager()

def create_app():
    
    app = Flask(__name__)

    app.config["JWT_SECRET_KEY"] = JWT_SECRET_KEY

    jwt.init_app(app)

    mongo_uri = (
        f"mongodb://{MONGO_USER}:{MONGO_PASSWORD}"
        f"@{MONGO_HOST}:27017/{MONGO_DB}"
        f"?authSource=admin"
    )
    
    client = MongoClient(mongo_uri)

    db = client[MONGO_DB]

    collection_users = db["Users"]
    collection_helpers = db["Helpers"]
    collection_reviews = db["Reviews"]

    app.collection_users = collection_users
    app.collection_helpers = collection_helpers
    app.collection_reviews = collection_reviews

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(routes_bp, url_prefix="/routes")

    return app
