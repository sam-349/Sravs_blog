const mongoose = require("mongoose");
// const express = require("express");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  subtitle: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: [String],
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

articleSchema.pre("save", function (next) {
  this.updated = Date.now(); // Update to current date
  next();
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
