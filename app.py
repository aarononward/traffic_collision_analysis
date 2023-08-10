import sqlalchemy as sql
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import json
from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = sql.create_engine("sqlite:///data/traffic_db.sqlite")

# reflect an existing database into a new model
#Base = automap_base()
# reflect the tables
#Base.prepare(autoload_with=engine)

# Save reference to the table
#Data = Base.classes.traffic_db

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

#display endpoint options
@app.route("/")
def welcome():
    return (
        f"Available Routes:<br/>"
        f"/map<br/>"
        f"/data<br/>"
    )


#map endpoint
@app.route("/map")
def map():
    return render_template('index.html')


#All Data endpoint
@app.route('/data')
def return_data():
    results = engine.execute('select * from traffic_db').fetchall()
    sf_collisions=[]
    for each_result in results:
        collision = dict(each_result)
        sf_collisions.append(collision)
    return jsonify(sf_collisions)

@app.route('/images')
def images():
    return render_template('image.html')






if __name__ == '__main__':
    app.run(debug=True)
