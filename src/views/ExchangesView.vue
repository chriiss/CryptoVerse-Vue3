<script>
import axios from 'axios'
import FormatCount from "../components/FormatCount.vue"
import filterSelectData from "../data.json";

export default {
  components: {
    FormatCount
  },
  data() {
    return {
      exchangesData: [],
      exchangeSearch: "",
      sortBy: null,
      getSelectDatas: filterSelectData.exchangeSelectFilterComponent,
      view: {
        topOfPage: true
      }
    }
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    async getExchangesData() {
      await axios.get("https://api.coingecko.com/api/v3/exchanges?per_page=250")
      .then(res => {
        this.exchangesData = res.data
      })
      .catch(error => {
        console.log(error);
      })
    },
    handleScroll() {
      if(window.pageYOffset>50){
        if(this.view.topOfPage) this.view.topOfPage = false;
      } else {
        if(!this.view.topOfPage) this.view.topOfPage = true;
      }
    }
  },
  computed: {
    filteredExchanges() {
      return this.exchangesData.filter(data => {
        return data.name.toLowerCase().includes(this.exchangeSearch)
      })
    },
    getSelectFilterExchange() {
      if(this.sortBy === "7") {
        return this.exchangesData.sort((a,b) => {
          return b.year_established - a.year_established
        })
      }
      if(this.sortBy === "8") {
        return this.exchangesData.sort((a,b) => {
          return a.year_established - b.year_established
        })
      }
      if(this.sortBy === "9") {
        return this.exchangesData.sort((a,b) => {
          return b.trade_volume_24h_btc - a.trade_volume_24h_btc
        })
      }
      if(this.sortBy === "10") {
        return this.exchangesData.sort((a,b) => {
          return a.trade_volume_24h_btc - b.trade_volume_24h_btc
        })
      }
    }
  },
  mounted() {
    this.getExchangesData();
  }
}
</script>


<template>
  <main>
    <FormatCount ref="countFormat"/>
     <div :class="{ 'onScroll': !view.topOfPage}">
      <div class="search_wrapper">
        <input type="text" v-model="exchangeSearch" placeholder="Search exchange name"/>
      </div>
    </div>

    <div class="d-flex selected_container">
     <div class="selected_filter" v-for="data in getSelectDatas" :key="data.id">
       <label>{{data.label}}</label><br>
       <select v-model="sortBy" class="btn-dark" :change="getSelectFilterExchange">
          <option :value="data.value">{{data.name}}</option>
          <option :value="data.value_bis">{{data.name_bis}}</option>
       </select>
     </div>
    </div>

    <div class="table-responsive">
      <table class="table" >
        <thead>
          <tr>
            <th scope="col">Exchange</th>
            <th scope="col">Trust Score</th>
          </tr>
        </thead>
        <tbody v-for="exchange in filteredExchanges" :key="exchange.id">
          <tr>
            <td>
              <span class="d-flex">
                <img :src="exchange.image" :alt="exchange.name"/>
                  <span>&nbsp; {{exchange.trust_score_rank}} {{exchange.name}}</span>
              </span>
            </td>

            <td>
              {{exchange.trust_score}}
            </td>

            <div class="d-flex flex-column bd-highlight mb-3">
              <td class="url">Url: <a :href="exchange.url" target="_blank">{{exchange.url}}</a></td>
              <td>Année: {{exchange.year_established}}</td>
              <td>Trade vol: ${{this.$refs.countFormat.formatCount(exchange.trade_volume_24h_btc, true)}}</td>
            </div>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style lang="scss">
@import "../assets/var.scss";

.url {
  word-break: break-word;
}
</style>
