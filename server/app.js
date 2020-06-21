const express = require('express')
const firebase = require('firebase')
require('firebase/auth')
firebase.initializeApp({
  apiKey: 'AIzaSyDh0PTwrgtWfdDtnuc28NsXwXYDHUvumpM',
  authDomain: 'auth-efbb3.firebaseapp.com',
  databaseURL: 'https://auth-efbb3.firebaseio.com',
  projectId: 'auth-efbb3',
  storageBucket: 'auth-efbb3.appspot.com',
  messagingSenderId: '174943259903',
  appId: '1:174943259903:web:67509687796ed50823d0ca'
})
const authLogin = require('./routes/auth')

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/api', authLogin)
module.exports = app
