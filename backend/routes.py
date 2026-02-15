from bson import ObjectId
from datetime import date
from flask import Blueprint,jsonify,request,current_app

from flask_jwt_extended import jwt_required

routes_bp=Blueprint('routes',__name__)

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
