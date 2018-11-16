# NousInnovonsPlatform
NousInnovons.ch platform is an on-going research led at EPFL aiming to improve collaboration betweens students and small-and-medium sized enterprises (SMEs).

By following the steps below, you will be able to lunch your own prototype of a platform to supervise collaborative projects between small firms and students on process innovation.

The main purpose of the platform is to build up the SMEs' awareness about opportunities to improve their business processes with new digital practices. The best way of improving their awareness is to demonstrate them how those new web applications are easy to use and powerfull. My research revealed the strong students' ability  (from Management, Computer Science, or any field of Enginerring) to perform these kinds of demonstrations and to lead such projects with a high intrinsic motivation.

Therefore, I believe Universities should lead similar initiatives to enhance collaboration between students and small firm. Using this platform has a few benefits such as centralizing data that can be easily reused and shared amonsgt students. We can also start thinking about using those data for computer science researches (e.g. How to improve students soft and analytical skills with machine learning?). It also offer an easy way for small firms to offer projects and see what the others have done. Finally, for the supervisor (myself during my research), it allows to supervise ten projects in a row pretty easily.

Voilà, I hope you will find my research usefull and you can have a first look at what it looks like by visiting the original platform at NousInnovons.ch.

See below the steps to launch your own platform on Firebase.

Prerequisites:

0.a Create a firebase account : https://www.firebase.com/signup/

0.b install Node.js and npm, then install firebase tools with the command : "npm install -g firebase-tools"


Set up the platform on Firebase:

1. Add a new project on Firebase : https://console.firebase.google.com/

2. Enable Email/Password sign-in method in the Authentication

3. In Project Overview, copy paste your project's credentials for a web app (see below an example) :

        var config = {
          apiKey: "YourApiKey",
          authDomain: "yourPlatform.firebaseapp.com",
          databaseURL: "https://yourapp.firebaseio.com",
          projectId: "yourPlatform123456",
          storageBucket: "yourPlatform.appspot.com",
          messagingSenderId: "123456789"
        };
        firebase.initializeApp(config);

Upload the code from your computer on firebae:

4. Create a directory for your platform

5. In your terminal, go to your platform's directory and link it to firebase with : "firebase init"

6. Choose to set up the following features : Database, Hosting, Storage. Then, confirm all other requests.

7. Once the set up completed, go to your directory and copy paste the "public" folder, the "database.rules" and "storage.rules" files.

8. Open the file fb.js at "your directory/public/scripts/fb.js" and copy paste your project's credentials (see point 3).

9. Finally, go back to your project's directory from your terminal and enter : "firebase deploy".

10. Et voilà, you should be able to play with your platform at the address : "YourPlatform.firebaseapp.com"

I would really appreciate if you can let me know how you plan to use the platform for personal curiosity. 

Cheers, 
Quentin
