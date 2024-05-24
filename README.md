 good day how are you  , thanks you  for allowing me to go throught this challenge  ,


  to be able to run the solution,  you can  dowload  the solution and  then  you run npm install

  after installatio  you procced to  create a .env  file witht the following  variables

DATABASE_HOST=localhost


DATABASE_PORT= 3306


DATABASE_USER=root


DATABASE_PASSWORD=root


DATABASE_NAME='database'



PORT = 3000



after that run npm run dev to start the server and go to http://localhost:3000/api to access the swagger api server




 my process flow when like this,




 first i started with database creation and table creation




 created a database  and 4 tables for each entity that i was given,




 also managed to populate the  4 tables with the data that i was given  on excels




 the entities  of the tables are located in the models directory




 after populating the tables i went on create few endpoints of for  intersing new data  also



after that i went on create an algorithm to search for items in the database


 in the service directory there are files which contain logic and some functions  for the operations



 and the  controllers thats where endpoints are located which ahve been linked to the logic created in the services


Using the constraints mentioned in the  document

for optimal performance i managed to combine the  search query into a single query

and i also added pagination  so that also i wont load all the infomation into  the memory, so the results are also  based on search query and params


one of the setback i faced was trying to add a regex on my query so that i would be able to  filter related results , the solution that i tried was causing some errors  in the syntax  and i couldnt find a proper solution



my alternative was to  i implemented it on a non optimal solution though





