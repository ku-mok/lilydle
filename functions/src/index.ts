import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { createLilydleAnswer } from "./assaultlilyRdf";
import path = require("path");
import os = require("os");
const firebase = admin.initializeApp();
const storage = firebase.storage();

export const updateLilydleAnswer = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async (_) => {
    // download old lilydle answer from firestore
    const bucket = storage.bucket();
    const tempFilePath = path.join(os.tmpdir(), "lilydle-answer.json");
    let oldLilydleAnswer = [];
    await bucket
      .file("lilydle-answer.json")
      .download({ destination: tempFilePath, validation: false })
      .then(() => {
        functions.logger.log("download old lilydle answer from firestore");
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        oldLilydleAnswer = require(tempFilePath);
      })
      .catch((e) => {
        functions.logger.log(e);
        oldLilydleAnswer = [];
      });

    // fetch and transform assaultlily rdf
    const newLilydleAnswer = await createLilydleAnswer();
    // compare old and new lilydle answer
    const isUpdated = oldLilydleAnswer.length !== newLilydleAnswer.length;
    functions.logger.debug("isUpdated: " + isUpdated);
    functions.logger.debug(
      "newLilydleAnswer Count: " + newLilydleAnswer.length
    );
    functions.logger.debug(
      "oldLilydleAnswer Count: " + oldLilydleAnswer.length
    );
    // if new lilydle answer is different from old lilydle answer, update firestore
    if (isUpdated) {
      await bucket
        .file("lilydle-answer.json")
        .save(JSON.stringify(newLilydleAnswer), {
          contentType: "application/json",
        })
        .then(() => {
          functions.logger.log("update lilydle answer to firestore");
        })
        .catch((error) => {
          functions.logger.log("update lilydle answer to firestore error");
          functions.logger.log(error);
        });
    }
  });
