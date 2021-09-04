prediction1="";
prediction2="";

Webcam.set({
    height:300,
    width:350,
    img_format:"png",
    png_quality:100,
    
});

camera=document.getElementById("camera");

Webcam.attach("#camera");
function Takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='capture_img' src='"+data_uri+"'>";
    });
    
}
console.log("ml5 version: ",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/k3VvCrXeL/model.json",modelLoaded);

function modelLoaded(){
    console.log("modeLoaded");

}
function speak(){
    var synth=window.speechSynthesis;
    speakdata1="The First prediction is "+prediction1;
    speakdata2="The Second prediction is "+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("capture_img");
    classifier.classify(img,gotresult);
}

function gotresult(error,result){
    if (error){
        console.error(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML=result[0].label;
        
        prediction1=result[0].label;
        prediction2=result[1].label;
        speak();
        console.log(prediction1);
        console.log(prediction2);
        if (result[0].label == "amazing")
        {
document.getElementById("update_emoji").innerHTML="&#128076;";
        }
        if(result[0].label == "best")
        {
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if(result[0].label =="victory")
        {
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }

        if (result[1].label == "amazing"){
            document.getElementById("update_emoji2").innerHTML="&#128076;";
        }
        if (result[1].label == "best"){
            document.getElementById("update_emoji2").innerHTML="&#128077;";
                }
        if (result[1].label == "victory"){
            document.getElementById("update_emoji2").innerHTML="&#9996;";
        }
    }
}