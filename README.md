# Traffic Collision Analysis in San Francisco
#### City of San Francisco Traffic Collision Analysis

# Group 3
team members: Aaron Morataya-Rodriguez, Bethania Sequera, Juliana Lima, Michael Bernstein, Nasr Salahuddin, Zohair Zulfiqar. 

# Overview
Welcome to our project, where we analyze traffic collision data in the City of San Francisco. This project aims to answer questions related to the most dangerous locations, factors contributing to increased collisions, collision types in different areas, and the impact of the pandemic on traffic safety. We will create a Python Flask API-powered web application with interactive visualizations to present the findings in a clear and user-friendly manner.
We will use the City of San Francisco's public data API, which provides information on traffic collisions resulting in injury. The dataset contains traffic collision records with details such as location coordinates, date, time, collision type, and weather conditions.

## Questions Explored

The analysis addresses the following questions:

1. What areas in San Francisco have the highest density of collisions?
2. Were there fewer accidents during the COVID-19 lockdowns compared to the present?
3. Are fatal accidents more prevalent than non-fatal accidents?
4. Do densely populated areas experience more car accidents?
5. Which days of the week experience the highest frequency of accidents?

## Target Audience

This analysis caters to a diverse audience concerned with traffic safety, including:

- First Responders
- Traffic Engineers
- Urban Planners
- Logistic Companies
- Insurance Companies
- Work From Home Policy Creators

## Data Discovery and ETL

### Data Set
The data used in this analysis is sourced from San Francisco Police Department (SFPD) and San Francisco Department of Public Health (SFDPH). It encompasses all injury-causing crashes in San Francisco and is updated quarterly. Each API call returns up to 1,000 records.

### ETL Process
1. **Extract**: API requests are made to fetch data, which is then transformed into a Pandas dataframe from the resulting JSON.
2. **Transform**: Data cleaning involves dropping rows without latitude/longitude data or collision time, converting data types, and binning incidents based on time of day.
3. **Load**: The cleaned data is saved as an SQLite database.

## Flask Web Application

A Flask-based web application provides interactive visualizations and insights derived from the analysis.

### Routes
- `/map`: Displays the crash locations on an interactive map with JavaScript visualization.
- `/data`: Provides access to the data stored in the SQLite database.
- `/images`: Presents various chart analyses.

### Demos

Access the web app locally through: [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

## Visualizations

### Visualization #1: Positive Effects of WFH
This visualization compares collision rates before, during, and after the COVID-19 pandemic, exploring potential positive impacts from Work From Home policies.

### Visualization #2: Safety During Rush Hour?
An analysis of the most dangerous times to drive in San Francisco, examining if rush hour is truly the riskiest time.

### Visualization #3: Fridays and Collisions
An investigation into correlations between Fridays and accident occurrences, shedding light on potential factors influencing these patterns.

## Insights

Key findings from the analysis include:

- Non-fatal traffic accidents are more common in San Francisco.
- Noticeable variations in traffic accidents are observed during and post COVID-19 lockdowns.
- Accidents are most frequent at the end of the week and concentrated in the downtown area.
- Van Ness Avenue and Market Street have the highest incidence of traffic accidents.

## Challenges

The analysis faced several challenges:

- Designing informative pop-up icons for the traffic collision map.
- Attempting to include outlines of different neighborhoods on the map, which was complex due to the numerous neighborhoods in San Francisco.
- Developing bar graphs for post-COVID and pre-COVID collision analysis.

Feel free to explore the repository's code, data, and visualizations to gain a deeper understanding of San Francisco's traffic accident patterns.
