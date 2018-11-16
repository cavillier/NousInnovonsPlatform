



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
var modelType = $_GET('Mt');
var v = $_GET('v');
if(v)validateModel();
var colorTask;
var userStatus;
var versionsModelRef = firebase.database().ref("list/models/versions").child(projectId).child(modelType);
var statusRef = firebase.database().ref("list/models/state").child(projectId).child(modelType);
var colorModelRef = firebase.database().ref("list/models/colors").child(projectId).child(modelType);


if(modelType=="Pro"){

		$('#divTitleModel').html('As-Is Process');
        document.title = 'As-Is Model';

}else if(modelType=="BP"){

		$('#divTitleModel').html('Mindmap of project\'s risks and barriers (Absorptive Capacity Model)');
		 document.title = 'Context';

}else if(modelType=="VPC"){

		$('#divTitleModel').html('The Value Proposition Canvas');
		 document.title = 'Value Model';

}else if(modelType=="newProcess"){

		$('#divTitleModel').html('To-Be Process');
		 document.title = 'To-Be Model';

}else if(modelType=="vision"){

		$('#divTitleModel').html('Potential opportunities');
		 document.title = 'Annexe';

}else if(modelType=="culture"){

		$('#divTitleModel').html('Beliefs to change before adoption the solution');
		 document.title = 'Beliefs';

}

//Panel color pallet
	function closeColorPallet(){
		 $('#btnOpenColor').popover('hide');
	}



$('#btnOpenColor').popover({
					placement:'bottom',
					html:true,
					trigger:'manual',
					content:'<button class="circleColor bg-in-orange" id="orange"></button>\
								<button class="circleColor bg-in-red" id="red"></button>\
								<button class="circleColor bg-in-purple" id="purple"></button>\
								<button class="circleColor bg-in-blue" id="blue"></button>\
								<button class="circleColor bg-in-green" id="green"></button>\
								<button class="circleColor bg-in-white" id="white"></button>\
								&nbsp<button type="button" id="close" class="close" onclick="closeColorPallet()">&times;</button>'

});

$('#btnOpenColor').popover();

			$('body').on('click', '#btnOpenColor', function(){
				if ($("#btnOpenColor").next('div.popover:visible').length){
					$('#btnOpenColor').popover('hide');
				}else{
					$('#btnOpenColor').popover('show');
					$('.circleColor').popover({
						placement:'top',
						html:true,
						content:'Click on a task to color it!',
						//trigger: 'manual',
						container: 'body'

					});
				}
			});

			$('body').on('click', '.circleColor', function(){
				colorTask = $(this).attr('id');
			});

			$("body").on("click", ".circleColor", function(){
				var that = $(this)
				that.popover('show');
				setTimeout(function(){
					that.popover('hide');
				}, 2000);
			});

function setStatus(status){
		statusRef.set({
			status : status
		})
}

//Set up the model's status
statusRef.on('value', function(data){

	var grey = '#e0e0db';
	var blue = '#0288d1';
	var orange = '#FFC300';
	var green = '#1ca949';
	if(data.val()){
		var val = data.val().status;
		if(val == "good" ){
				$("#btnNo").css("color", grey);
				$("#btnEdit").css("color", grey);
				$("#btnYes").css("color", green);


		}else if(val == "bad" ){
				$("#btnNo").css("color", orange);
				$("#btnEdit").css("color", grey);
				$("#btnYes").css("color", grey);
		}else{
			$("#btnNo").css("color", grey);
			$("#btnEdit").css("color", blue);
			$("#btnYes").css("color", grey);

		}
	}else{
		$("#btnNo").css("color", grey);
		$("#btnEdit").css("color", blue);
		$("#btnYes").css("color", grey);

	}

});



