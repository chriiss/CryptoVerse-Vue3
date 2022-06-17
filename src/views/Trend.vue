<script>
import axios from 'axios'
export default {
    data() {
        return {
            trendData: []
        }
    },
    methods: {
        async getTrendData() {
            await axios.get("https://api.coingecko.com/api/v3/search/trending")
            .then(res => {
                this.trendData = res.data.coins;
            })
            .catch(error => {
                console.log(error);
            })
        }
    },
    mounted() {
        this.getTrendData();
    }
}
</script>


<template>
<div class="title_bloc">
  <h1 class="text-center">Top 7 Cryptos Trending</h1>
</div>
 <div class="table-responsive">
      <table class="table" >
        <thead>
          <tr>
            <th scope="col">Coin</th>
            <th scope="col">BTC Price</th>
          </tr>
        </thead>
        <tbody v-for="trend in trendData" :key="trend.id">
          <tr>
            <td>
              <span class="d-flex">
                <img :src="trend.item.thumb" :alt="trend.item.name"/>
                  <span>&nbsp; {{trend.item.market_cap_rank}} {{trend.item.name}} <br><span class="symbol">{{trend.item.symbol}}</span></span>
              </span>
            </td>
            <td>{{trend.item.price_btc.toFixed(4)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>


<style lang="scss">
@use "../assets/var.scss" as *;

.title_bloc {
  padding-top: $rem_pos*3;
}
</style>