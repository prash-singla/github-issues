# Github-issues
===========

**Node.js - Express**

Getting Started
----------

Your development environment will require:
*  Node.js
*  Node Package Manager(npm)

Once the prerequisites have been installed, you will be able to execute the following from a terminal.

```
../Github-issues > npm install
../Github-issues > node app.js
```

This should fetch all the dependencies and start a Web Server listening on *localhost:3000*

Application is also deployed at https://github-open-issue-tracker.herokuapp.com/

How it works.
----------

* Web App is created using nodeJs.In home page user can enter the git hub repo url and click list button.
* On clicking the button ajax call is made to the server to get the required data about issues.
* Server on recieving the request makes a call to github to fetch all open issues and group them by their creation date.
* Once all issues are fetched from github, server sends back response to the client.
* Once the client recieves the response from server it displays the data in page.


Areas for Improvement
----------

As the application functionality extends we can use frameworks for front-end development, so that our app remains easy to maintaion, easy to code.