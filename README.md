# Project Title: DevTour


DevTour is a simple web application, aiming to build a platform for students, especially programming beginners, to play mini games to experience as a developer and to communicate with each other. Users can log in their accounts and play the game, and also leave their own comments and walkthroughs in the chat board. Our vision is to let users, especially novices in programming, understand the experience of being a software developer and engineer through the story of the game, and to create a platform for beginners and masters to communicate and discuss.


## Done

We have used front-end interaction and storage of user data. The user can successfully register, log in and log out through the login system, and the administrator can log in and modify the user account information and add new administrator account through the administrator login interface. After logging in, the user enters the main interface. The main interface includes the game interface and the comment interface.

In the game interface, we have realized the operation logic of the game, mainly completed the front-end part of the user interaction, the back-end part of the game data saving function needs to be added. In the user chat interface, users can post their own comments and comment on others' comments...

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

Please first clone the repo
```sh
git clone https://github.com/1155124617/CSCI3100.git
```
![image](https://github.com/1155124617/CSCI3100/blob/master/demo_images/1.png)
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
After that, please unzip the file main_page.zip and put the unzipped directory main_page into the directory 3100_proj:
```sh
unzip main_page.zip
mv main_page ./3100_proj
```
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




### User Reg & Login System

First the user should sign up to login. The URL of the sign-up form is http://domain/sign_up/index.html. You shall input one distinct username and your password for this account to complete the sign-up procedure. After you successfully sign up, the page will be redirected to the sign-in page. Then you can input your account information to sign in. If success, you will go into the main page of the DevTour.

### Administrator System

### Chat Board System

Chat Board can be reached from the main page. It requires the user to first login. You could add a new comment to the chat board. You also are able to reply others' comments by jusst clicking the "Reply" button. Once you add or reply some comments, the page would be re-rendered. Your comment would be sent the back-end server which stores your comment information to the database. The comment needs to input your name, subject and comment content. In addition, you could also select a color for the comment header. 

### Game System



## Release History

* 0.1.0
    * CHANGE: Login and Reg System
* 0.2.0
    * CHANGE: Administrator System: CUD user account, C admin account
* 0.3.0
    * CHANGE: Basic Comment System
* 1.0.0
    * CHANGE: Basic Game System

## Authors

* **YU Yue** 1155124490
* **DING Baizeng** 1155124617

## Reference
