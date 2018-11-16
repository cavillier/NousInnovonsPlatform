

  var db = firebase.database();
  var uid;
  var projectsData;
  var projectsRef = firebase.database().ref("list/projects");
  var statusModelsRef = firebase.database().ref("list/models/state");
  var username
  var storage = firebase.storage().ref();
  var userStatus;

  firebase.auth().onAuthStateChanged(function(User) {

    if (User) {

        $('#btnLogout').show()
        var user = firebase.auth().currentUser;
        uid = user.uid;

        username = user.displayName;
        if(!username)username = user.email
        $('#username').html(username);

        initApp();


    } else {
              $('#btnLogout').hide()

              $('#username').html('<a href="/en/sign.html">Log in</a>');
              initApp();
      }

  });

  function getuserStatus(uid) {
    return new Promise(function(resolve) {
      var userStatusRef = firebase.database().ref('/list/users/').child(uid).child('status');
      userStatusRef.once('value').then(function(d) {
        if (d.val()) {
          resolve(d.val());
        } else {
          resolve(false);
        }
      });
    });
  };





  //Sign Out
  $("#btnLogout").click(function() {

    firebase.auth().signOut().then(function() {
        location.href = "/";
    });


  });


  $("#btnAddProject").click(function() {

      location.href = "/en/form.html";

  });




  $("#allChallenges").append('<div id="allLoad" class="spinner2"></div>');
  $("#myChallenges").append('<div id="myLoad" class="spinner2"></div>');

  function setMyModelsAndPrototypes(projectId) {
    return new Promise(function(resolve) {

      // Add prototypes

      firebase.database().ref("list/prototypes").child(projectId).on("child_added", function(child) {

        if (child.val().deleted) {
          $('.btnSeeDeleted#' + projectId).show();
        } else if(child.val().uid == uid || userStatus == 'admin') {
          var html = '<button class="btnFile" data-fileid="'+child.key+'" data-projectid="'+projectId+'"> ' + child.val().name + '</button> | ';
          $("#myChallenges .prototypesList#" + projectId).prepend(html);
        }

      });


      //Add btn for process model and bigpic
      firebase.database().ref("list/models/state").child(projectId).child('Pro').child('status').on("value", function(data) {
        var val = data.val();
        var href = "model.html?Mt=Pro&Id=" + projectId;
        if (val == "good") {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-green'>done</i></a>";
        } else if (val == "bad") {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-orange'>clear</i></a>";
        } else if (val) {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-blue'>edit</i></a>";
        } else {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-grey'>edit</i></a>";
        }
        $("#myChallenges .process#" + projectId).html(html);
      });

      firebase.database().ref("list/models/state").child(projectId).child('BP').child('status').on("value", function(data) {
        var val = data.val();
        var href = "model.html?Mt=BP&Id=" + projectId;
        if (val == "good") {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-green'>done</i></a>";
        } else if (val == "bad") {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-orange'>clear</i></a>";
        } else if (val) {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-blue'>edit</i></a>";
        } else {
         var html = "<a href='" + href + "'><i class='material-icons  color-in-grey'>edit</i></a>";
        }
        $("#myChallenges .bigpic#" + projectId).html(html);
      });

      firebase.database().ref("list/models/state").child(projectId).child('culture').child('status').on("value", function(data) {
        var val = data.val();
        var href = "model.html?Mt=culture&Id=" + projectId;
        if (val == "good") {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-green'>done</i></a>";
        } else if (val == "bad") {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-orange'>clear</i></a>";
        } else if (val) {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-blue'>edit</i></a>";
        } else {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-grey'>edit</i></a>";
        }
        $("#myChallenges .culture#" + projectId).html(html);
      });

      firebase.database().ref("list/models/state").child(projectId).child('VPC').child('status').on("value", function(data) {
        var val = data.val();
        var href = "model.html?Mt=VPC&Id=" + projectId;
        if (val == "good") {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-green'>done</i></a>";
        } else if (val == "bad") {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-orange'>clear</i></a>";
        } else if (val) {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-blue'>edit</i></a>";
        } else {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-grey'>edit</i></a>";
        }
        $("#myChallenges .vpc#" + projectId).html(html);
      });

      firebase.database().ref("list/models/state").child(projectId).child('newProcess').child('status').on("value", function(data) {
        var val = data.val();
        var href = "model.html?Mt=newProcess&Id=" + projectId;
        if (val == "good") {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-green'>done</i></a>";
        } else if (val == "bad") {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-orange'>clear</i></a>";
        } else if (val) {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-blue'>edit</i></a>";
        } else {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-grey'>edit</i></a>";
        }
        $("#myChallenges .newProcess#" + projectId).html(html);
      });

      firebase.database().ref("list/models/state").child(projectId).child('vision').child('status').on("value", function(data) {
        var val = data.val();
        var href = "model.html?Mt=vision&Id=" + projectId;
        if (val == "good") {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-green'>done</i></a>";
        } else if (val == "bad") {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-orange'>clear</i></a>";
        } else if (val) {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-blue'>edit</i></a>";
        } else {
          var html = "<a href='" + href + "'><i class='material-icons  color-in-grey'>edit</i></a>";
        }
        $("#myChallenges .vision#" + projectId).html(html);
      });

    });
  };



