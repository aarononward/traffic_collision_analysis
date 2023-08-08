import sqlalchemy as sql
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import json
from flask import Flask, jsonify


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

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/data<br/>"
        f"/accident_map<br/>"
        f"/graphs"
    )


#All Data endpoint

@app.route('/data')
def return_data():
    results = engine.execute('select * from traffic_db').fetchall()
    sf_collisions=[]
    for each_result in results:
        collision = dict(each_result)
        sf_collisions.append(collision)
    return jsonify(sf_collisions)




###################################################################
#Nasr's Map end point#
###################################################################
# @app.route('/accident_map')




if __name__ == '__main__':
    app.run(debug=True)