// Modeler
(function (BpmnModeler, $) {

	var bpmnModeler = new BpmnModeler({
    container: '#canvas'
  });


  var overlays = bpmnModeler.get('overlays');


//Add color when load

  bpmnModeler.on('bpmnElement.added',function(e){

			var id = e.element.id;

			colorModelRef.child(id).once("value").then(function(data){
				var color = data.val();
				if(color){
				var canvas = bpmnModeler.get('canvas');
				canvas.addMarker(id, color);
				}
			});
});


//Trigger when click on the model
var eventBus = bpmnModeler.get('eventBus');

eventBus.on('element.click', function(e) {
	if(userStatus=='visitor'){

				alert('Only members of this project can modify this model');

			$('#btnOpenColor').popover('hide');
				$('.circleColor').popover('hide');
				return;
	}
	//If the color panel has been opened and a color is selected, then add the color to the element's model
		if ($("#btnOpenColor").next('div.popover:visible').length){
			var id = e.element.id;
			var n = id.indexOf("Process");
			if(n>=0){return;}else{

			var canvas = bpmnModeler.get('canvas');
				canvas.removeMarker(id, 'blue');
				canvas.removeMarker(id, 'orange');
				canvas.removeMarker(id, 'green');
				canvas.removeMarker(id, 'white');
				canvas.removeMarker(id, 'purple');
				canvas.removeMarker(id, 'red');
				canvas.addMarker(id, colorTask);

				colorModelRef.child(id).set(colorTask);
				$('#btnOpenColor').popover('hide');
				$('.circleColor').popover('hide');
			}



		}


});

function loadTemplate(){
	var jsDate = new Date();
	var dd = jsDate.toLocaleDateString() + " " + jsDate.toLocaleTimeString();

	if(modelType == 'BP'){
		jQuery.get('/bpmnTemplates/bigpic.bpmn', function(xml) {
		var XML = xml;
		var versionRef = versionsModelRef.push();
		versionRef.set({
			xml : XML,
			date : dd
		});
		setStatus('edit');
		});
}else if(modelType == 'Pro'){

		jQuery.get('/bpmnTemplates/process.bpmn', function(xml) {
		var XML = xml;
		var versionRef = versionsModelRef.push();
		versionRef.set({
			xml : XML,
			date : dd
		});
		setStatus('edit');
		});
}else if(modelType == 'VPC'){

		jQuery.get('/bpmnTemplates/vpc.bpmn', function(xml) {
		var XML = xml;
		var versionRef = versionsModelRef.push();
		versionRef.set({
			xml : XML,
			date : dd
		});
		setStatus('edit');
		});
}else if(modelType == 'newProcess'){

		jQuery.get('/bpmnTemplates/process.bpmn', function(xml) {
		var XML = xml;
		var versionRef = versionsModelRef.push();
		versionRef.set({
			xml : XML,
			date : dd
		});
		setStatus('edit');
		});
}else if(modelType == 'vision'){

		jQuery.get('/bpmnTemplates/vision.bpmn', function(xml) {
		var XML = xml;
		var versionRef = versionsModelRef.push();
		versionRef.set({
			xml : XML,
			date : dd
		});
		setStatus('edit');
		});

}else if(modelType == 'culture'){

		jQuery.get('/bpmnTemplates/culture.bpmn', function(xml) {
		var XML = xml;
		var versionRef = versionsModelRef.push();
		versionRef.set({
			xml : XML,
			date : dd
		});
		setStatus('edit');
		});
}


}
	// Check if a model's version has been saved. If not, load the template.
versionsModelRef.limitToLast(1).once("value").then(function(child){

			var val = child.val();
			if(val){

			}else{
				loadTemplate();
			}

	});

	///Load last xml
	var oldXML;
	var firstLoad = true;
	versionsModelRef.limitToLast(1).on("child_added",function(child){
		var xml = child.val().xml;
		var date = child.val().date;
		if(oldXML!=xml){
			bpmnModeler.importXML(xml, function(err) {

					if (err) {
						return resetXml(err)
					}else{

						 canvas = bpmnModeler.get('canvas');
						if(firstLoad){
						firstLoad = false;
						canvas.zoom('fit-viewport');
						}
						document.getElementById('divLoader').style.display = "none";
					}
					});

		}

	});


	var events = [
	'element.changed'
	];

	  bpmnModeler.on(events, function(event) {
			saveXml();
	  });


var saving = false;

function resetXml(err){
var y = confirm('Oups, we can not upload your model, would you like to reset it? If not, please contact the admin! Error : ' +err);
	if(y)loadTemplate();
}


function saveXml(){

	versionsModelRef.limitToLast(1).once("value").then(function(d){
	var savedXML = d.val().xml

		bpmnModeler.saveXML({ format: true }, function(err, xml) {
			if (err) {
				alert(err);
			} else if (xml!=savedXML){

				undoCount = 1;
				oldXML = xml
				var jsDate = new Date();
				var dd = jsDate.toLocaleDateString() + " " + jsDate.toLocaleTimeString();
				if(saving){
					return false;
				}
				saving = true;
						versionsModelRef.push().set({
							xml : xml,
							date : dd
						}).then(function(){

										document.getElementById('canvas-saved').innerHTML = '<i class="material-icons green-color">save</i>';

										 versionsModelRef.once("value").then(function(d){

										 var n = d.numChildren()
										 var version = d.val()
										 var toRemove = n - 20
										 for(var i in version){
											if(toRemove<0)break
											versionsModelRef.child(i).remove()
											toRemove--
										 }

										 })
										 setTimeout(function(){
											document.getElementById('canvas-saved').innerHTML = "";
											saving = false;
											}, 1000);

										});

			}else{}
		  });
	})
}

	var undoCount = 1;
	$('body').on('click','#btnUndo',function(){
		undoCount++
		if(undoCount > 15 ){
			alert('Can not undo anymore...');
			undoCount = 1;
		}
		versionsModelRef.limitToLast(undoCount).once("value").then(function(d){
			var json = d.val();
			var child = json[ Object.keys(json).reverse().pop() ];
			var xml = child.xml;
			var date = child.date;

				bpmnModeler.importXML(xml, function(err) {

						if (err) {
							return resetXml(err)
						}else{

							 canvas = bpmnModeler.get('canvas');
							if(firstLoad){
							firstLoad = false;
							canvas.zoom('fit-viewport');
							}
							document.getElementById('divLoader').style.display = "none";
						}
						});

		});
	});


 })(window.BpmnJS, window.jQuery);