function setListMyProjects(projects){
  for(var id in projects){
    var description = projects[id].description
    var members = projects[id].members

    var projectId = id
    if(!description)continue;
    var timeStamp = description.timeStamp;
    var date = (new Date(timeStamp)).toUTCString();


    var processName = description.projectname;
    if (!processName) {
      processName = "???"
    }
    var status = projects[id].status;
    if(!status){
      status = "close"

    }

    if(!members[uid])continue

    var markup = "<tr>\
    <td>\
   <div id='" + projectId + "' class='processName'>\
    <button class='btnDescription' data-projectid='" + projectId + "'>" + processName + "</a></div>\
   </td>\
    <td><div id='" + projectId + "' class='process'>\
  </td>\
  <td><div id='" + projectId + "' class='vpc'>\
 </td>\
 <td><div id='" + projectId + "' class='newProcess'>\
 </td>\
   <td><div id='" + projectId + "' class='prototypes .flex-container-start'>\
   <button class='mdl-button btnAddFile' data-type-video='prototype'><i class='material-icons'>add</i></button>\
   <span id='" + projectId + "' class='prototypesListAccepted'></span>\
   <span id='" + projectId + "' class='prototypesList'></span>\
   <button id='" + projectId + "' class='mdl-button btnSeeDeleted' data-type-video='prototype'><i class='material-icons color-in-grey'>delete</i></button>\
   </div></td>\
   <td><div id='" + projectId + "' class='culture'>\
   </td>\
     <td><div id='" + projectId + "' class='bigpic'>\
  </td>\
  <td><div id='" + projectId + "' class='vision'>\
  </td>\
    <td><div id='" + projectId + "' class='status'>\
  </div>\
   </td>\
   </tr>";


    $("#myChallenges table tbody").prepend(markup);




    if (status == "open") {
      var html = "<button class='mdl-button btnStatus btnProjectOpen'><i class='material-icons  color-in-green'>group_add</i></button></div>";
    } else if (status == "finish") {
      var html = "<button class='mdl-button btnStatus btnProjectFinsh'><i class='material-icons  color-in-green'>done</i></button></div>";
    } else if (status == "prototyping") {
      var html = "<button class='mdl-button btnStatus btnProjectPrototyping'><i class='material-icons  color-in-orange'>lightbulb_outline</i></button></div>";
    } else if (status == "testing") {
      var html = "<button class='mdl-button btnStatus btnProjectTesting'><i class='material-icons  color-in-blue'>rowing</i></button></div>";
    } else if (status == "close") {
      var html = "<button class='mdl-button btnStatus btnProjectClose'><i class='material-icons  color-in-grey'>clear</i></button></div>";
    } else if (status == "removed") {
      var html = "<button class='mdl-button btnStatus btnProjectRemoved'><i class='material-icons  color-in-grey'>visibility_off</i></button></div>";
    }
    $("#myChallenges .status#" + projectId).html(html);


    setMyModelsAndPrototypes(projectId)


  }
  $('#myLoad').hide();

}


