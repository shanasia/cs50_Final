# Mayu Takeda and Shanasia Sylman
# CS50 - Malan,  Fall 2017
# December 8, 2017

                                                            ## BACKGROUND ##

# Mayu and I, as urban planning graduates students, are deeply interested in the spatial representations of highly relevant urban 
# phenomena. Much of the datasets we work with are geospatial in nature and it is our jobs as planners and designers to not only
# analyze the data, but tell a story with it. As avid ESRI ArcMap users, we were interested in how we can combine what we learned in
# CS50 with what we use for our other studies. In particular, ESRI has an application called "Story Maps" (https://storymaps.arcgis.com/en/)
# which combine the power front end development with the art of story-telling through spatial representations. Now, ESRI, being a 
# succesful private company distribute the code for this service, but only guides users through their template process to create their
# own. With our newfound knowledge of computer science, this project is our first attempt at recreate the same experience "from scratch."

                                                            ## OVERALL DESIGN ##
ESRI Story Maps are typically one-page websites that guide the user through a story-telling experience. As the user scrolls, new 
sections of the story are revealed. Our website, "Mass Shootings" is also a one-page website composed of three sections: an 
introduction image, a introductory description to the subject-matter (Mass Shootings) and an interactive map. 

                                                                ## BACK END ##
Because of our one-page style, our back-end programming is quite staright forward and simple. Implemented with Python utilizing Flask 
functionality, our website contains two routes: the root '/' and '/update'. Our root just renders the one display page, which contains 
the Google Maps API and update inorporates the information from our database, locations.db (discussed below), which is responsively 
displayed on the map.

We utilize one relational database, location.db, which contains a dataset of the top 50 deadliest mass shootings, i.e. events with the 
highest death tolls. The goal is displaying this dataset is to have the user engage with the global distribution of prominent mass 
shooting events.

                                                                ## FRONT END ##
We have one HTML file that was modified from the Blog Template provided by Bootstrap (http://getbootstrap.com). The template really 
just provided a basic framework for style sheets (bootstrap.css and blog.css) that were then modify and made to serve our own purposes. 

The CSS functionality that we incorporated into the blog template that was key to mimicking the ESRI Story Map structure was `Parallax`.
This is a hot and trendy website scrolling capability that gives the story map a fluid transition throughout the sections of the site.
Though we keep our website short with three sections, we know now how to incorporate more sections that could add more layers and complexity
to the website experience and story.

[javascript]