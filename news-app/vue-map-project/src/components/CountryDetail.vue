<template>
    <div class="country-detail bg-gray-100 py-6 px-4 sm:px-6 lg:px-8" v-if="countryDetails.name">
      <div class="header flex items-center justify-between mb-6">
        <h2 class="text-3xl font-semibold text-gray-800">{{ countryDetails.name.common }}</h2>
        <img class="flag w-20 h-auto rounded-md" :src="countryDetails.flags.svg || countryDetails.flags.png" alt="Flag" v-if="countryDetails.flags.svg || countryDetails.flags.png">
      </div>
      <div class="details text-base text-gray-700">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <template v-for="(group, groupName) in detailsGroups" :key="groupName">
            <div class="flex mb-4">
              <div class="w-1/3">
                <strong class="font-semibold">{{ groupName }}:</strong>
              </div>
              <div class="w-2/3">
                <template v-if="Array.isArray(group)">
                  <span v-for="(item, index) in group" :key="index">
                    <template v-if="typeof item === 'object' && !Array.isArray(item)">
                      <span v-for="(value, key) in item" :key="key">
                        {{ value }}{{ key !== Object.keys(item)[Object.keys(item).length - 1] ? ', ' : '' }}
                      </span>
                    </template>
                    <template v-else-if="groupName === 'Currencies'">
                      <span v-for="(currency, code) in item" :key="code">
                        {{ code }} ({{ currency.name }} - {{ currency.symbol }}){{ index !== Object.keys(group).length - 1 ? ', ' : '' }}
                      </span>
                    </template>
                    <template v-else-if="groupName === 'Calling Code'">
                      +{{ item.root }}{{ item.suffixes ? item.suffixes.join(', ') : '' }}
                    </template>
                    <template v-else-if="groupName === 'Flag' || groupName === 'Coat of Arms'">
                      <img :src="item.svg || item.png" class="w-16 h-auto rounded-md" alt="Flag or Coat of Arms">
                    </template>
                    <template v-else>
                      {{ item }}
                    </template>
                    <span v-if="index !== group.length - 1">, </span>
                  </span>
                </template>
                <template v-else>
                  {{ group }}
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      countryName: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        countryDetails: {} // Initialize as empty object
      };
    },
    async mounted() {
      try {
        const response = await axios.get(`http://localhost:3001/country/${this.countryName}`);
        this.countryDetails = response.data;
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    },
    computed: {
      detailsGroups() {
        return {
          'Official Name': this.countryDetails.name.official,
          'Native Name': this.countryDetails.nativeName,
          'Top Level Domain': this.countryDetails.tld,
          'Alpha-2 Code': this.countryDetails.cca2,
          'Alpha-3 Code': this.countryDetails.cca3,
          'Numeric Code': this.countryDetails.ccn3,
          'IOC Code': this.countryDetails.cioc,
          'Independent': this.countryDetails.independent,
          'UN Member': this.countryDetails.unMember,
          'Status': this.countryDetails.status,
          'Currencies': this.countryDetails.currencies,
          'Calling Code': this.countryDetails.idd,
          'Capital': this.countryDetails.capital,
          'Alternative Spellings': this.countryDetails.altSpellings,
          'Region': this.countryDetails.region,
          'Subregion': this.countryDetails.subregion,
          'Languages': this.countryDetails.languages,
          'Translations': this.countryDetails.translations,
          'Latitude and Longitude': this.countryDetails.latlng,
          'Landlocked': this.countryDetails.landlocked,
          'Borders': this.countryDetails.borders,
          'Area': this.countryDetails.area,
          'Demonyms': this.countryDetails.demonyms,
          'Flag': this.countryDetails.flags,
          'Gini Index': this.countryDetails.gini,
          'FIFA Code': this.countryDetails.fifa,
          'Car License Plate': this.countryDetails.car,
          'Timezones': this.countryDetails.timezones,
          'Continents': this.countryDetails.continents,
          'Start of Week': this.countryDetails.startOfWeek,
          'Maps': this.countryDetails.maps,
          'Population': this.countryDetails.population,
          'Coat of Arms': this.countryDetails.coatOfArms,
          'Postal Code': this.countryDetails.postalCode
        };
      }
    },
    methods: {
      formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your scoped styles here if needed */
  </style>
  

<!-- <template>
    <div class="country-detail" v-if="countryDetails.name">
      <div class="header">
        <h2>{{ countryDetails.name.common }}</h2>
        <img class="flag" :src="countryDetails.flags.svg" alt="Flag" v-if="countryDetails.flags.svg">
      </div>
      <div class="details">
        <div class="row">
          <div class="item">
            <strong>Official Name:</strong> {{ countryDetails.name.official }}
          </div>
          <div class="item">
            <strong>Native Name:</strong> 
            <span v-for="(nativeName, key) in countryDetails.nativeName" :key="key">
              {{ nativeName.common }} ({{ nativeName.official }})
              <span v-if="key !== Object.keys(countryDetails.nativeName)[Object.keys(countryDetails.nativeName).length - 1]">, </span>
            </span>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Top Level Domain:</strong> {{ countryDetails.tld }}
          </div>
          <div class="item">
            <strong>Alpha-2 Code:</strong> {{ countryDetails.cca2 }}
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Alpha-3 Code:</strong> {{ countryDetails.cca3 }}
          </div>
          <div class="item">
            <strong>Numeric Code:</strong> {{ countryDetails.ccn3 }}
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>IOC Code:</strong> {{ countryDetails.cioc }}
          </div>
          <div class="item">
            <strong>Independent:</strong> {{ countryDetails.independent }}
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>UN Member:</strong> {{ countryDetails.unMember }}
          </div>
          <div class="item">
            <strong>Status:</strong> {{ countryDetails.status }}
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Currencies:</strong>
            <span v-for="(currency, key) in countryDetails.currencies" :key="key">
              {{ currency.name }} ({{ currency.symbol }}){{ key !== Object.keys(countryDetails.currencies)[Object.keys(countryDetails.currencies).length - 1] ? ', ' : '' }}
            </span>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Calling Code:</strong>
            <span v-for="(suffix, key) in countryDetails.idd.suffixes" :key="key">
              {{ countryDetails.idd.root }}{{ suffix }}{{ key !== Object.keys(countryDetails.idd.suffixes)[Object.keys(countryDetails.idd.suffixes).length - 1] ? ', ' : '' }}
            </span>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Capital:</strong> {{ countryDetails.capital }}
          </div>
          <div class="item">
            <strong>Alternative Spellings:</strong>
            <span v-for="(altSpelling, key) in countryDetails.altSpellings" :key="key">
              {{ altSpelling }}{{ key !== Object.keys(countryDetails.altSpellings)[Object.keys(countryDetails.altSpellings).length - 1] ? ', ' : '' }}
            </span>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Region:</strong> {{ countryDetails.region }}
          </div>
          <div class="item">
            <strong>Subregion:</strong> {{ countryDetails.subregion }}
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Languages:</strong>
            <span v-for="(language, key) in countryDetails.languages" :key="key">
              {{ language }}{{ key !== Object.keys(countryDetails.languages)[Object.keys(countryDetails.languages).length - 1] ? ', ' : '' }}
            </span>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Translations:</strong>
            <ul>
              <li v-for="(translation, key) in countryDetails.translations" :key="key">
                <strong>{{ key }}</strong>: {{ translation.common }} ({{ translation.official }})
              </li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Latitude and Longitude:</strong> {{ countryDetails.latlng.join(', ') }}
          </div>
          <div class="item">
            <strong>Landlocked:</strong> {{ countryDetails.landlocked }}
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Borders:</strong>
            <span v-for="(border, key) in countryDetails.borders" :key="key">
              {{ border }}{{ key !== Object.keys(countryDetails.borders)[Object.keys(countryDetails.borders).length - 1] ? ', ' : '' }}
            </span>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Area:</strong> {{ countryDetails.area }} km²
          </div>
          <div class="item">
            <strong>Demonyms:</strong>
            <span v-for="(demonym, key) in countryDetails.demonyms" :key="key">
              {{ demonym }} ({{ key }})
            </span>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Flag:</strong> {{ countryDetails.flag }}
          </div>
          <div class="item">
            <strong>Gini Index:</strong> {{ countryDetails.gini }}
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>FIFA Code:</strong> {{ countryDetails.fifa }}
          </div>
          <div class="item">
            <strong>Car License Plate:</strong>
            <span v-for="(sign, key) in countryDetails.car.signs" :key="key">
              {{ sign }}{{ key !== Object.keys(countryDetails.car.signs)[Object.keys(countryDetails.car.signs).length - 1] ? ', ' : '' }}
            </span>
            ({{ countryDetails.car.side }} side)
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Timezones:</strong>
            <span v-for="(timezone, key) in countryDetails.timezones" :key="key">
              {{ timezone }}{{ key !== Object.keys(countryDetails.timezones)[Object.keys(countryDetails.timezones).length - 1] ? ', ' : '' }}
            </span>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Continents:</strong> {{ countryDetails.continents }}
          </div>
          <div class="item">
            <strong>Start of Week:</strong> {{ countryDetails.startOfWeek }}
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Maps:</strong>
            <a :href="countryDetails.maps.googleMaps" target="_blank">Google Maps</a>,
            <a :href="countryDetails.maps.openStreetMaps" target="_blank">OpenStreetMap</a>
          </div>
        </div>
        <div class="row">
          <div class="item">
            <strong>Population:</strong> {{ formatNumber(countryDetails.population) }}
          </div>
          <div class="item">
            <strong>Coat of Arms:</strong>
            <img class="coat-of-arms" :src="countryDetails.coatOfArms.svg" alt="Coat of Arms" v-if="countryDetails.coatOfArms.svg">
          </div>
        </div>
        <div class="row" v-if="countryDetails.postalCode">
          <div class="item">
            <strong>Postal Code Format:</strong> {{ countryDetails.postalCode.format }}
          </div>
          <div class="item">
            <strong>Postal Code Regex:</strong> {{ countryDetails.postalCode.regex }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      countryName: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        countryDetails: {} // Initialize as empty object
      };
    },
    async mounted() {
      console.log('Country name prop:', this.countryName); // Log the value of the countryName prop
      try {
        const response = await axios.get(`http://localhost:3001/country/${this.countryName}`);
        this.countryDetails = response.data;
        console.log('Country Details:', this.countryDetails);
    } catch (error) {
      console.error('Error fetching country details:', error);
    }
  },
  methods: {
    formatNumber(number) {
      // Function to format large numbers with commas
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
};
</script>

<style scoped>
.country-detail {
  margin: 20px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.flag {
  width: 100px;
  height: auto;
  border-radius: 5px;
}

.details {
  font-size: 16px;
}

.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.item {
  flex: 1;
}

.coat-of-arms {
  width: 100px;
  height: auto;
  border-radius: 5px;
}
</style> -->
