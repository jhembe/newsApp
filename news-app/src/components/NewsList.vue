<template>
    <div class="news-list max-w-screen-xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Top News</h1>
  
      <!-- User customization section
      <div class="flex flex-wrap mb-8">
        <div class="w-full md:w-1/3 md:pr-2">
          <label for="country" class="block font-semibold mb-2">Country:</label>
          <select v-model="country" @change="fetchNews" id="country" class="bg-white border border-gray-300 rounded-md py-2 px-4 block w-full">
            <option value="us">United States</option>
            <option value="gb">United Kingdom</option>
            <option value="ca">Canada</option>
          </select>
        </div>
  
        <div class="w-full md:w-1/3 md:px-2">
          <label for="category" class="block font-semibold mb-2">Category:</label>
          <select v-model="category" @change="fetchNews" id="category" class="bg-white border border-gray-300 rounded-md py-2 px-4 block w-full">
            <option value="">All</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="science">Science</option>
            <option value="health">Health</option>
          </select>
        </div>
  
        <div class="w-full md:w-1/3 md:pl-2">
          <label for="query" class="block font-semibold mb-2">Search:</label>
          <input v-model="query" @input="fetchNews" id="query" type="text" placeholder="Search news..." class="bg-white border border-gray-300 rounded-md py-2 px-4 block w-full">
        </div>
      </div> -->
  
      <!-- News list -->
      <div v-if="loading" class="text-center mt-8">Loading...</div>
      <div v-else>
        <div v-for="article in articles" :key="article.title" class="article mb-8 flex flex-col md:flex-row">
          <div class="md:w-1/3 mb-4 md:mb-0">
            <img v-if="article.urlToImage" :src="article.urlToImage" alt="Image" class="w-full rounded-lg">
          </div>
          <div class="md:w-2/3 md:pl-4">
            <h2 class="text-xl font-bold mb-2">{{ article.title }}</h2>
            <p class="text-gray-700 mb-4">{{ article.description }}</p>
            <button @click="likeNews(article)" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Like
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        articles: [],
        loading: true,
        query: 'Tanzania OR Kenya'
      };
    },
    async created() {
      await this.fetchNews();
    },
    methods: {
      async fetchNews() {
        try {
            // console.log("Country : ", this.country,"Category : ",this.category,"Query : ",this.category);
          const response = await axios.get('http://localhost:8000/api/news', {
            params: {
              query: this.query
            }

          });
          this.articles = response.data.filter(article => article.urlToImage && article.description); // Filter out articles without image or description
        } catch (error) {
          console.error('Error fetching news:', error);
        } finally {
          this.loading = false;
        }
      },
      async likeNews(article) {
        try {
          await axios.post('http://localhost:8000/api/news/like', article);
          alert('News liked successfully');
        } catch (error) {
          console.error('Error liking news:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .article {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
  }
  
  .article img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .article h2 {
    color: #333;
  }
  
  .article p {
    color: #666;
  }
  </style>
  


<!-- <template>
    <div class="news-list">
        <h1>Top News</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <div v-for="article in articles" :key="article.title" class="article">
                <img :src="article.urlToImage" alt="Image" />
                <h2>{{ article.title }}</h2>
                <p>{{ article.description }}</p>
                <button @click="likeNews(article)">Like</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            articles: [],
            loading: true
        };
    },
    async created() {
        try {
            const response = await axios.get('http://localhost:8000/api/news');
            console.log('Response Data',response.data)
            this.articles = response.data; // Assuming response.data is an array of articles
            console.log('Response Data V2',this.articles)
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            this.loading = false;
        }
    },
    methods: {
        async likeNews(article) {
            try {
                await axios.post('http://localhost:8000/api/news/like', article);
                alert('News liked successfully');
            } catch (error) {
                console.error('Error liking news:', error);
            }
        }
    }
};
</script>

<style>
.news-list {
    max-width: 800px;
    margin: auto;
    padding: 20px;
}

.article {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
}

.article img {
    max-width: 100%;
    height: auto;
}

.article h2 {
    font-size: 1.5em;
}

.article p {
    font-size: 1em;
}

.article button {
    margin-top: 10px;
}
</style> -->
