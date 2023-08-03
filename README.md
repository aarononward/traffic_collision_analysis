# Traffic Collision Analysis
#### City of SF Traffic Collision Data 
#### API: https://data.sfgov.org/Public-Safety/Traffic-Crashes-Resulting-in-Injury/ubvf-ztfx 
- Questions: where are the most dangerous located and what is causing them to be dangerous?
    - What areas in SF have the highest density of collisions
    - What conditions lead to a higher frequency of collisions? (i.e. time of day, weather)
    - Where are the most dangerous locations, and what is causing them to be dangerous?
        - Which locations have the most injuries/casualities?     
    - Investigate factors that contribute to the increased frequency of collisions at these locations (e.g., road design, traffic volume, etc.).
    - Are there certain areas of SF that have different types of collisions? (i.e. are there more pedestrian vs. vehicle collisions in areas like Golden Gate Park as compared to the Financial District)
    - Was traffic safer during the pandemic compared to now? 
        - If we can incorporate yearly data we can compare collisions during the pandemic to now and make the argument that people working from home is safer for society compared to people commuting into the offices everyday.
--------------
#### PROCESS:
 - Request API endpoint using the crash data (zz)
 - Use pandas to clean up the data received (zz)
 - Save this data as a SQLite database (zz)
 - Create a flask app with different endpoints (ar)
        - One endpoint should read from the SQLite database and return a jsonified result
 - Create an html index file that: (JL)
 - Accesses all the libraries used in the dashboard
 - Display all the page content we want to show
 - Create logic js file (JL)
 - Fetches tile layers and sets up the map(ar)
 - Uses d3 to fetch data from the endpoint (from flask app)
 - Create style .css file
--------------
#### AUDIENCE:
 - Urban planners
 - First Responders
 - Insurance Companies
 - Traffic Engineers
 - Logistic Companies
 - Police Departments
 - Law Enforcement
 - Business wfh policies
