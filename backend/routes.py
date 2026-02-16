from bson import ObjectId
from datetime import date
from flask import Blueprint,jsonify,request,current_app

from flask_jwt_extended import jwt_required,get_jwt_identity

routes_bp=Blueprint('routes',__name__)


@routes_bp.route("/user", methods=["POST"])
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


@routes_bp.route("/helper", methods=["POST"])
@jwt_required()
def get_helper():

    user_id = get_jwt_identity()

    helper = current_app.collection_helpers.find_one({"_id": ObjectId(user_id)})

    helper["_id"] = str(helper["_id"])

    return jsonify(helper), 200

@routes_bp.route("/helpers", methods = ["POST"])  
@jwt_required()  
def get_punti():

    helpers=list(current_app.collection_helpers.find())

    if not helpers:
         return jsonify({"error": "Helpers not found!"}),404

    for helper in helpers:
        helper["_id"] = str(helper["_id"])

    return jsonify(helpers),200


@routes_bp.route("/reviews_helpers", methods = ["POST"])  
@jwt_required()  
def get_review_helpers():

    reviews=list(current_app.collection_reviews.find())

    for review in reviews:
        review["_id"] = str(review["_id"])
        review["helper_id"] = str(review["helper_id"])
        review["reviewer_id"] = str(review["reviewer_id"])

    return jsonify(reviews),200

@routes_bp.route("/save_review", methods = ["POST"])
@jwt_required()
def save_review():

    data = request.get_json()
    helper_id = ObjectId(data.get("helper_id"))
    reviewer_id = data.get("reviewer_id")
    rating = data.get("rating")
    review_text = data.get("review_text")

    review = {
        "helper_id": helper_id,
        "reviewer_id": reviewer_id,
        "rating": rating,
        "review_text": review_text,
        "date": date.today().strftime("%d/%m/%Y")
    }

    res= current_app.collection_reviews.insert_one(review)

    if not res:
         return jsonify({"error": "Review Not Saved!"}), 500

    else:
        return jsonify({"message": "Review Saved!"}), 201

@routes_bp.route("/update_data", methods=["POST"])
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
