<template>
    <div>
        <MainNavbar/>
        <div class="result-wrap">
            <div class="mfti-description">
                <p>당신은 <span>{{ result.placePreference.userAsAction }}</span>한</p>
                <p><span>{{ result.placePreference.userAsAnimal }}</span>입니다</p>
            </div>
            <canvas id="myChart" width="500" height="500"></canvas>
        </div>
        {{ result }}
    </div>
</template>

<script>
import Chart from 'chart.js'
import MftiApi from "@/apis/MftiApi";
import MainNavbar from '@/components/bars/MainNavbar'

export default {
    components: {
        MainNavbar,
    },
    data() {
        return {
            result: {
                placePreference: {},
            },
            resultLabels: ['단 음식', '짠 음식', '신 음식', '기름진 음식', '매운 음식'],
            resultDatas: [],
        }
    },
    watch: {
        result() {
            this.resultDatas = Object.values(this.result.tastePreference)
            this.createChart()
        }
    },
    created() {
        MftiApi.getMftiResult().then(res => {
            this.result = res.data.data
        })
    },
    methods: {
        createChart() {
            Chart.defaults.global.defaultFontFamily = "'Spoqa Han Sans Neo', sans-serif"
            var ctx = document.getElementById('myChart');
            var myChart = new Chart(ctx, {
                type: "radar",
                data: {
                    labels: this.resultLabels,
                    datasets: [{
                        data: this.resultDatas,
                        backgroundColor: [
                            'rgba(255, 153, 60, 0.6)',
                            'rgba(255, 153, 60, 1)',
                            'rgba(255, 153, 60, 1)',
                            'rgba(255, 153, 60, 1)',
                            'rgba(255, 153, 60, 1)',
                            'rgba(255, 153, 60, 1)',
                        ],
                        borderColor: [
                            'rgba(255, 153, 60, 1)',
                            'rgba(255, 153, 60, 1)',
                            'rgba(255, 153, 60, 1)',
                            'rgba(255, 153, 60, 1)',
                            'rgba(255, 153, 60, 1)',
                            'rgba(255, 153, 60, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scale: {
                        pointLabels: {
                            fontSize: 14,
                            fontStyle: 'bold',
                        },
                        ticks: {
                            beginAtZero: true,
                            max: 100,
                            maxTicksLimit: 6,
                        },
                    },
                    legend: {
                        display: false,
                    },
                },
            });
        },
    },
};
</script>

<style scoped>
.result-wrap {
    margin: 100px 20px 0;
}
.mfti-description {
    text-align: center;
    font-size: 18px;
    margin: 20px;
}
.mfti-description span {
    font-size: 28px;
    font-weight: 800;
}
</style>