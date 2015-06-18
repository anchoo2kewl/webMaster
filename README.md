Instructions
------------------------------------------------
This is a simple blog management app made with Meteor and AngularJS.
* Checkout this repo: 
```shell
git clone git@github.com:anchoo2kewl/webMaster.git {friendlyName}
``` 
* On OS X or Linux? Install the latest official Meteor release from your terminal. CD into your working 
and start the server:
```shell
curl https://install.meteor.com/ | sh
cd {friendlyName}
meteor
``` 
* You can add markdown, code highlights and math.
* For adding math, encode the math in code in code blocks liek this: [mathjax]\ and [mathjax]
```shell
[mathjax]\ \(ax^2 + bx + c = 0\)
[mathjax]
``` 
For deploying on a production server, I use forever and an Nginx web server. I have added the config for nginx in the config script.
For deploying, I have a deploy script.
