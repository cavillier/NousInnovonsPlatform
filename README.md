# NousInnovonsPlatform
NousInnovons.ch platform is an on-going research from EPFL aiming to improve collaboration between students and small-and-medium sized enterprises (SMEs).

By following the steps below, you will be able to run your own prototype of a platform for supervising collaborative projects between small firms and students on process innovation.

The main purpose of the platform is to build up the SMEs' awareness about opportunities to improve their business processes with new digital practices. The best way of improving their awareness is to demonstrate them how those new web applications are easy to use and powerful. My research revealed the strong students' ability (from Management, Computer Science, or any field of Engineering) to perform those kinds of demonstrations and to lead such projects with a high intrinsic motivation.

Therefore, I believe Universities should lead similar initiatives to enhance collaboration between students and small firm. Using this platform has a few benefits such as centralizing data that can be easily reused and shared amongst students. We can also start thinking about using those data for computer science researches (e.g. How to improve students soft and analytical skills with machine learning?). It also offers an easy way for small firms to offer projects and see what the others have done. Finally, for the supervisor (myself during my research), it allows to coach and to follow up many (10-20) projects in a semester.

I hope you will find my research useful and I invite you to visit the original platform at https://www.nousinnovons.ch to grasp a better idea of what we did.

See below the steps to launch your own platform on Firebase.

A) Prerequisites:

0.a Create a firebase account : https://www.firebase.com/signup/

0.b install Node.js and npm (https://nodejs.org/en/download), then install firebase tools from your terminal with the command : "npm install -g firebase-tools"


B) Set up the platform on Firebase:

1. Add a new project on Firebase : https://console.firebase.google.com/

2. Enable Email/Password sign-in method in the Authentification settings of your console's project. The url should look like something similar : [](console.firebase.google.com/project/Your Project Id/authentication/providers)

3. In Project Overview, click on "Add app", copy and save your project's credentials for a web app in a text file (see below an example) :

        var config = {
          apiKey: "YourApiKey",
          authDomain: "yourPlatform.firebaseapp.com",
          databaseURL: "https://yourapp.firebaseio.com",
          projectId: "yourPlatform123456",
          storageBucket: "yourPlatform.appspot.com",
          messagingSenderId: "123456789"
        };
        firebase.initializeApp(config);

C) Upload the code from your computer on firebae:

4. Create a folder on your computer for your platform

5. In your terminal, set the directory to your platform's folder and link it to firebase with : "firebase init"

6. Set the initialization with the following features : Database, Hosting, Storage. 

7. Download the platform's code from Github.

7. Once the set up completed, go to your project's folder and copy/paste the "public" folder, the "database.rules" and "storage.rules" files with those from the folder downloaded.

8. Open the file fb.js at "your directory/public/scripts/fb.js" and copy paste your project's credentials (see point 3).

9. Finally, go back to your project's directory from your terminal and enter : "firebase deploy".

10. Et voilà, you should be able to play with your platform prototype at the address : "YourPlatform.firebaseapp.com"

11. P.S. Security rules about database and storage should be changed if you want to scale it up to many projects.

Cheers, 
Quentin

# License
See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
