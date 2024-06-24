// server.js or index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const { News, LikedNews } = require('./models/News');
const winston = require('winston');

// Set up logging
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

const app = express();
app.use(cors());
const PORT = 8000; // Ensure this matches the port you're expecting to connect to

// MongoDB Atlas connection string
const MONGO_URL = "mongodb+srv://jhembe:jhembe@cluster0.xddayfq.mongodb.net/news?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URL)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(err => logger.error('MongoDB connection error:', err));

const NEWS_API_KEY = 'fff0127b04e840699b192bd21855ec65';

app.use(express.json());

const fetchNewsFromNewsAPI = async (params) => {
  try {
    const url = `https://newsapi.org/v2/top-headlines`;
    const response = await axios.get(url, {
      headers: { 'X-Api-Key': NEWS_API_KEY },
      params: params
    });
    const data = response.data;

    let articles = [];
    if (data.status === 'ok') {
      articles = data.articles.map(article => ({
        title: article.title,
        description: article.description,
        urlToImage: article.urlToImage || "https://via.placeholder.com/150"
      }));
    }
    return articles;
  } catch (error) {
    logger.error('Error fetching news from NewsAPI:', error);
    throw error;
  }
};

app.get('/api/news', async (req, res) => {
  try {
    const { country = 'us', category, query } = req.query;
    const params = { country };
    
    if (category) params.category = category;
    if (query) params.q = query;

    const articles = await fetchNewsFromNewsAPI(params);
    await News.deleteMany({});
    await News.insertMany(articles);

    const news = await News.find({});
    res.json(news);
  } catch (error) {
    logger.error('Error in /api/news endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/news/like', async (req, res) => {
  try {
    const { title, description, urlToImage } = req.body;
    const likedNews = new LikedNews({ title, description, urlToImage });
    await likedNews.save();
    res.json({ message: "News liked successfully" });
  } catch (error) {
    logger.error('Error in /api/news/like endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/liked_news', async (req, res) => {
  try {
    const likedNews = await LikedNews.find({});
    res.json(likedNews);
  } catch (error) {
    logger.error('Error in /api/liked_news endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});



// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const axios = require('axios');
// const { News, LikedNews } = require('./models/News');
// const winston = require('winston');

// // Set up logging
// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.Console(),
//     new winston.transports.File({ filename: 'combined.log' })
//   ]
// });

// const app = express();
// app.use(cors());
// const PORT = 8000; // Ensure this matches the port you're expecting to connect to

// // MongoDB Atlas connection string
// const MONGO_URL = "mongodb+srv://jhembe:jhembe@cluster0.xddayfq.mongodb.net/news?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(MONGO_URL)
//   .then(() => logger.info('Connected to MongoDB'))
//   .catch(err => logger.error('MongoDB connection error:', err));

// const NEWS_API_KEY = 'fff0127b04e840699b192bd21855ec65';

// app.use(express.json());

// const fetchNewsFromNewsAPI = async (params) => {
//   try {
//     const url = `https://newsapi.org/v2/top-headlines`;
//     const response = await axios.get(url, {
//       headers: { 'X-Api-Key': NEWS_API_KEY },
//       params: params
//     });
//     const data = response.data;

//     let articles = [];
//     if (data.status === 'ok') {
//       articles = data.articles.map(article => ({
//         title: article.title,
//         description: article.description,
//         urlToImage: article.urlToImage || "https://via.placeholder.com/150"
//       }));
//     }
//     return articles;
//   } catch (error) {
//     logger.error('Error fetching news from NewsAPI:', error);
//     throw error;
//   }
// };

// app.get('/api/news', async (req, res) => {
//   try {
//     const { country = 'us', category, query } = req.query;
//     const params = { country };
    
//     if (category) params.category = category;
//     if (query) params.q = query;

//     const articles = await fetchNewsFromNewsAPI(params);
//     await News.deleteMany({});
//     await News.insertMany(articles);

//     const news = await News.find({});
//     res.json(news);
//   } catch (error) {
//     logger.error('Error in /api/news endpoint:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.post('/api/news/like', async (req, res) => {
//   try {
//     const { title, description, urlToImage } = req.body;
//     const likedNews = new LikedNews({ title, description, urlToImage });
//     await likedNews.save();
//     res.json({ message: "News liked successfully" });
//   } catch (error) {
//     logger.error('Error in /api/news/like endpoint:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/api/liked_news', async (req, res) => {
//   try {
//     const likedNews = await LikedNews.find({});
//     res.json(likedNews);
//   } catch (error) {
//     logger.error('Error in /api/liked_news endpoint:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.listen(PORT, () => {
//   logger.info(`Server running on http://localhost:${PORT}`);
// });
