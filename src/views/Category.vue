<script>
import axios from 'axios'
import FormatCount from '../components/FormatCount.vue'
import filteredSelectData from '../data.json'

export default {
    components: {
        FormatCount
    },
    data() {
        return {
            categoryData: [],
            categorySearch: "",
            sortBy: null,
            getSelectDatas: filteredSelectData.categorySelectFilterComponent,
            view: {
                topOfPage: true
            }
        }
    },
    beforeMount() {
        window.addEventListener("scroll", this.handleScroll);
    },
    methods: {
        async getCategoryData() {
            await axios.get("https://api.coingecko.com/api/v3/coins/categories")
            .then(res => {
                this.categoryData = res.data;
            })
            .catch(error => {
                console.log(error);
            })
        },
        handleScroll() {
            let scroll = (window.pageYOffset>50) ? this.view.topOfPage = false : this.view.topOfPage = true
            return scroll;
        }

    },
    computed: {
        filteredCategory() {
            return this.categoryData.filter(data => {
                return data.name.toLowerCase().includes(this.categorySearch)
            })
        },
        getSelectFilterCategory() {

            const sortTypesCategory = {
                11: (a, b) =>  b.market_cap - a.market_cap,
                12: (a, b) => a.market_cap - b.market_cap,
                13: (a, b) => b.volume_24h - a.volume_24h,
                14: (a, b) => a.volume_24h - b.volume_24h,
                15: (a, b) => b.market_cap_change_24h - a.market_cap_change_24h,
                16: (a, b) => a.market_cap_change_24h - b.market_cap_change_24h,
            }
            return this.categoryData.sort(sortTypesCategory[this.sortBy]);

        }
    },
    mounted() {
        this.getCategoryData();
    }
}
</script>

<template>
    <main>
        <FormatCount ref="countFormat"/>
         <div :class="{ 'onScroll': !view.topOfPage}">
            <div class="search_wrapper">
                <input type="text" v-model="categorySearch" placeholder="Search category name"/>
            </div>
        </div>

        <div class="d-flex selected_container">
            <div class="selected_filter" v-for="data in getSelectDatas" :key="data.id">
            <label>{{data.label}}</label><br>
            <select v-model="sortBy" class="btn-dark" :change="getSelectFilterCategory">
                <option :value="data.value">{{data.name}}</option>
                <option :value="data.value_bis">{{data.name_bis}}</option>
            </select>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Category</th>
                        <th scope="col">Top 3 Coins</th>
                    </tr>
                </thead>
                <tbody v-for="category in filteredCategory" :key="category.id">
                    <tr>
                        <td>{{category.name}}</td>
                        <td>
                            <img class="img_space" :src="category.top_3_coins[0]" :alt="category.name">
                            <img class="img_space" :src="category.top_3_coins[1]" :alt="category.name">
                            <img class="img_space" :src="category.top_3_coins[2]" :alt="category.name">
                        </td>
                        <div class="d-flex flex-column bd-highlight mb-3">
                            <td>
                                <span>24h:</span> <span :class="(category.market_cap_change_24h <= 0) ? 'red' : 'green'">{{category.market_cap_change_24h.toFixed(2)}}%</span>
                            </td>
                            <td>Cap: ${{this.$refs.countFormat.formatCount(category.market_cap, true)}}</td>
                            <td>24h vol: ${{this.$refs.countFormat.formatCount(category.volume_24h, true)}}</td>
                        </div>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<style lang="scss">
@use "../assets/var.scss" as *;

.img_space {
    margin-left: $rem_pos*0.2;
}
</style>