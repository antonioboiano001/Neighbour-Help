from bson import ObjectId
from flask import Blueprint, jsonify, request, current_app

from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from werkzeug.security import generate_password_hash, check_password_hash


auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/user", methods=["POST"])
@jwt_required()
def get_user_id():

    user_id = get_jwt_identity()

    user = current_app.collection_users.find_one({"_id": ObjectId(user_id)})

    user["_id"] = str(user["_id"])

    user.pop("password", None)

    if not user:
        return jsonify({"error": "User don't exist"}), 404
    else:
        return jsonify(user), 200


@auth_bp.route("/helper", methods=["POST"])
@jwt_required()
def get_helper():

    user_id = get_jwt_identity()

    helper = current_app.collection_helpers.find_one({"_id": ObjectId(user_id)})

    helper["_id"] = str(helper["_id"])

    return jsonify(helper), 200


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = current_app.collection_users.find_one({"email": email})

    if user and check_password_hash(user["password"], password):

        access_token = create_access_token(identity=str(user["_id"]))
        return jsonify({"access_token": access_token}), 200 #ok sucesso generico 

    else:

        return jsonify({"error": "Email or password wrong"}), 401 #credenziali errate


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()
    name = data.get("information").get("name")
    surname = data.get("information").get("surname")
    phone_number = data.get("information").get("phone_number")
    email = data.get("email")
    password = data.get("password")
    helper_is = data.get("helper_is")

    user = current_app.collection_users.find_one({"email": email})

    if user:
        return jsonify({"error": "Email already in use."}), 409

    user_id = ObjectId()

    new_user = {
            "email": email,
            "password": generate_password_hash(password),  # stringa hashata
            "information": {
                "name": name,
                "surname": surname,
                "phone_number": phone_number,
            },
            "helper_is": helper_is,
        }
    
    res=current_app.collection_users.insert_one(new_user)

    if not res:
        return jsonify({"error": "User not registered"}), 401

    if helper_is:

        description = data.get("description")
        lat = data.get("location").get("lat")
        lon = data.get("location").get("lon")

        new_helper = {
            "_id": user_id,
            "information": {
                "name": name,
                "surname": surname,
                "phone_number": phone_number,
            },
            "location": {"lat": lat, "lon": lon},
            "description": description,
        }

        res=current_app.collection_helpers.insert_one(new_helper)
        if not res:
            return jsonify({"error": "User not registered as a helper"}), 401


    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.route("/update_data", methods=["POST"])
@jwt_required()
def update_data():

    user_id = get_jwt_identity()

    data = request.get_json()

    helper_is =data.get("helper_is")

    name = data.get("information").get("name")
    surname = data.get("information").get("surname")
    phone_number = data.get("information").get("phone_number")
    email = data.get("email")

    if helper_is:

        lat = data.get("location").get("lat")
        lon = data.get("location").get("lon")
        description = data.get("description")

        response = current_app.collection_users.update_one(
            {"_id": ObjectId(user_id)},
            {
                "$set": {
                    "email": email,
                    "information": {
                        "name": name,
                        "surname": surname,
                        "phone_number": phone_number,
                    }
                }
            }
        )

        response2 = current_app.collection_helpers.update_one(
            {"_id": ObjectId(user_id)},
            {
                "$set": {
                    "information": {
                        "name": name,
                        "surname": surname,
                        "phone_number": phone_number,
                    },
                    "location": {"lat": lat, "lon": lon},
                    "description": description
                }
            }
        )

        

    else:

        response = current_app.collection_users.update_one(
            {"_id": ObjectId(user_id)},
            {
                "$set": {
                    "email": email,
                    "information": {
                        "name": name,
                        "surname": surname,
                        "phone_number": phone_number,
                    }
                }
            }
        )

    if response:
        return jsonify({"message": helper_is}), 201
    else:
        return jsonify({"message": "User data cheanged successfully"}), 200
