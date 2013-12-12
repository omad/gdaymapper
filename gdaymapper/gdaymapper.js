$(function() {
    handleClientLoad();
});
function boo() {
        console.log('login complete');
        console.log(gapi.auth.getToken());
    }

function handleClientLoad() {
    var config = {
        'client_id': '603971821012-bd6lksgdh1sopsghcm8opa1vfqdh27i5.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/calendar.readonly'
      };
    gapi.auth.authorize(config, handleAuthResult);
}

function handleAuthResult(authResult) {
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

        $('#id').html(calendars);

      // var heading = document.createElement('h4');
      // var image = document.createElement('img');
      // image.src = resp.image.url;
      // heading.appendChild(image);
      // heading.appendChild(document.createTextNode(resp.displayName));

      // document.getElementById('content').appendChild(heading);
    });
  });
}