function validateModel(){
	if(!userStatus){
		setTimeout(function(){ validateModel() }, 2000);
		return
	}
	if(userStatus!="owner" && userStatus !="admin"){
		 swal('You are not allowed to validate this model. <br><br>Contact me at quentin@nousinnovons.ch if is it not normal.')
		 return;
	 }

	var title, text, confirmButtonText, cancelButtonText


	 title = 'Validate the model?'
	 text = "By validating this project, you allow us to publish it on the plateform. Be sure that no confidential information is disclosed! Your identity remains confidential."
	 confirmButtonText = 'Yes, I agree to publish the model.'
	 cancelButtonText = 'Annuler'


	 swal({
		title: title,
		text: 	text,
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#0EB40E',
		cancelButtonColor: '#d33',
		confirmButtonText: confirmButtonText,
		cancelButtonText: cancelButtonText
	}).then((result) => {
		if (result.value) {
			setStatus('good');
		}
	})
}

function getValidatingLink() {
 var url  = window.location.href + '&v=true';
 var text = 'Merci de copie/colle l\'url ci-dessous et de le transmettre par email au participant de l\'entreprise afin qu\'il/elle valide le modèle <br><br>'+url
 swal(text)
}


  $('body').on('click','#btnNo',function(){
		if(userStatus=="epfl"){
 			getValidatingLink();
 			return;
 		}

	var y = confirm('Corrections needed? Did you explain what we should change in the project chat?')

	if(!y)return;
		setStatus('bad');
 });

   $('body').on('click','#btnYes',function(){
		 if(userStatus=="epfl"){
				getValidatingLink();
				return;
			}
		validateModel();
 });

  $('body').on('click','#btnEdit',function(){
		if(userStatus=="epfl"){
			getValidatingLink();
			return;
		}

	var y = confirm("A new validation is needed?")

	if(!y)return;

		setStatus('edit');
 });

 //delete button

$(document).keydown(function(e) {
  if(e.which == 46) {
    $(".bpmn-icon-trash").click();
  }

  if(e.which == 90 && e.ctrlKey) {
    $("#btnUndo").click();
  }
});