function setAllModelsAndPrototypes(projectId) {
  return new Promise(function(resolve) {

    firebase.database().ref("list/prototypes").child(projectId).on("child_added", function(child) {

      if (!child.val().validate || child.val().deleted) {
        return;
      }

      else {

          var html = '<button class="btnFile" data-fileid="'+child.key+'" data-projectid="'+projectId+'"> ' + child.val().name + '</button> | ';
        $("#allChallenges .prototypesList#" + projectId).prepend(html);
      }

    });


    firebase.database().ref("list/models/state").child(projectId).child('Pro').child('status').on("value", function(data) {

      var val = data.val();
      var href = "model.html?Mt=Pro&Id=" + projectId;
      if (val == "good") {
        var html = "<a href='" + href + "'><i class='material-icons  color-in-green'>folder_open</i></a>";
      }
      $("#allChallenges .process#" + projectId).html(html);
    });

    firebase.database().ref("list/models/state").child(projectId).child('BP').child('status').on("value", function(data) {
      var val = data.val();
      var href = "model.html?Mt=BP&Id=" + projectId;
      if (val == "good") {
        var html = "<a href='" + href + "'><i class='material-icons  color-in-green'>folder_open</i></a>";
      }
      $("#allChallenges .bigpic#" + projectId).html(html);
    });

    firebase.database().ref("list/models/state").child(projectId).child('culture').child('status').on("value", function(data) {
      var val = data.val();
      var href = "model.html?Mt=culture&Id=" + projectId;
      if (val == "good") {
        var html = "<a href='" + href + "'><i class='material-icons  color-in-green'>folder_open</i></a>";
      }
      $("#allChallenges .culture#" + projectId).html(html);
    });

    firebase.database().ref("list/models/state").child(projectId).child('VPC').child('status').on("value", function(data) {
      var val = data.val();
      var href = "model.html?Mt=VPC&Id=" + projectId;
      if (val == "good") {
        var html = "<a href='" + href + "'><i class='material-icons  color-in-green'>folder_open</i></a>";
      }
      $("#allChallenges .vpc#" + projectId).html(html);
    });

    firebase.database().ref("list/models/state").child(projectId).child('vision').child('status').on("value", function(data) {
      var val = data.val();
      var href = "model.html?Mt=vision&Id=" + projectId;
      if (val == "good") {
        var html = "<a href='" + href + "'><i class='material-icons  color-in-green'>folder_open</i></a>";
      }
      $("#allChallenges .vision#" + projectId).html(html);
    });

    firebase.database().ref("list/models/state").child(projectId).child('newProcess').child('status').on("value", function(data) {
      var val = data.val();
      var href = "model.html?Mt=newProcess&Id=" + projectId;
      if (val == "good") {
        var html = "<a href='" + href + "'><i class='material-icons  color-in-green'>folder_open</i></a>";
      }
      $("#allChallenges .newProcess#" + projectId).html(html);
    });




  })
}


