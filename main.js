Webcam.set({
    width: 350,
    height: 300,
    image_format: 'jpeg',
    jpeg_quality: 100
});

cam = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnap() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capturedImg" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version is ", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/N3sikLkBq/model.json",modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
} 

prediction_1 = "";
prediction_2 = "";

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 = "The second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    image = document.getElementById("capturedImg");
    classifier.classify(image, got_result);
}

function got_result(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
    }

    if (results[0].label == "happy") {
        document.getElementById("emoji_1").innerHTML = "&#128512;";
    }

    if (results[0].label == "sad") {
        document.getElementById("emoji_1").innerHTML = "&#128524;";
    }

    if (results[0].label == "angry") {
        document.getElementById("emoji_1").innerHTML = "&#128545;";
    }

    if (results[0].label == "excited") {
        document.getElementById("emoji_1").innerHTML = "&#129321;";
    }

    if (results[0].label == "nervous") {
        document.getElementById("emoji_1").innerHTML = "&#128560;";
    }

    if (results[1].label == "happy") {
        document.getElementById("emoji_2").innerHTML = "&#128512;";
    }

    if (results[1].label == "sad") {
        document.getElementById("emoji_2").innerHTML = "&#128524;";
    }

    if (results[1].label == "angry") {
        document.getElementById("emoji_2").innerHTML = "&#128545;";
    }

    if (results[1].label == "excited") {
        document.getElementById("emoji_2").innerHTML = "&#129321;";
    }

    if (results[1].label == "nervous") {
        document.getElementById("emoji_2").innerHTML = "&#128560;";
    }
}