<script>
import axios from "axios"
import FormatCount from "../components/FormatCount.vue"

export default {
    components: {
        FormatCount
    },
    data() {
       return {
            headerCryptoData: [],
       }
    },
    methods: {
        async getHeaderCryptoData() {
           await axios.get("https://api.coingecko.com/api/v3/global")
           .then(res => {
               this.headerCryptoData = res.data;
           })
           .catch(error => {
                console.log(error);
            })
        },
    },
    mounted() {
        this.getHeaderCryptoData();
    }
}
</script>

<template>
<div class="header">
    <FormatCount ref="countFormat"/>
    <div class="text bg-dark" v-for="data in headerCryptoData" :key="data.id">
        <div class="d-flex label_crypto_data">
            <div>
                <p>&nbsp;Coin</p>
                <p>&nbsp;{{this.$refs.countFormat.formatCount(data.active_cryptocurrencies, true)}}</p>
            </div>
            <div>
                 <p>Total cap</p>
                 <p>${{this.$refs.countFormat.formatCount(data.total_market_cap.usd, true)}}</p>
            </div>
            <div>
                 <p>Total vol</p>
                <p>${{this.$refs.countFormat.formatCount(data.total_volume.usd, true)}}</p>
            </div>
           <div>
                <p>% 24h</p>
                <p :class="(data.market_cap_change_percentage_24h_usd <= 0) ? 'red' : 'green'">{{data.market_cap_change_percentage_24h_usd.toFixed(2)}}%</p>
            </div>
           <div>
                <p>Dominance</p>
                <p>BTC: {{data.market_cap_percentage.btc.toFixed(2)}}%</p>
            </div>
        </div>
    </div>
</div>
</template>



<style lang="scss">
@import "../assets/var.scss";

.text {
    color: $primary_color;
    padding-top: $rem_pos*2;
    padding-bottom: $rem_pos*1.1;

    .label_crypto_data {
        div {
           flex:0.3;
        }
    }
}
</style>