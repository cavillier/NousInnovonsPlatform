document.getElementById('divLoader').style.display = "none";
 // Initialize Firebase
 $( ".col-sm-4" ).mouseenter(function() {

   $( this ).children().children().children('.anim-hinge').addClass('animated flip');
   $( this ).children().children().children('.anim-hinge').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

   $(this).removeClass('animated flip');
   });
});

$('.col-sm-4').on('touchstart', function(){
      $( this ).children().children().children('.anim-hinge').addClass('animated flip');
   $( this ).children().children().children('.anim-hinge').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

   $(this).removeClass('animated flip');
   });
 });

 $(".col-sm-4").click(function() {
 $( this ).children().children().children('.anim-hinge').addClass('animated flip');
   $( this ).children().children().children('.anim-hinge').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

   $(this).removeClass('animated flip');
   });
});

$(".anim-rollout").click(function() {

 $(this).addClass('animated fadeOutRight');
 $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
 $(this).removeClass('animated fadeOutRight');

 });
});

$(".btnSeeProjects").click(function(){
    location.href = "/en/list";
});

$( ".btnForm" ).click(function() {
  location.href = "/en/form.html";
});

$( ".btnSignIn" ).click(function() {
    location.href = "/en/sign.html";
 });

if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
  particlesJS.load('particles-js', 'divers/particlesff.json', function() {});
}else{
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'divers/particles.json', function() {});
}
