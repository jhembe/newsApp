<template>
  <div class="container">
    <l-map
      v-if="mapReady"
      :zoom="zoom"
      :center="center"
      style="height: 100vh; width: 100%;"
      @click="clearSelection"
      @zoomend="handleZoomEnd"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <l-marker
        v-for="(country, index) in countries"
        :key="index"
        :lat-lng="country.latlng"
        @click="(event) => fetchCountryInfo(event, country)"
      >
        <l-popup v-if="selectedCountry && selectedCountry.name.common === country.name.common">
          <div class="popup-content">
            <button class="close-btn" @click="clearSelection">&times;</button>
            <h2>{{ selectedCountry.name.common }}</h2>
            <p>Capital: {{ selectedCountry.capital[0] }}</p>
            <p>Region: {{ selectedCountry.region }}</p>
            <p>Subregion: {{ selectedCountry.subregion }}</p>
            <p>Population: {{ selectedCountry.population }}</p>
            <button @click="learnMore(selectedCountry)">Learn More</button>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<!-- 
<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue3-leaflet';
import 'leaflet/dist/leaflet.css';
import { router } from '../router'
import axios from 'axios';

export default defineComponent({
  name: 'HelloWorld',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  setup() {
    const zoom = ref(3.6);
    const center = ref([0, 25]); // Center of Africa
    const countries = ref([]);
    const selectedCountry = ref(null);
    const mapReady = ref(false); // Flag to track map readiness

    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:3001/countries'); // Adjust URL as per your backend API
        countries.value = response.data;
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    const fetchCountryInfo = async (event, country) => {
      event.originalEvent.stopPropagation();
      try {
        const response = await axios.get(`http://localhost:3001/country/${country.name.common}`);
        selectedCountry.value = response.data;
      } catch (error) {
        console.error('Error fetching country information:', error);
      }
    };


    const learnMore = (country) => {
      console.log('Learn more about:', country);
      // Navigate to CountryDetail component with country data
      router.push({ name: 'CountryDetail', params: { countryName: country.name.common } });
    };


    const clearSelection = () => {
      selectedCountry.value = null;
    };

    const handleZoomEnd = () => {
      // Handle any actions needed after zooming ends
      console.log('Zoom ended');
    };

    // Fetch countries data on component mount
    onMounted(async () => {
      await fetchCountries();
      mapReady.value = true; // Set mapReady to true after fetching data
    });

    // Watch for changes in selectedCountry and clear selection if map is not ready
    watch(selectedCountry, () => {
      if (!mapReady.value) {
        clearSelection();
      }
    });

    return {
      zoom,
      center,
      countries,
      selectedCountry,
      fetchCountryInfo,
      learnMore,
      clearSelection,
      handleZoomEnd,
      mapReady
    };
  }
});
</script> -->

// MapComponent.vue
<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import { LMap, LTileLayer, LMarker, LPopup } from 'vue3-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Import useRouter from vue-router

export default defineComponent({
  name: 'MapComponent',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  setup() {
    const zoom = ref(3.6);
    const center = ref([0, 25]); // Center of Africa
    const countries = ref([]);
    const selectedCountry = ref(null);
    const mapReady = ref(false); // Flag to track map readiness
    const router = useRouter(); // Use useRouter hook to access router instance

    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:3001/countries');
        countries.value = response.data;
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    const fetchCountryInfo = async (event, country) => {
      event.originalEvent.stopPropagation();
      try {
        const response = await axios.get(`http://localhost:3001/country/${country.name.common}`);
        selectedCountry.value = response.data;
      } catch (error) {
        console.error('Error fetching country information:', error);
      }
    };

    const learnMore = (country) => {
      console.log('Learn more about:', country);
      // Navigate to CountryDetail component with country data
      router.push({ name: 'CountryDetail', params: { countryName: country.name.common } });
    };

    const clearSelection = () => {
      selectedCountry.value = null;
    };

    const handleZoomEnd = () => {
      // Handle any actions needed after zooming ends
      console.log('Zoom ended');
    };

    // Fetch countries data on component mount
    onMounted(async () => {
      await fetchCountries();
      mapReady.value = true; // Set mapReady to true after fetching data
    });

    // Watch for changes in selectedCountry and clear selection if map is not ready
    watch(selectedCountry, () => {
      if (!mapReady.value) {
        clearSelection();
      }
    });

    return {
      zoom,
      center,
      countries,
      selectedCountry,
      fetchCountryInfo,
      learnMore,
      clearSelection,
      handleZoomEnd,
      mapReady
    };
  }
});
</script>



<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.popup-content {
  text-align: left;
}

.close-btn {
  float: right;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

#map {
  width: 100%;
}
</style>
