from cs50 import SQL
<<<<<<< HEAD
from flask import Flask, flash, redirect, render_template, request, jsonify
import re
import os

=======
from flask import Flask, flash, redirect, render_template, request, session, jsonify
from flask_session import Session
from tempfile import mkdtemp
from werkzeug.exceptions import default_exceptions
from werkzeug.security import check_password_hash, generate_password_hash
import re
import os

#from helpers import apology, login_required, lookup, usd
#from helpers import lookup

>>>>>>> ed5f5cbf5a5f71ba678fcbd264411f15dd2166ff
# Configure application
app = Flask(__name__)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///location.db")
<<<<<<< HEAD
    
=======


# Ensure responses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


# Configure session to use filesystem (instead of signed cookies)
    app.config["SESSION_FILE_DIR"] = mkdtemp()
    app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "filesystem"
    Session(app)


>>>>>>> ed5f5cbf5a5f71ba678fcbd264411f15dd2166ff
@app.route("/")
def index():
    """Render map"""
    if not os.environ.get("API_KEY"):
        raise RuntimeError("API_KEY not set")
    return render_template("index.html", key=os.environ.get("API_KEY"))

<<<<<<< HEAD
=======
    #return render_template("index.html")


>>>>>>> ed5f5cbf5a5f71ba678fcbd264411f15dd2166ff
@app.route("/update")
def update():
    """Find all locations within view"""

    # Ensure parameters are present
    if not request.args.get("sw"):
        raise RuntimeError("missing sw")
    if not request.args.get("ne"):
        raise RuntimeError("missing ne")

    # Ensure parameters are in lat,lng format
    if not re.search("^-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?$", request.args.get("sw")):
        raise RuntimeError("invalid sw")
    if not re.search("^-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?$", request.args.get("ne")):
        raise RuntimeError("invalid ne")

    # Explode southwest corner into two variables
    sw_lat, sw_lng = map(float, request.args.get("sw").split(","))

    # Explode northeast corner into two variables
    ne_lat, ne_lng = map(float, request.args.get("ne").split(","))


    # Find all locations of mass shootings within view, pseudorandomly chosen if more within view
    if sw_lng <= ne_lng:

        # Doesn't cross the antimeridian
        rows = db.execute("""SELECT * FROM location
                          WHERE :sw_lat <= lat AND lat <= :ne_lat AND (:sw_lng <= long AND long <= :ne_lng)
                          ORDER BY RANDOM()
                          LIMIT 50""",
                          sw_lat=sw_lat, ne_lat=ne_lat, sw_lng=sw_lng, ne_lng=ne_lng)

    else:

        # Crosses the antimeridian
        rows = db.execute("""SELECT * FROM location
                          WHERE :sw_lat <= lat AND lat <= :ne_lat AND (:sw_lng <= long OR long <= :ne_lng)
                          ORDER BY RANDOM()
                          LIMIT 50""",
                          sw_lat=sw_lat, ne_lat=ne_lat, sw_lng=sw_lng, ne_lng=ne_lng)

    # Output places as JSON
<<<<<<< HEAD
    return jsonify(rows)
=======
    return jsonify(rows)


# @app.route("/search")
# def search():
#     """Search for places that match query"""

#     if not request.args.get("q"):
#         raise RuntimeError("no entry")

#     # source: https://stackoverflow.com/questions/8520469/how-to-select-using-both-wildcards-like-and-array-in
#     else:
#         q = request.args.get("q") + "%"
#         print("PRINTING++++++++++++++++++")
#         return jsonify(db.execute("SELECT * FROM cities WHERE city LIKE :q", q=q))

# @app.route("/login")
# @login_required
# def index():
>>>>>>> ed5f5cbf5a5f71ba678fcbd264411f15dd2166ff
