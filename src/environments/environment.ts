// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiKey: 'fc2726ff03a24560a9c1a7362e820fcd',
  url: 'https://api.sportsdata.io/v3/cbb/scores/json',
  firebase: {
    apiKey: "AIzaSyCeKqEkqQU4MoyizhgF9OVVZwldz_yyMcY",
    authDomain: "scores-99cfa.firebaseapp.com",
    databaseURL: "https://scores-99cfa.firebaseio.com",
    projectId: "scores-99cfa",
    storageBucket: "scores-99cfa.appspot.com",
    messagingSenderId: "1095043980470",
    appId: "1:1095043980470:web:a9e418184d49ff25601a17",
    measurementId: "G-E175TB2CR3"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
