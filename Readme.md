First Backend Project


1. Create basic file and folder structure.
- npm init
- create index.js,app.js,constants.js in src folder
- create contollers,db,middlewares,models,routes,utils folder in src
- create public/temp add gitkeep to keep file in git repo 
- set git repo and gitignore
- install Prettie for proper formating of files
- install dotenv

2. Connecting with Database
- install moongoose
- create index in db folder and get the Mongo db url from Mongo atlas
- add DB_Name in constant 
- Connect with mongo db with moongoose in src/index.js

3. Create express app and listening 
- install express
- start listening in src/index.js

4. add some utils
- apierror.js
- apiresponse.js
- asynchandler.js wrapper of error hanling block

5. adding middlewares in app.js
- install cors
- install coofie parsar
- add some middlewares

6. creting models
- creating models - comment,like,playlist,subscription,tweet,user,video
- install and adding mongoose aggregate paginate
- install and adding bycrpt and JsonWebToken

7. Cloudinary and multer
- install Cloudinary and multer
- configure cloudinary.js in utils
- configure multer.js in middlewares

8. Adding controller and routes of User
- configure user.controller.js and route

- How to resigter a user? :
- get user detial from fronted
- check the validation 
- chech if user aready exist. 
- check for avatar and other image 
- upload them in cloudinary avatar
- create user object - create user entry in db
- remove password,refreshtoken from reponse
- check for user creation
- return res