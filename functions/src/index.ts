import * as functions from 'firebase-functions'
import firebase from 'firebase-admin'
import express from 'express'
import cors from 'cors'

firebase.initializeApp()

const app = express()
app.use(cors({ origin: true }))

exports.payment_intent = functions.https.onRequest(app)
