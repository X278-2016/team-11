# Uber-style Labor Dispatch Using Remote Monitoring Data

The application processes sensor data to dispatch an appropriate user if something is wrong.

## Running the Django application

First, run `npm install && bower install` to make sure all dependencies are included. Next, navigate into the "djangodispatcher" service. Once here, run `"./node_modules/.bin/webpack" -d`. This command will look inside the "index.js" and "webpack.config.js" files and compile the react code appropriately. This command should be run each time react code is edited. After that, run `python manage.py makemigrations dispatcher`. This prepares the database migrations for the dispatcher application based on the models. After the migrations have been prepared, run `python manage.py migrate`. These commands should be run each time a model is updated to create the necessary database table changes. Finally, run `python manage.py runserver`. The first time the server is started, navigate to `/initialize`. This endpoint creates sample data.

Commands:

`"./node_modules/.bin/webpack" -d`: compile JSX if UI was updated

`python manage.py makemigrations dispatcher`: prepare model changes

`python manage.py migrate`: update tables according to model changes

`python manage.py runserver`: start the python server

`python manage.py flush`: clear all data in the existing tables

Endpoints:

`/`: the home screen (differs based on user type)

`/api/currentuser`: returns information about the currently logged in user

`/api/activetasks`: returns the active tasks that are assigned to the logged in user

`/api/completedtasks`: returns the completed tasks that were assigned to the logged in user

`/api/finishtask`: POST request marks task sent in parameters as complete

`/api/delegate`: POST request with sensor data assigns user to task


`/api/allusers`: operator endpoint that returns user data

`/api/sensors`: operator endpoint that returns sensor (site) locations

`/api/totaldata`: operator endpoint that provides data about tasks occurring at each location


`/initialize`: creates sample set of data

## Running the Spring Server

Import 'Analysis' as gradle project. This folder only contains src/ and build.gradle. If this does not work, create your own gradle project and then copy src into it and use the build.gradle provided here. To generate the gradle wrapper, run `gradle wrapper`.

Run the command `./gradlew build && java -jar build/libs/gs-spring-boot-0.1.0.jar`
