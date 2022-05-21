const { Rekognition } = require("aws-sdk");
const AWS =require("aws-sdk");
const s3 = new AWS.S3();
const fs = require('fs');

//AWS access details
AWS.config.update({
    accessKeyId: 'AKIA46Q7R3ET46GV5I4U',
    secretAccessKey: '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',
    region: 'eu-west-1'
});


(async() => {
    await s3
    s3.putObject({
        Body: fs.readFileSync("reda.jpg"),
        Bucket: "fyp-img",
        Key: "reda.jpg",
    }).promise();
})();

//
const bucket = 'fyp-img'
const photo = 'Jack.jpg'

// Set params
const params = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: photo
      },
    },
    Attributes: ['ALL']
    // MaxLabels: 10,
    // MinConfidence: 80
};

const rekognition = new AWS.Rekognition();

//Detect text
rekognition.detectFaces(params, function(err, response) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(`Detected faces for: ${photo}`)
      response.FaceDetails.forEach(data => {
        let low  = data.AgeRange.Low
        let high = data.AgeRange.High
        console.log(`The detected face is between: ${low} and ${high} years old`)
        console.log("All other attributes:")
        console.log(`  BoundingBox.Width:      ${data.BoundingBox.Width}`)
        console.log(`  BoundingBox.Height:     ${data.BoundingBox.Height}`)
        console.log(`  BoundingBox.Left:       ${data.BoundingBox.Left}`)
        console.log(`  BoundingBox.Top:        ${data.BoundingBox.Top}`)
        console.log(`  Age.Range.Low:          ${data.AgeRange.Low}`)
        console.log(`  Age.Range.High:         ${data.AgeRange.High}`)
        console.log(`  Smile.Value:            ${data.Smile.Value}`)
        console.log(`  Eyeglasses.Value:       ${data.Eyeglasses.Value}`)
        console.log(`  Sunglasses.Value:       ${data.Sunglasses.Value}`)
        console.log(`  Gender.Value:           ${data.Gender.Value}`)
        console.log(`  Beard.Value:            ${data.Beard.Value}`)
        console.log(`  Mustache.Value:         ${data.Mustache.Value}`)
        console.log(`  EyesOpen.Value:         ${data.EyesOpen.Value}`)
        console.log(`  EyesOpen.Confidence:    ${data.EyesOpen.Confidence}`)
        console.log(`  MouthOpen.Value:        ${data.MouthOpen.Value}`)
        console.log(`  MouthOpen.Confidence:   ${data.MouthOpen.Confidence}`)
        console.log(`  Emotions[0].Type:       ${data.Emotions[0].Type}`)
        console.log("------------")
        console.log("")
      }) // for response.faceDetails
    } // if
});


 //     (async() => {
        //         await 
        //         s3.putObject({
        //             Body: fs.readFileSync(avatar.name),
        //             Bucket: "fyp-img",
        //             Key: avatar.name,
        //         }).promise();
        //     })();

        //     // Set params
        //     const params = {
        //         Image: {
        //             S3Object: {
        //                 Bucket: 'fyp-img',
        //                 Name: avatar.name
        //             },
        //         },
        //         Attributes: ['ALL']
        //     };
            
        //     (async() => {
        //     await
        //     //Detect face labels and
        //     rekognition.detectFaces(params, function(err, response) {
        //         if (err) {
        //         console.log(err, err.stack); // an error occurred
        //         } else {
        //             console.log(`Detected faces for: ${avatar.name}`)
        //             response.FaceDetails.forEach(data => {
        //                 let low  = data.AgeRange.Low
        //                 let high = data.AgeRange.High
        //                 console.log(`The detected face is between: ${low} and ${high} years old`)
        //                 console.log("All other attributes:")
        //                 console.log(`  BoundingBox.Width:      ${data.BoundingBox.Width}`)
        //                 console.log(`  BoundingBox.Height:     ${data.BoundingBox.Height}`)
        //                 console.log(`  BoundingBox.Left:       ${data.BoundingBox.Left}`)
        //                 console.log(`  BoundingBox.Top:        ${data.BoundingBox.Top}`)
        //                 console.log(`  Age.Range.Low:          ${data.AgeRange.Low}`)
        //                 console.log(`  Age.Range.High:         ${data.AgeRange.High}`)
        //                 console.log(`  Smile.Value:            ${data.Smile.Value}`)
        //                 console.log(`  Eyeglasses.Value:       ${data.Eyeglasses.Value}`)
        //                 console.log(`  Sunglasses.Value:       ${data.Sunglasses.Value}`)
        //                 console.log(`  Gender.Value:           ${data.Gender.Value}`)
        //                 console.log(`  Beard.Value:            ${data.Beard.Value}`)
        //                 console.log(`  Mustache.Value:         ${data.Mustache.Value}`)
        //                 console.log(`  EyesOpen.Value:         ${data.EyesOpen.Value}`)
        //                 console.log(`  MouthOpen.Value:        ${data.MouthOpen.Value}`)
        //                 console.log(`  Emotions[0].Type:       ${data.Emotions[0].Type}`)
        //                 console.log("------------")
        //                 console.log("")
        //             }) // for response.faceDetails
        //         } // if
        //     }).promise()
        // })();