# 3100 Project: DevTour


DevTour is a simple web application, aiming to build a platform for students, especially programming beginners, to play mini games to experience as a developer and to communicate with each other. Users can log in their accounts and play the game, and also leave their own comments and walkthroughs in the chat board. Our vision is to let users, especially novices in programming, understand the experience of being a software developer and engineer through the story of the game, and to create a platform for beginners and masters to communicate and discuss.


## Done

We have used front-end interaction and storage of user data. The user can successfully register, log in and log out through the login system, and the administrator can log in and modify the user account information and add new administrator account through the administrator login interface. After logging in, the user enters the main interface. The main interface includes the game interface and the comment interface.

In the game interface, we have realized the operation logic of the game, mainly completed the front-end part of the user interaction, the back-end part of the game data saving function needs to be added. In the user chat interface, users can post their own comments and comment on others' comments.

### Language & Tools
* Front-end: HTML5 CSS3 Bootstrap JavaScript jquery Ajax 
* Back-end: NodeJS Express MySQL


## Getting Started

Make sure that you have Google Chrome, MySQL, and NodeJS installed in your environment. In the test phase, we will use the MacOS Big Sur 11.1, Google Chrome V89.0.4389.90, NodeJS V13.9.0 and MySQL V8.0.21 as the testing environment. Please refer to the following steps to configure your environment.

* NodeJS Download: https://nodejs.org/zh-cn/download/
* MySQL Download: https://www.mysql.com/cn/downloads/
* MySQL Configuration (for testing, please change to your preferance):
  * host: localhost
  * user: root
  * password: yy990525
  * database: CSCI3100
* Database Table Schema:
  * user(username varchar(20) not null, password varchar(20) not null, primary key(username));
  * admin(username varchar(20) not null, password varchar(20) not null, primary key(username));
  * chat(id int auto_increment, pid int not null, username varchar(20) not null, comment varchar(300) not null, subject varchar(20) not null, time varchar(50) not null, primary key(id)); 


## System Intro & Demo
1. 
Please first clone the repo
```sh
git clone https://github.com/1155124617/CSCI3100.git
```
```
filetree CSCI3100 
├── GroupA5 Project Initial Design Report.docx
├── demo_images
├── 3100_proj.zip
├── main_page.zip
└── README.md
```
Please unzip the file 3100_proj.zip:
```sh
unzip 3100_proj.zip
```
<img width="50%" height="50%" src="https://github.com/1155124617/CSCI3100/blob/master/demo_images/configuration/1.png"/>

```
filetree 3100_proj
├── sign_in
├── sign_up
├── admin
├── main_page
├── server.js
├── node_modules
├── package-lock.json
└── package.json

```
<div align="center"><img width="50%" height="50%" src="https://github.com/1155124617/CSCI3100/blob/master/demo_images/configuration/2.png"/></div>

Please configure the database as shown below：

<img width="50%" height="50%" src="https://github.com/1155124617/CSCI3100/blob/master/demo_images/configuration/3.png"/>

After that, you can set up the NodeJS server as follows, make sure you have downloaded NodeJS in your computer:

<img width="50%" height="50%" src="https://github.com/1155124617/CSCI3100/blob/master/demo_images/configuration/4.png"/>

Finally, you can open Chrome and enter:
```sh
localhost:8081/sign_in/index.html
```

Please have fun with our web application! :)



### User Reg & Login System

First the user should sign up to login. The URL of the sign-up form is http://domain/sign_up/index.html. You shall input one distinct username and your password for this account to complete the sign-up procedure. After you successfully sign up, the page will be redirected to the sign-in page. Then you can input your account information to sign in. If success, you will go into the main page of the DevTour.

### Administrator System

### Chat Board System

Chat Board can be reached from the main page. It requires the user to first login. You could add a new comment to the chat board. You also are able to reply others' comments by jusst clicking the "Reply" button. Once you add or reply some comments, the page would be re-rendered. Your comment would be sent the back-end server which stores your comment information to the database. The comment needs to input your name, subject and comment content. In addition, you could also select a color for the comment header. 

### Game System
In the latest version 1.0.1, we have finished the Game logic and the user interface optimization. For Game Logic, we have used a few events to demonstrate the process. To be more specific, we change the status of the user according to their choices and when the status of the user reach a threshold value, game is over (just for initial demo). We will make the structure of the game more complicated and reach the goal of saving and loading in the next phase. For the user interface, we designed it based on the booklet plugins and we tried to put the game question in the right side page of the book and the status is displayed in the left hand side page. 


## Release History

* 0.1.0
    * CHANGE: Login and Reg System
* 0.2.0
    * CHANGE: Administrator System: CUD user account, C admin account
* 0.3.0
    * CHANGE: Basic Comment System
* 1.0.0
    * CHANGE: Basic Game System
* 1.0.1
    * CHANGE: Fix the server bug, optimize the interface of Game System and update the documentation

## Authors

* **YU Yue** 1155124490
* **DING Baizeng** 1155124617
* **CHANG Chirui** 1155124553
* **LYU An** 1155124488

## Reference
* https://www.bootstrapdash.com/product/skydash-admin-template/
* https://colorlib.com/wp/template/login-form-v1/
* https://colorlib.com/wp/template/login-form-v8/
* https://www.jq22.com/jquery-info2490
* http://builtbywill.com/
* https://www.jq22.com/demo/jquery-fanshu-150325215701/


