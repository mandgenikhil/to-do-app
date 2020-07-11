# to-do-app
Create TO-DO App Using Python-Django-React JS Stack

Requirements 

1. Python(>=3.6)
2. Django(3.0.8)
3. rest_framework and rest_auth
4. Node-NPM and React JS
5. Docker
6. Docker Compose

In order to run the web app, we can use following docker-compose commands to run the web app.

1. go to to-do-app/to_do_app/ directory where docker-compose.yml is present.
2. after insattling Docker and Docker-Compose, use the follwoing commands, 

>sudo docker-compose build

this will build the entire web app into docker image as to-do, after building type following command

>sudo docker-compose up -d 

this will run your docker conatiner (to-do) and make it as back ground process.

Note:- I have used linux environment for development.



