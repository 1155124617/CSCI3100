# 3100 Project: DevTour


DevTour is a simple web application, aiming to build a platform for students, especially programming beginners, to play mini games to experience as a developer and to communicate with each other. Users can log in their accounts and play the game, and also leave their own comments and walkthroughs in the chat board. Our vision is to let users, especially novices in programming, understand the experience of being a software developer and engineer through the story of the game, and to create a platform for beginners and masters to communicate and discuss.

### webpage link: http://1.116.205.71:8081/sign_in/index.html

### demo video link: https://youtu.be/kemoeCB2jWU

## Done

We have used front-end interaction and storage of user data. The user can successfully register, log in and log out through the login system, and the administrator can log in and modify the user account information and add new administrator account through the administrator login interface. After logging in, the user enters the main interface. The main interface includes the game interface and the comment interface.

In the game interface, we have finished a simulation game, players can load her/his save and continue to play the game. The players can also save the game progress and view the top 4 players' score (round of the game). In the game, players can choose her/his choice to balance the health values. The real values of the health cannot be seen and players can only see "red", "yellow" or "green" labels to induce approximate health values. If one of the values is too high or too low, the game will be over.

In the user chat interface, users can post their own comments and comment on others' comments. There are mainly three topics: Walkthrough, Experience sharing and Q & A sections. Users can choose the topic and put their comments or reply others' comments.

### Language & Tools
* Front-end: HTML5 CSS3 Bootstrap JavaScript jquery Ajax 
* Back-end: NodeJS Express MySQL


## Getting Started

You can enter http://1.116.205.71:8081/sign_in/index.html in your browser to play our project. We use Tencent Cloud Service and the link is valid for 1 month !!!

## System Intro & Demo
1. Please first clone the repo
```sh
git clone https://github.com/1155124617/CSCI3100.git
```
```
filetree CSCI3100 
├── GroupA5 Project Initial Design Report.docx
├── admin.zip
├── main_page.zip
├── node_modules.zip
├── sign_in.zip
├── sign_up.zip
├── package-lock.json
├── package.json
├── server.js
└── README.md
```
2. Please unzip the following .zip files:
```sh
unzip sign_in.zip
unzip sign_up.zip
unzip admin.zip
unzip main_page.zip
unzip node_modules.zip
```

3. This is where most of the code is concentrated:
sign_in folder
sign_up folder
admin folder
main_page folder
server.js

## Main Release History

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
* 2.0.0
    * CHANGE: Complete Chat Board 
* 3.0.0
    * CHANGE: Complete the whole game

## Authors

* **YU Yue** 1155124490
* **DING Baizeng** 1155124617
* **CHANG Chirui** 1155124553
* **LYU An** 1155124488
* **QIN Zihao** 

## Reference
* https://www.bootstrapdash.com/product/skydash-admin-template/
* https://colorlib.com/wp/template/login-form-v1/
* https://colorlib.com/wp/template/login-form-v8/
* https://www.jq22.com/jquery-info2490
* http://builtbywill.com/
* https://www.jq22.com/demo/jquery-fanshu-150325215701/
* Assignment 2, CSCI 2720 T2, 19-20, YU Yue.

