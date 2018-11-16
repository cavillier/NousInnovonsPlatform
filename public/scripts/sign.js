




firebase.auth().onAuthStateChanged(function(User){
	if (User){
			location.href="/en/list/"
    }else{
		document.getElementById('divLoader').style.display = "none";
	 }

});



$( "#btnSendEmailReset" ).click(function() {

var emailAddress = $("input#txtResetEmail").val();
firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
	  alert("An email has bees sent to "+emailAddress+" with a link to reset your password.")
}, function(error) {
  // An error happened.
});
});

$( ".btnSignIn" ).click(function() {
	document.getElementById('divLoader').style.display = "block";
SignIn();
});
function SignIn(){
        	//Get email and password
        	const email = $( "input#txtEmail" ).val();
        	const pass = $( "input#txtPassword" ).val();
        	// Sign in
        	 firebase.auth().fetchProvidersForEmail(email).then(function(success){

        					if(success[0] === undefined){
        								document.getElementById('divLoader').style.display = "none";
        							alert("This email does not seem already registered.");
        							$( "input#txtEmail" ).val("");
        							$( "input#txtPassword" ).val("");
        	 }else{

        	 	firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
          if(error){// Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("  Message :  "+errorMessage+" Code : "+errorCode);
          document.getElementById('divLoader').style.display = "none";

        	alert("Sorry, it seems that we can not connect you. Thanks to enter your password again or contact us");

          $( "input#txtPassword" ).val("");

           }else{

        	 }
        	});


        	 }
        });



}

//Enter for sign-in
$(document).keydown(function(evt){
    if (evt.keyCode==13){
        evt.preventDefault();
		document.getElementById('divLoader').style.display = "block";
		SignIn();
    }
});
