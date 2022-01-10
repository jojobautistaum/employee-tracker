# Employee Tracker
  [![License](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

  ## Description
  This is a command-line application with menu to use CRUD for MySQL Database manipulation. It uses inquirer for menu and input and MySql2 for Database query.

  ## Table of Contents
  * [Installation](#installation) 
  * [Usage](#usage) 
  * [Tech/Framework](#tech)
  * [License](#license)
  * [Contributing](#contributing) 
  * [Questions](#questions)

  ## Installation <a id="installation"></a>
  * In order to run this app, please install the following dependencies: <br />
  **npm i express, inquirer, mysql2, dotenv**

  * Database and Table creation then add some records. Make sure you are in the root directory of the app.
  >> i.e. /c/Users/Jojo/Full-Stack-Developer/employee-tracker/
  1. Login to you mysql in the commandline: 
  >> mysql -u root -p
  2. Run the following to create the Database employee_tracker_db:
  >> source db/db.sql
  3. Run the following to create the following tables: department, role and employee:
  >> source db/schema.sql
  4. Run the following to add rows to all tables:
  >> source db/seeds.sql

  ## Usage <a id="usage"></a> 
  Run the following to start the app:
  > npm start <br />
  > OR <br />
  > node server.js

  ## Snapshots
  ### Menu
  ![menu](https://user-images.githubusercontent.com/90885263/148718433-30a5d57c-5b24-4b63-92b8-2624fcd66170.jpg) <br/>

  ### Department Table 
  ![Department-Table](https://user-images.githubusercontent.com/90885263/148718508-20aee800-bef7-4bba-b89a-879f540c8581.jpg) 

  ### Role Table
  ![Role-Table](https://user-images.githubusercontent.com/90885263/148718531-67df8268-9e43-4c03-8729-90e51f6c40d6.jpg) 

  ### Employee Table 
  ![Employee-Table](https://user-images.githubusercontent.com/90885263/148718554-7c14ec97-39ca-4df1-88a4-ce472cbc7af5.jpg) 

  ### Total Budget by Department 
  ![Department-Budget](https://user-images.githubusercontent.com/90885263/148718626-a92db742-12c3-4066-9b83-2dd38243258d.jpg)


  ### Watch the video on how to use this App:
  ![How to Use this App](https://user-images.githubusercontent.com/90885263/146711622-823b2840-9b11-4cc8-89cc-51b5c13cb33b.mp4)

  
  ## Tech/Framework <a id="tech"></a>
  * Node.js
  * Inquirer
  * MySQL
  * Dotenv
  * JavaScript Class
  * Screencastify

  ## License <a id="license"></a>
  This project is licensed under the MIT license

  ## Contributing <a id="contributing"></a>
  Please contribute by fixing an issue.

  ## Questions <a id="questions"></a>
  For questions about this app, please email me at gjojob@yahoo.com.
  
  Thank you for using my app.

  You may also reachout to me in my GitHub profile: https://github.com/jojobautistaum