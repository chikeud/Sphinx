![](https://travis-ci.com/e-oj/Sphinx.svg?token=Gnqxfd5LJTHA77HvRWKi&branch=master)

#  Project Sphinx

This is the first version of a web app for [Stör](http://www.storapp.io). The goal of this project is to buid an application that's fast, reliable and easy to use; we aim to turn the cumbersome process of storage, into a calm and pleasant experience. Through this process, we hope to annihilate the [competition](https://www.storewithneighbor.com) and make them look stupid.

## Beware!
> If you don't read this documentation that I've put my blood, sweat, and tears into and you come and start asking me any stupid questions, I will lose my precious marbles.

## Structure

- <b>/</b> (Root)
    - server.js - Contains startup code for the server
    - readme.md - This very document
    - package.json - npm dependencies, script declarations
    - package-lock.json - auto-generated by npm
    - .travis.yml - travis config
    - .gitignore - files to be ignored by git
    - .eslintrc.js - ESLint settings
    - .env - Environment variables for test-server
    <br><br>
    - <b>utils/</b> - Utility folder for general purpose functions
        - HttpStats.js - Returns all http status codes releveant to the app
        - authToken.js - Functions to do with token creation and authentication
        - files.js - Functions relating to file uploads + video streaming
        - response.js - Wrapper functions for quick and easy responses
    <br><br>
    - <b>config/</b> - Contains app configuration variables
        - index.js - Returns all the required configuration variables
    <br><br>
    - <b>app/</b> - Contains backend code
        - <b>api/</b> - Contains api code
            - index.js - handles requests to "/api"
            - One folder per api (e.g. messaging/ would contain all messaging api code)
        - <b>models/</b> - contains all model declarations
            - one file per model (e.g. user.js cointains the user model)
    <br><br>
    - [<b>public/</b>](https://github.com/e-oj/Sphinx/tree/master/public)
    
    
## Common Errors

To avoid errors when installing bcrypt, Mac users should make sure they have Xcode installed on the system. If this precaution is not taken, you will be faced with Dragons.