function setListAllProjects(projects){
  for(var id in projects){
    var description = projects[id].description
    var members = projects[id].members

    var projectId = id
    var timeStamp = description.timeStamp;
    var date = (new Date(timeStamp)).toUTCString();
    var taskText = description.taskText;

    var processName = description.projectname;
    if (!processName) {
      processName = "???"
    }
    var status = projects[id].status;
    if(!status){
      status = "close"
    }
    if(status === "close" || status ==="removed")continue

    taskText = taskText.replace(/\n/g, '<br>');



        var markup = "<tr id='" + projectId + "'>\
       <td><div id='" + projectId + "anchor' class='allList processName'>\
       <p class='btnSummary parocessName'id='" + projectId + "'>" + processName + "</p>\
      </div>\
       </td>\
        <td>\
      <div class='btnSummary taskText' id='" + projectId + "'>" + taskText + "</div>\
       </td>\
       <td><div id='" + projectId + "' class='process'></div>\
      </td>\
      <td><div id='" + projectId + "' class='vpc'></div>\
      </td>\
      <td><div id='" + projectId + "' class='newProcess'></div>\
      </td>\
        <td><div id='" + projectId + "' class='prototypes .flex-container-start'>\
        <span id='" + projectId + "' class='prototypesListAccepted color-in-green'></span>\
        <span id='" + projectId + "' class='prototypesList'></span>\
      </div></td>\
       <td><div id='" + projectId + "' class='culture'></div>\
       </td>\
       <td><div id='" + projectId + "' class='bigpic'></div>\
      </td>\
       <td><div id='" + projectId + "' class='vision'></div>\
      </td>\
       <td><div id='" + projectId + "' class='status'>\
        </div></td>\
       </tr>";

        $("#allChallenges table tbody").prepend(markup);

          if (status == "open") {
            var html = "<button class='mdl-button btnStatus btnProjectOpen'><i class='material-icons  color-in-green'>group_add</i></button></div>";
          } else if (status == "finish") {
            var html = "<button class='mdl-button btnStatus btnProjectFinish'><i class='material-icons  color-in-green'>done</i></button></div>";
          } else if (status == "prototyping") {
            var html = "<button class='mdl-button btnStatus btnProjectPrototyping'><i class='material-icons  color-in-orange'>lightbulb_outline</i></button></div>";
          } else if (status == "testing") {
            var html = "<button class='mdl-button btnStatus btnProjectTesting'><i class='material-icons  color-in-blue'>rowing</i></button></div>";
          } else if (status == "close") {
            var html = "<button class='mdl-button btnStatus btnProjectClose'><i class='material-icons  color-in-grey'>clear</i></button></div>";
          }
          $("#allChallenges .status#" + projectId).html(html);

          setAllModelsAndPrototypes(projectId)


      }
      $('#allLoad').hide();

}

  function initApp() {

    if(uid)getuserStatus(uid).then(function(userStatusLocal) {
      userStatus = userStatusLocal;
      if (!userStatus) {

      } else if (userStatus==="admin") {

      }
    })

    //Set list MyProjects
    projectsRef.once("value").then(function(data) {
              projectsData = data.val();
              setListMyProjects(projectsData);
              setListAllProjects(projectsData);
      });
  }

  var projectIdStatus;


  $("table tbody").on('click', '.btnStatus', function() {
    $('input[name="statusProject"]').hide();
    projectIdStatus = $(this).parent().attr('id');

    projectsRef.child(projectIdStatus).child('members').child(uid).child('status').once('value').then(function(d){
      var userStatusLocal = d.val()
      console.log(userStatusLocal);
      var open = $(this).hasClass("btnProjectOpen");
      var testing = $(this).hasClass("btnProjectTesting");
      var prototyping = $(this).hasClass("btnProjectPrototyping");
      var close = $(this).hasClass("btnProjectClose");
      var finish = $(this).hasClass("btnProjectFinish");
      var removed = $(this).hasClass("btnProjectRemoved");


          if (userStatus == "admin" || userStatusLocal === "owner") {
            $('input[name="statusProject"]').show();

            if (open) {
              $('input[value="open"]').prop("checked", true);
            } else if (testing) {
              $('input[value="testing"]').prop("checked", true);
            } else if (prototyping) {
              $('input[value="prototyping"]').prop("checked", true);
            } else if (close) {
              $('input[value="close"]').prop("checked", true);
            } else if (finish) {
              $('input[value="finish"]').prop("checked", true);
            } else if (removed) {
              $('input[value="removed"]').prop("checked", true);
            }
          }

        $('#statusModal').modal('show');
    })

  });


  $(document).on('change', 'input[name="statusProject"]', function() {
      var status = $(this).attr('value')
      projectsRef.child(projectIdStatus).child('status').set(status).then(function(){
        location.reload();
      })
  })

  //Show summary
  $("table tbody").on('click', '.btnSummary', function() {
    $('.modal-summary').html("");
    var id = $(this).attr('id');
    var content = $('.taskText#' + id).html();
    $('.modal-summary').html(content);
    $('#summaryModal').modal('show');
  });



  var videoRef;
  var videoType;
  var projectIdGlobal;



    $("table tbody").on('click', '.btnDescription', function() {
      var projectId = $(this).data("projectid");

        var html = '\
        <div id="description">\
        <h3 class="center">Description</h3>\
        <h3 class="color-in-green center">Questions about the organisation</h3>\
         <h4 class="color-in-blue">1/10. Describe your business and the sector in which it operates in? What are your services or products? Who are your clients?</h4>\
        <p id="companyText">Empty\
        </p>\
        <h4 class="color-in-blue">2/10. How many employees are working in your company?</h4>\
        <p class="center" id="nemployees">Empty</p>\
         <h4 class="color-in-blue">3/10. What is the structure of your company? How many departements/teams do you have? Are you working alone or in team? How important is hierarchy? etc... </h4>\
        <p id="structureText">Empty\
        </p>\
         <h4 class="color-in-blue">4/10. What is the main strategy of your company? What sets you apart from the competition?</h4>\
        <p id="strategieText">Empty\
        </p>\
        \
        <h3 class="color-in-green center">Questions about the project</h3>\
        <h4 class="color-in-blue">5/10. This question should describe the main goal of your project. What are your expectations? Do you want to optimize or digitalize a task or service?</h4>\
        <p id="taskText">Empty\
        </p>\
        \
        <h4 class="color-in-blue">6/10. Can you describe people involved in the service or task? What is important for them? What do they feel as painful or boring?</h4>\
        <p id="involveText" >Empty\
        </p>\
        \
        <h4 class="color-in-blue">7/10. How many ressources are spent on this task/service? The time spent by week? The number of emails?</h4>\
        <p id="timeText" >Empty\
        </p>\
         <h4 class="color-in-blue">8/10. What is your position? What do you think will be the main challenge to adopt this project in your organisation?</h4>\
        <p id="motivationText">Empty\
        </p>   \
        <h4 class="color-in-blue">9/10. To conclude this interview, we aks you to tell us an anecdote (a story). Something highlighting the issue with the task or service.</h4>\
        <p id="anecdoteText">Empty\
        </p> 	\
        <h4 class="color-in-blue">10/10. Any remark or comment helping us to understand your case?</h4>\
        <p id="commentText">Empty\
        </p> 	\
        <br><br><br>\
        </div>\
        ';
        swal({
          title : 'Project\'s description',
          html : html
        })

      var description = projectsData[projectId].description;

      for (var id in description){
      var text = description[id];
      if(text)$("#"+id).html(text);
      }

      document.getElementById('divLoader').style.display = "none";

    })

  $("table tbody").on('click', '.btnAddFile', function() {

    projectIdGlobal = $(this).parent().attr("id");

    videoRef = db.ref("/list/prototypes").child(projectIdGlobal);
    videoType = "prototypes";

      $('#addVideoModal').modal('show');

  });

  $('body').on('click','.btnRemovePrototype',function(){

  		var y = confirm('Do you want to remove this file?')
  		if(!y)return;

      var projectId = $(this).data('projectid');
      var fileid = $(this).data('fileid');
  		db.ref("list/prototypes").child(projectId).child(fileid).child('deleted').set(uid).then(function(){
  			alert('The file has been removed.')
  			location.reload();
  		});
  });


