<template>
    <div class="liked-news">
        <h1>Liked News</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <div v-for="article in likedArticles" :key="article._id" class="article">
                <img :src="article.urlToImage" alt="Image" />
                <h2>{{ article.title }}</h2>
                <p>{{ article.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            likedArticles: [],
            loading: true
        };
    },
    async created() {
        try {
            const response = await axios.get('http://localhost:8000/api/liked_news');
            this.likedArticles = response.data;
        } catch (error) {
            console.error('Error fetching liked news:', error);
        } finally {
            this.loading = false;
        }
    }
};
</script>

<style>
.liked-news {
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
</style>