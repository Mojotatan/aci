var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(
  '158897282442-6eenteahs6scsi3gddci010jojqpm0gj.apps.googleusercontent.com',
  'FF5ZEo3JzYl5Jc-fp0LjYaeO',
  'http://localhost:1337/oauth'
);

module.exports = oauth2Client