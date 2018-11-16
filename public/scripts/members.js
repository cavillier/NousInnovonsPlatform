
var userStatus;
var db = firebase.database();
var storage = firebase.storage().ref();

function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;
	}
	return vars;
}


var projectId = $_GET('Id');

var projectRef = db.ref('/list/projects/').child(projectId);

var emailsListRef = db.ref("list/emails");


$('#btnMembers').hide()


firebase.auth().onAuthStateChanged(function(User) {

  if (User) {
    email = User.email
    uid=User.uid
    username = User.displayName;
    if(!username)username = email
    getUserStatus(uid);
    $('#username').html(username);
    $('#btnLogout').show()
    var member = checkMembership(uid);
    if(member)$('#btnMembers').show()
  } else {
      $('#username').html('<a href="/en/sign.html">Log in</a>');
      $('#btnLogout').hide()

    }
});




function checkMembership(uid){
  return new Promise(function(resolve){
  db.ref('/list/projects/').child(projectId).child('members').child(uid).once('value').then(function(d){
    resolve(d.val())
  });
  });
}


function getUserStatus(uid){
	return new Promise(function(resolve){
    var userStatusRef = db.ref('/list/users/').child(uid).child('status');
		userStatusRef.once('value').then(function(d){
      userStatus = d.val()
      projectRef.child('members').child(uid).child('status').once('value').then(function (d) {
      var userStatusLocal = d.val()
      if(userStatusLocal ==="owner")userStatus = userStatusLocal
			resolve(userStatusLocal)
      })
		});
	});
};






$('body').on('click','#btnAddNewMember',function(){

				var newEmail = $('#newEmail').val();
        var newPassword = '123456';
        var myPassword = $('#myPassword').val();
        var newUserId;

			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmail))
			  {
					 var y = confirm('Do you want to add '+newEmail+' as collaborator to this project?');
         }else{
           return alert('Email format not valid!')
         }
				 if(!y)return;
         document.getElementById('divLoader').style.display = "block";
         firebase.auth().fetchProvidersForEmail(newEmail).then(function(success){
               if(success[0] === undefined){

                  // If email user is not in the database
                  var myEmail = firebase.auth().currentUser.email;

                            firebase.auth().signOut().then(function() {
                              firebase.auth().signInWithEmailAndPassword(myEmail, myPassword).then(function() {
                                  firebase.auth().signOut().then(function() {
                                    firebase.auth().createUserWithEmailAndPassword(newEmail, newPassword).then(function(user) {
                                      var email = user.email
                                     newUserId = user.uid
                                     var cleanemail = email.replace(/[^a-zA-Z0-9]/g, '');
                                     db.ref('list/emails/').child(cleanemail).set(user.uid);
                                     db.ref('list/users/').child(user.uid).child('status').set('added');
                                        firebase.auth().signOut().then(function() {
                                          firebase.auth().signInWithEmailAndPassword(myEmail, myPassword).then(function() {
                                              projectRef.child('members').child(newUserId).set({
                                                email : email,
                                                status : 'guest'
                                              }).then(function () {
                                                alert( email+' has been succesfully added! He can now log in with his / her email and the default password : 123456')
                                                location.reload();
                                              })

                                          })

                                        })

                                    },function(error) {

                                      alert(error.message);
                                      location.href = "/";

                                    });



                                      });
                                }, function(error){
                                  alert(error.message);
                                  location.href = "/";
                                });
                              })

               }else{

                 // Else get the uid from the emailsList
                 var cleanemail = newEmail.replace(/[^a-zA-Z0-9]/g, '');
                 db.ref('list/emails/').child(cleanemail).once('value').then(function (d) {
                   var newUserId = d.val()
                   projectRef.child('members').child(newUserId).set({
                     email : newEmail,
                     status : 'guest'
                   }).then(function () {
                     alert( newEmail+' has been succesfully added!')
                     location.reload();
                   })

                 });


               }


                }).catch(function (err) {
                          alert("Error " + err);
                          location.reload();
                });




});

$('body').on('click','.btnRemoveMember',function(){
	    if(userStatus=="admin" || userStatus=="owner"){
				var y = confirm('Remove this member of the projet?')
				if(!y)return false
				return accessProjectRef.child(uidToRemove).remove();
			}
});





	$( "body" ).on( 'click', '#btnMembers',function() {
    projectRef.child('members').once('value').then(function (d) {
      var members = d.val()
      var html = '<div class="membersList">'
      for (var id in members){
        html +="<div class='member' id='"+id+"'>"+members[id].email+"<button class='btnRemoveMember'>x</button></div><br>"
      }
      html += "</div>"
      if(userStatus ==="admin" || userStatus ==="owner"){
      html += "<br><h3>Add a new project's member</h3><input type='email' id='newEmail' placeholder='Email of the new member'><br><br>\
      Enter your password for ID verification <input type='password' id='myPassword' placeholder='Your password'><br><br><button id='btnAddNewMember'>Add a new member</button>"
      }

      swal({
            title: 'Members\' project',
            html: html,
          })
    })
	});




$( "body" ).on( 'click', '#btnList',function() {

		location.href="/en/list"

	});

$("#divLogo").on("click", "div", function() {
		 location.href = "/";
});
