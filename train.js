< script >
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCxcRAKrOEDoxOfqPRwZdJnYaphlmRovjc",
        authDomain: "trainscheduler-cc2cd.firebaseapp.com",
        databaseURL: "https://trainscheduler-cc2cd.firebaseio.com",
        projectId: "trainscheduler-cc2cd",
        storageBucket: "",
        messagingSenderId: "360190735139"
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
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().frequency;


    $('.table > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
        frequency + "</td><td>" + "Delayed" + "</td><td>" + "Unknown" + "</td></tr>");

});

</script>
