function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

var uid, emailUid;
firebase.auth().onAuthStateChanged(function(User) {

  if (User) {
    emailUid = User.email
    uid=User.uid
    $('#accountInfo').html("Logged as " + emailUid)

  } else {

    }
});

//Sign Out
$("#btnLogout").click(function() {
  firebase.auth().signOut().then(function() {
    location.reload();
  });
});


function submit(){
	email = $( "input#email" ).val();
	const pass = $( "input#password" ).val();
  if(uid)return submitNewProject(uid, emailUid);

	if(validateEmail(email)){
		firebase.auth().fetchProvidersForEmail(email).then(function(success){
					if(success[0] === undefined){


						firebase.auth().createUserWithEmailAndPassword(email, pass).then(function(user) {

						 submitNewProject(user.uid, email);

             //Add email to uid registered !!! Warnings !!! To secure the emails list, use a functions instead of a public emails list
             var cleanemail = email.replace(/[^a-zA-Z0-9]/g, '');
             firebase.database().ref('list/emails/').child(cleanemail).set(user.uid);
             firebase.database().ref('list/users/').child(user.uid).child('status').set('org');
						},function(error) {
						  // Handle Errors here.
						  var errorCode = error.code;
						  var errorMessage = error.message;
						  alert(errorMessage);
						  document.getElementById('divLoader').style.display = "none";

						});




					}else{
					document.getElementById('divLoader').style.display = "none";

						alert('An account with this email address is already registered. Please log in and submit the form.');
            var win = window.open('/en/sign.html', '_blank');
            if (win) {
                //Browser has allowed it to be opened
                win.focus();
            } else {
                //Browser has blocked it
                alert('Please allow popups for this website');
            }
					}


                }).catch(function (err) {
                    console.log("Error " + err);

                });
	}else{
		document.getElementById('divLoader').style.display = "none";
		alert('We can not valid the format of this email.');
		$('input#email').val('');
		$('input#email').focus();
		$('#divLoader').hide();
	}
	}





 function submitNewProject(uid, email){


		const commentText = $('#commentText').val();
		const anecdoteText = $('#anecdoteText').val();
		const timeText = $('#timeText').val();
		//const informationText = $('#informationText').val();
		const involveText = $('#involveText').val();
		//const peopleText = $('#peopleText').val();
		//const processText = $('#processText').val();
		const typeProject = $("#typeProject").val() || ''
		const taskText = $('#taskText').val();
		const strategieText = $('#strategieText').val();
		const motivationText = $('#motivationText').val();
		const structureText = $('#structureText').val();
		const companyText = $('#companyText').val();

		const nemployees = $('input[name="quantity"]').val();
		const projectname = $('input[name="projectname"]').val();



    // Open new project ref
		var newProjectRef = firebase.database().ref('list/projects').push()

    newProjectRef.child('members').child(uid).child('status').set('owner', function(err){
      if(err){
        document.getElementById('divLoader').style.display = "none";
        return alert(err)
      }else{
        newProjectRef.child('members').child(uid).child('email').set(email)
        newProjectRef.child('status').set('close')
        return 	newProjectRef.child('description').set( {
                                            		typeProject : typeProject,
                                            		commentText : commentText,
                                            		anecdoteText : anecdoteText,
                                            		timeText: timeText,
                                            		involveText: involveText,
                                            		taskText: taskText,
                                            		strategieText: strategieText,
                                            		motivationText: motivationText,
                                            		structureText: structureText,
                                            		companyText: companyText,
                                            		email: email,
                                            		nemployees: nemployees,
                                            		projectname: projectname,
                                            		timeStamp: Date.now()
          		}, function(err){

          			if(err){
          				document.getElementById('divLoader').style.display = "none";
          				return alert(err)
          			}else{
          								document.getElementById('divLoader').style.display = "none";
          								alert("Data saved successfully. You can now dive into the platform and explore your new project.");
          								location.href="/en/sign.html"
          						}
          		});
      }
    })




}



$('.btnPublish').click(function(){
	document.getElementById('divLoader').style.display = "block";

	 if($('#checkBox').is(':checked'))
    {
		return submit()
	}else{
		document.getElementById('divLoader').style.display = "none";

		return alert("Thanks for checking the box anti-spam and the agreement to the conditions.")
	}
});
