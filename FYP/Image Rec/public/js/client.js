document.getElementById("input-file").addEventListener("change", (e) => {
  if (e.target.files.length) {
    console.log("Hello")
    document.getElementById("input-file-label").innerHTML = e.target.files[0].name;
  }
});

async function uploadFile() {
  
  //Location to print the results
  let messageElement = document.getElementById("message");
  let GenderElement = document.getElementById("face_gender");
  let ageElement = document.getElementById("face_age");
  let smileElement = document.getElementById("face_smile");
  let glassesElement = document.getElementById("face_eye_glasses");
  let sunGlassesElement = document.getElementById("face_sun_glasses");
  let emotionElement = document.getElementById("face_emotion");
  
  //Get Files From Website and package it into FormData format
  const selectedFile = document.getElementById("input-file").files[0];
  var formData = new FormData();
  formData.append("file", selectedFile);
  console.log(selectedFile);

  //Progress Bar functionality
  document.getElementById("progress").style.display = "flex";
  let progressBarElement = document.getElementById("progress-bar");
  progressBarElement.innerHTML = "0%";
  progressBarElement.setAttribute("aria-valuenow", 0);
  progressBarElement.style.width = "0%";

  //Displaying the progress bar in the html
  const onUploadProgress = (event) => {
    const percentage = Math.round((100 * event.loaded) / event.total);
    progressBarElement.innerHTML = percentage + "%";
    progressBarElement.setAttribute("aria-valuenow", percentage);
    progressBarElement.style.width = percentage + "%";
  };

  try {
    const res = await axios.post("http://localhost:3000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });

    console.log(res.data.faceData[0]);
    
    GenderElement.innerHTML = res.data.faceData[0].Gender.Value;
    ageElement.innerHTML = "Min : " + res.data.faceData[0].AgeRange.Low + " - Max : " + res.data.faceData[0].AgeRange.High;
    smileElement.innerHTML = res.data.faceData[0].Smile.Value;
    glassesElement.innerHTML = res.data.faceData[0].Eyeglasses.Value;
    sunGlassesElement.innerHTML = res.data.faceData[0].Sunglasses.Value;
    emotionElement.innerHTML = res.data.faceData[0].Emotions[0].Type;
    
    
  } catch (err) {
    messageElement.innerHTML = htmlizeResponse(err);
  }
}

function htmlizeResponse(res) {
  return (
    `<div class="alert alert-secondary mt-2" role="alert"><pre>` +
    JSON.stringify(res, null, 2) +
    "</pre></div>"
  );
}
