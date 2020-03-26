const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");


const databaseUrl = "workout";
const collections = ["plans"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("Database Error:", error);
})
module.exports = db;