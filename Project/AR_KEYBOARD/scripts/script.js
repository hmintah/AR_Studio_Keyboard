
//By Harold Mintah 2018
//@mintahgames
//@hmintah
//http://www.facebook.com/mintah

var Animation = require('Animation');
var FaceTracking = require('FaceTracking');
var Scene = require('Scene');
var T = require("TouchGestures");
var Materials = require('Materials');
var R = require('Reactive');
var CameraInfo = require('CameraInfo');
var D = require('Diagnostics');
var P = require('Patches');
var Time = require('Time');
var Audio = require("Audio");

var keyText = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M"];
var numberOfKeys = 28;
var keyboardKeys = [];

var keyboardCanvasRoot = Scene.root.child("keyboardCanvas");
var mainCanvasRoot = Scene.root.child("mainCanvas");
var message = mainCanvasRoot.child("text");
var actualMessage = message.text.lastValue;
var keyClickSound = Scene.root.child("keyboardSound");
var openKeyboardBTN =  mainCanvasRoot.child("TextBG");
var openKeyboardBTN2 =  mainCanvasRoot.child("TextBG_2");
var exitKeyboardBTN =  mainCanvasRoot.child("exitTextMode");
var exitKeyboardBTN2 =  mainCanvasRoot.child("exitTextMode_2");

var tapRegistrar = function(selectedKeyboardKey){

	T.onTap(selectedKeyboardKey.texture).subscribe(function(event) {
			//D.log("hi");
			
			if(selectedKeyboardKey.index == 26){
				actualMessage=actualMessage.slice(0, -1);
			}else if (selectedKeyboardKey.index == 27){
				actualMessage = actualMessage + " ";
			}else{
				
				actualMessage = actualMessage + keyText[selectedKeyboardKey.index].toString();
				
			}
			keyClickSound.play();
			message.text = String(actualMessage);
	});

}

T.onTap(openKeyboardBTN).subscribe(function(event) {

	keyboardCanvasRoot.hidden = false;

});

T.onTap(openKeyboardBTN2).subscribe(function(event) {

	keyboardCanvasRoot.hidden = false;

});

T.onTap(exitKeyboardBTN).subscribe(function(event) {

	keyboardCanvasRoot.hidden = true;

});

T.onTap(exitKeyboardBTN2).subscribe(function(event) {

	keyboardCanvasRoot.hidden = true;

});

for(var i = 0; i<numberOfKeys; i++){

	keyboardKeys[i] = {
		texture: keyboardCanvasRoot.child("key_"+(i+1).toString()),
		index: i
	}
	//D.log(keyboardKeys[i].texture.name.toString());
	tapRegistrar(keyboardKeys[i]);
}


var lineFlashEnabled = false;
Time.ms.interval(500).subscribe(function (elapsedTime) {

	if(lineFlashEnabled){
		message.text = String(actualMessage) + "l";
	}else{
		message.text = String(actualMessage);
	}

	lineFlashEnabled =!lineFlashEnabled;

});