$('body').on('click', '.btnFile', function() {
  var projectId = $(this).data('projectid');
  var fileid = $(this).data('fileid');

  db.ref("list/prototypes").child(projectId).child(fileid).once("value", function(d) {
    if(!d.val())return alert('No data found for this file, please contact us.')
    var name = d.val().name
    var url = d.val().url
    var uidVideo = d.val().uid
    var html = ''
    var width = $(document).width()*0.9;

    var height = $(document).height()*0.7;

    html += '\
    <div data-fileid="'+fileid+'" data-projectd="'+projectId+'" class="normalscreen">\
    <embed src="'+url+'" width="'+width+'" height="'+height+'" class="prototype" controls>\
    <br><a href="'+url+'" target="_blank">Open in a new tab for full screen</a>\
    </div>';

    if(userStatus === "admin" || uid === uidVideo )
    html+= '<br><button data-fileid="'+fileid+'" data-projectid="'+projectId+'" class="btnRemovePrototype">Remove the video</button>'

    swal({
        title: name,
        html: html
      })
  });

});

  $('body').on('click', '.btnSeeDeleted', function() {
    var projectId = $(this).attr('id');
    $('#deletedProtoBody').empty();
    firebase.database().ref("list/prototypes").child(projectId).once("value", function(d) {
      d.forEach(function(child) {
        var ts = child.val().deleted
        if (ts) {
          var d = new Date(ts);
          var html = '<a href="'+child.val().url+'" target="_blank" > ' + child.val().name + '</a><br>';
          $("#deletedProtoBody").prepend(html);
        }
      });
      $("#deletedProtoModal").modal('show');
    });

  });







  $(".circle-logo").click(function() {

      location.href = "/";

  });

  /* Drag and drop file picker */

  var holder = document.getElementById('holder'),
    tests = {
      filereader: typeof FileReader != 'undefined',
      dnd: 'draggable' in document.createElement('span'),
    },
    support = {
      filereader: document.getElementById('filereader')
    },
    acceptedTypes = {
      'video/mp4': true,
    },
    fileupload = document.getElementById('upload');

  "filereader".split(' ').forEach(function(api) {
    if (tests[api] === false) {
      support[api].className = 'fail';
    } else {
      // FFS. I could have done el.hidden = true, but IE doesn't support
      // hidden, so I tried to create a polyfill that would extend the
      // Element.prototype, but then IE10 doesn't even give me access
      // to the Element object. Brilliant.
      support[api].className = 'hidden';
    }
  });

  function readfiles(files) {

    $('#addVideoModal').modal('hide');
    var file = files[0];

    if (file.size > 52428800) {
      alert("Only files less than 50 mb are accepted.");
      return;
    }

    document.getElementById('divLoader').style.display = "block";
    var filename = file.name;
    var name = filename.replace(/\.[^/.]+$/, "");
    var d = new Date();

    var dformated = '(' + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ')';

    var myvideoRef = videoRef.push();
    var key = myvideoRef.key;
    var fileStorageRef = firebase.storage().ref("/list").child(videoType).child(projectIdGlobal).child(key).child(filename);

    var uploadTask = fileStorageRef.put(file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot) {
      document.getElementById('divLoader').style.display = "block";
      document.getElementById('myProgress').style.display = "block";
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      var elem = document.getElementById("myBar");
      elem.style.width = progress + '%';


      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      console.error('There was an error uploading a file to Firebase Storage:', error);
      document.getElementById('divLoader').style.display = "none";
      document.getElementById('myProgress').style.display = "none";
      alert("There was an error uploading a file to Firebase Storage. Are you sure that your file's size is less than 50mb?");
    }, function() {

      var downloadURL = uploadTask.snapshot.downloadURL;

      myvideoRef.set({
          name: name,
          dformated: dformated,
          url: downloadURL,
          uid: uid,
          ts: Date.now(),
          validate: true
        }).then(function() {

          document.getElementById('myProgress').style.display = "none";
          document.getElementById('divLoader').style.display = "none";



            alert("Your file has been uploaded.")

        })
        .catch(function(err) {
          console.log('Synchronization failed');
          document.getElementById('myProgress').style.display = "none";
          document.getElementById('divLoader').style.display = "none";

          console.log(err);

            alert("Oups... Something is going wrong. Contact us")

        });


    })
  }

  if (tests.dnd) {
    holder.ondragover = function() {
      this.className = 'hover';
      return false;
    };
    holder.ondragend = function() {
      this.className = '';
      return false;
    };
    holder.ondrop = function(e) {
      this.className = '';
      e.preventDefault();
      console.log(e.dataTransfer.files)
      readfiles(e.dataTransfer.files);
    }
  } else {
    fileupload.className = 'hidden';
  }

  $("#my_video").change(function() {
    readfiles(this.files);
  });


  $(".btnUploadVideo").on('click', function() {

    $('#my_video').click();

  });

  function searchFct() {
    // Declare variables
    var input, filter, table, tr, td, i, j;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableAllProjects");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      for (j = 0; j < 10; j++) {
        td = tr[i].getElementsByTagName("td")[j];
        if (td) {

          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {

            tr[i].style.display = "";

            break;
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    }
  }

  function filterStatusProject(filter) {
    console.log(filter);
    var table, tr, td, i;

    table = document.getElementById("myprojectsTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[10];

        if (td) {
          if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }

    }

  }
