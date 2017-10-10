var config = {
    apiKey: "AIzaSyCUxHylsh04cvoIFEOW1xqhniC0y9a0uu0",
    authDomain: "train-91ce0.firebaseapp.com",
    databaseURL: "https://train-91ce0.firebaseio.com",
    projectId: "train-91ce0",
    storageBucket: "train-91ce0.appspot.com",
    messagingSenderId: "502218558510"
  };
  firebase.initializeApp(config);



var database = firebase.database();



var updateTime = function() {
    var now = moment().format('hh:mm');
    $('#currentTime').html(now);
}

$(document).ready(function() {
    updateTime();
    setInterval(updateTime, 1000);
});



$('#submit').on('click', function() {

    var trainName = $('#trainName').val().trim();
    var destination = $('#destination').val().trim();
    var firstTrain = $('#firstTrain').val().trim();
    var frequency = $('#frequency').val().trim();


    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };


    database.ref().push(newTrain);

    $('#trainName').val('');
    $('#destination').val('');
    $('#firstTrain').val('');
    $('#frequency').val('');



    return false;

});


database.ref().on('child_added', function(childSnapshot, prevChildKey) {

    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var firstTrain = childSnapshot.val().firstTrain;



    var timeArr = firstTrain.split(":");
    var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);
    var tMinutes;
    var tArrival;

    if (maxMoment === trainTime) {
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");
      } else {

        var differenceTimes = moment().diff(trainTime, "minutes");
          var tRemainder = differenceTimes % frequency;
          tMinutes = frequency - tRemainder;
          tArrival = moment().add(tMinutes, "m").format("hh:mm A");
       }




     $("#table >tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + tArrival+ "</td><td>" + tMinutes + "</td></tr>");

});
