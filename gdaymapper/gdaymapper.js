$(function() {




});


function auth() {
    'client_id': 'YOUR CLIENT ID',
        'scope': 'https://www.googleapis.com/auth/urlshortener'
      };
      gapi.auth.authorize(config, function() {
        console.log('login complete');
        console.log(gapi.auth.getToken());
      });
}

function OnLoadCallback() {

}
