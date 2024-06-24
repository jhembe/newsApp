const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  urlToImage: String
});

const News = mongoose.model('News', newsSchema);
const LikedNews = mongoose.model('LikedNews', newsSchema);

module.exports = { News, LikedNews };
