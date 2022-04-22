<script>
import axios from 'axios'
import FormatCount from "../components/FormatCount.vue"
import filterSelectData from "../data.json"

export default {
  components: {
    FormatCount
  },
  data() {
    return {
      cryptoData: [],
      cryptoSearch: "",
      sortBy: null,
      getSelectDatas: filterSelectData.homeSelectFilterComponent,
      view: {
        topOfPage: true
      }
    }
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    async getCryptoData() {
      await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false")
      .then(res => {
        this.cryptoData = res.data;
      })
      .catch(error => {
        console.log(error);
      })
    },
    handleScroll(){
      if(window.pageYOffset>50){
        if(this.view.topOfPage) this.view.topOfPage = false;
      } else {
        if(!this.view.topOfPage) this.view.topOfPage = true;
      }
    }
  },
  computed: {
    filteredCrypto() {
      return this.cryptoData.filter(data => {
        return (
          data.name.toLowerCase().includes(this.cryptoSearch) ||
          data.symbol.toLowerCase().includes(this.cryptoSearch)
        );
      })
    },
    getSelectFiltered() {
      if(this.sortBy === "1") {
        return this.cryptoData.sort(function(a,b){
       		return b.current_price - a.current_price;
        })
      }
      if(this.sortBy === "2") {
        return this.cryptoData.sort(function(a,b){
       		return a.current_price - b.current_price;
        })
      }
      if(this.sortBy === "3") {
        return this.cryptoData.sort(function(a,b){
       		return b.market_cap - a.market_cap;
        })
      }
      if(this.sortBy === "4") {
        return this.cryptoData.sort(function(a,b){
       		return a.market_cap - b.market_cap;
        })
      }
      if(this.sortBy === "5") {
        return this.cryptoData.sort(function(a,b){
       		return b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h;
        })
      }
      if(this.sortBy === "6") {
        return this.cryptoData.sort(function(a,b){
       		return a.market_cap_change_percentage_24h - b.market_cap_change_percentage_24h;
        })
      }
    }
  },
  mounted() {
    this.getCryptoData();
  }
}
</script>

<template>
  <main>
    <FormatCount ref="countFormat"/>
    <div :class="{ 'onScroll': !view.topOfPage}">
      <div class="search_wrapper">
        <input type="text" v-model="cryptoSearch" placeholder="Search name or symbol"/>
      </div>
    </div>

    <div class="d-flex selected_container">
      <div class="selected_filter" v-for="data in getSelectDatas" :key="data.id">
        <label>{{data.label}}</label><br>
        <select v-model="sortBy" class="btn-dark" :change="getSelectFiltered">
          <option :value="data.value">{{data.name}}</option>
          <option :value="data.value_bis">{{data.name_bis}}</option>
        </select>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table" >
        <thead>
          <tr>
            <th scope="col">Coin</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody v-for="crypto in filteredCrypto" :key="crypto.id">
          <tr>
            <td>
              <span class="d-flex">
                <img :src="crypto.image" :alt="crypto.name"/>
                <span class="table_pos">&nbsp;{{crypto.market_cap_rank}} {{crypto.name}} <br><span class="symbol">{{crypto.symbol}}</span></span> 
              </span>
            </td>

            <td>${{crypto.current_price.toFixed(2)}}</td>

            <div class="d-flex flex-column bd-highlight mb-3">
              <td><span>24h:</span> <span :class="(crypto.market_cap_change_percentage_24h <= 0) ? 'red' : 'green'">{{crypto.market_cap_change_percentage_24h.toFixed(2)}}%</span></td>
              <td>Cap: ${{this.$refs.countFormat.formatCount(crypto.market_cap, true)}}</td>
              <td>Circulating Supply: {{this.$refs.countFormat.formatCount(crypto.circulating_supply, true)}}</td>
              <td>Total Supply: {{this.$refs.countFormat.formatCount(crypto.total_supply, true)}}</td>
              <td>Ath: ${{this.$refs.countFormat.formatCount(crypto.ath, true)}}</td>
            </div>
            </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>


<style lang="scss">
</style>
