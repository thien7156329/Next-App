/* eslint-disable */

self.addEventListener(
  'notificationclick',
  function (event) {
    const verbWorker = event.notification.data.FCM_MSG.data.verb;
    event.stopImmediatePropagation();
    // let url = getUrl(verbWorker, event.notification.data.FCM_MSG.data);
    event.notification.close();
    console.log(event, "cc");
    clients.openWindow("/");
  },
  false,
);

if ('function' === typeof importScripts) {
  self.importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
  self.importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

  const firebaseConfig = {
    apiKey: "AIzaSyArfNa3KE7LZ6NXzxfmVVTIt_KZUbj2hYA",
    authDomain: "next-13161.firebaseapp.com",
    projectId: "next-13161",
    storageBucket: "next-13161.appspot.com",
    messagingSenderId: "791481971668",
    appId: "1:791481971668:web:08cc01b08364ed106edc41",
    measurementId: "G-D2SE5JTRS1",
  };
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();
  messaging.setBackgroundMessageHandler(function (payload) {
    const notificationTitle = payload.title;
    const notificationOptions = {
      body: payload.body,
      icon: '/favicon.ico',
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
  });
}
