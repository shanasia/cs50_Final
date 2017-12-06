# Mayu Takeda and Shanasia Sylman
# CS50 - Malan,  Fall 2017
# December 8, 2017
//====================================================================//
# This documentation is to be a user’s manual for your project. 
# how and where, if applicable, to `compile`, `configure`, and `use` your project. 

# It should not be necessary for us to contact you with questions regarding your project after its submission. 
# Hold our hand with this documentation; be sure to answer in your documentation any questions that you think we might have while testing your work.
//====================================================================//

                                                ## Mass Shootings Website ##

This README file provides documentation for running the Mass Shootings Website authored by Mayu Takeda and Shanasia Sylman.
This an educational website that shares information on mass shooting events and statistics.
The structure of this documentation is as follows:

    `Necessary Applications`
    `Accompanying Files and Sturctures`
    `Running the Website`

                                                ## Necessary Applications ##
                                            ####### Languages utilized:
                                            * PYTHON
                                            * HTML
                                            * CSS
                                            * JAVASCRIPT
                                            * SQL
                                            * PHP
                                            #######
CS50 IDE
    * The intergrated development environment provided by Harvard's CS50 course and used to develop the website 
Flask (http://flask.pocoo.org/docs/0.12/)
    * Python-framework that simplifies the use of Python's already built-in HTTP server library
Google Maps API KEY (https://developers.google.com/maps/documentation/javascript/get-api-key)
    * An individual API KEY needs to be generated and add to the operating system environment in order to display and run the Google Map interface
    * Once Google fulfills the key request, follow this process for saving said key to the work (IDE) environment:
        * ~ $ `export API_KEY=value`
        (where `value` is the key provided to you)

                                            ## Accompanying Files and Structures ##
This website is built with the following files:
        `application.py`
        `locations.db`
        `index.html`
        `blog.css`
        `bootstrap.min.css`
All files must be within the same main folder, e.g. `cs50_Final`. For the needs of Flask, `index.html` must be in a subfolder called `templates` and all 
css files (`blog.css` and `bootstrap.min.css`) must be in a subfolder called `static`.

                                                ## Necessary Applications ##
        