# Traffic Collision Analysis
#### City of San Francisco Traffic Collision Analysis

#### Overview
Welcome to our project, where we analyze traffic collision data in the City of San Francisco. This project aims to answer questions related to the most dangerous locations, factors contributing to increased collisions, collision types in different areas, and the impact of the pandemic on traffic safety. We will create a Python Flask API-powered web application with interactive visualizations to present the findings in a clear and user-friendly manner.

We will use the City of San Francisco's public data API, which provides information on traffic collisions resulting in injury. The dataset contains traffic collision records with details such as location coordinates, date, time, collision type, and weather conditions.

#### API: https://data.sfgov.org/Public-Safety/Traffic-Crashes-Resulting-in-Injury/ubvf-ztfx 

--------------
#### Process:
 - Request API endpoint using the crash data
 - Use pandas to clean up the data received
 - Save this data as a SQLite database
 - Create a flask app with different endpoints
     - One endpoint should read from the SQLite database and return a jsonified result
         - Graphs:
             - Crash data per year bar graphs
             - Crash data 2018 - 2023 line graph
         - Map for crash data
 - Create an html index file
 - Accesses all the libraries used in the dashboard
 - Display all the page content we want to show
 - Create a logic js file
 - Fetches tile layers and sets up the map
 - Uses d3 to fetch data from the endpoint (from flask app)
 - Create style .css file
   
--------------
#### Project Structure
- data_processing.py: Contains data preprocessing and cleaning functions.
- database.py: Sets the SQLite database and handles data storage and retrieval.
- app.py: Implements the Python Flask API, connects to the database, and defines API endpoints.
- static: Contains JavaScript and CSS files for the frontend web application.
- templates: Holds HTML templates for the webpages displaying visualizations.
  
--------------
#### Getting Started
- Clone this repository to your local machine.
- Install the required Python packages using pip install -r requirements.txt.
- Run python data_processing.py to preprocess the data and set up the database.
- Execute python app.py to start the Flask server and API.
- Access the web application at http:

--------------
We are excited to present our analysis on City of San Francisco traffic collisions. Our team has worked diligently to ensure the project meets all the requirements and delivers valuable insights. We look forward to showcasing our findings and sharing our data story with the audience during the presentation.

If you have any questions or feedback, please feel free to reach out to any of our team members. Let's make this presentation a great success together!

#### Audience:
 - Urban planners
 - First Responders
 - Insurance Companies
 - Traffic Engineers
 - Logistic Companies
 - Police Departments
 - Law Enforcement
 - Business wfh policies

---------------
#### Team Members:
Aaron Morataya-Rodriguez
Bethania Sequera
Juliana Lima 
Michael Bernstein
Nasr Salahuddin
Zohair Zulfiqar

Thank you for your attention, and see you in the presentation!
