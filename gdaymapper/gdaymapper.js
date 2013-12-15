// $(function() {
//     handleClientLoad();
// });

var scopes = 'https://www.googleapis.com/auth/calendar.readonly';
var clientId = '603971821012-bd6lksgdh1sopsghcm8opa1vfqdh27i5.apps.googleusercontent.com';

$(function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);

  $('#authorize-button').click(checkAuth);
  populateDateFields();
  // window.setTimeout(checkAuth,1);
});

function handleClientLoad() {
  console.log("handleClientLoad");
}
function checkAuth() {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
    var authToken = gapi.auth.getToken();
    var authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {
      authorizeButton.style.visibility = 'hidden';
      makeApiCall();
    } else {
      authorizeButton.style.visibility = '';
      authorizeButton.onclick = handleAuthClick;
    }
}

function handleAuthClick(event) {
    // Step 3: get authorization to use private data
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    return false;
}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  // Step 4: Load the Google+ API
  gapi.client.load('calendar', 'v3', function() {
    // Step 5: Assemble the API request
    var request = gapi.client.calendar.calendarList.list();
    // Step 6: Execute the API request
    request.execute(function(resp) {
        var calendars = JSON.stringify(resp, null, 4);

        var html = '';
        for (var i = 0; i < resp.items.length; i++) {
          html += '<option value="' + resp.items[i].id + '">' + resp.items[i].summary + '</option>';
        }
        $('select.calendarList').append(html).change(onSelectCalendar);
    });
  });
}

function onSelectCalendar(event) {
  var calendarId = $(this).val();
  console.log("Calendar selected", {t: this, e: event});
  console.log("Selected", calendarId);

  loadEvents();
}

function populateDateFields() {
  var today = new Date();
  $('input.day').val(today.getDate());
  $('input.month').val(today.getMonth());
  $('input.year').val(today.getFullYear());
}

function loadEvents() {
  var calendarId = $('select.calendarList').val();
  var year = $('input.year').val();
  var month = $('input.month').val();
  var day = parseInt($('input.day').val(), 10);
  var today = new Date(year, month, day).toISOString();
  var tomorrow = new Date(year, month, day + 1).toISOString();

  var request = gapi.client.calendar.events.list({calendarId: calendarId,
    timeMin: today, timeMax: tomorrow});

  request.execute(function(resp) {
    console.log("events", resp);
  });

  var source = $("#events-template").html();
  var template = Handlebars.compile(source);
}

