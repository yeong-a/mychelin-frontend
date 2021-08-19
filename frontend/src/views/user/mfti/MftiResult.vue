<template>
    <div>
        <MainNavbar />
        <div class="result-wrap">
            <div class="mfti-description">
                <p>
                    당신은 <span>{{ result.userAsAnimal }}</span
                    >입니다
                </p>
            </div>
            <canvas id="myChart" width="500" height="500"></canvas>
            <div v-for="(type, idx) in characters" :key="idx" class="type-wrap">
                <span :class="type.result ? 'unselected' : 'selected'">{{ type.options[0] }}</span>
                <span>vs</span>
                <span :class="type.result ? 'selected' : 'unselected'">{{ type.options[1] }}</span>
            </div>
            {{ result.placePreference.explanation }}
        </div>
    </div>
</template>

<script>
import Chart from "chart.js";
import MftiApi from "@/apis/MftiApi";
import MainNavbar from "@/components/bars/MainNavbar";

export default {
    components: {
        MainNavbar,
    },
    data() {
        return {
            result: {
                placePreference: {},
            },
            resultLabels: ["단 음식", "짠 음식", "신 음식", "기름진 음식", "매운 음식"],
            resultDatas: [],
            characters: {
                challenging: {
                    options: ["모 험", "안 정"],
                    result: 0,
                },
                planning: {
                    options: ["계 획", "즉 흥"],
                    result: 0,
                },
                sociable: {
                    options: ["외 향", "내 향"],
                    result: 0,
                },
                sensitivity: {
                    options: ["민 감", "무 던"],
                    result: 0,
                },
            },
        };
    },
    computed: {
        characterResult() {
            //console.log(this.result.placePreference)
            return this.result.placePreference.map;
        },
    },
    watch: {
        result() {
            this.resultDatas = Object.values(this.result.tastePreference);
            this.createChart();

            const types = Object.keys(this.characters);
            for (let i = 0; i < 4; i++) {
                this.characters[types[i]].result = this.result.placePreference[types[i]];
            }
        },
    },
    created() {
        MftiApi.getMftiResult().then((res) => {
            this.result = res.data.data;
        });
    },
    methods: {
        createChart() {
            Chart.defaults.global.defaultFontFamily = "'Spoqa Han Sans Neo', sans-serif";
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: "radar",
                data: {
                    labels: this.resultLabels,
                    datasets: [
                        {
                            data: this.resultDatas,
                            backgroundColor: ["rgba(255, 153, 60, 0.6)", "rgba(255, 153, 60, 1)", "rgba(255, 153, 60, 1)", "rgba(255, 153, 60, 1)", "rgba(255, 153, 60, 1)", "rgba(255, 153, 60, 1)"],
                            borderColor: ["rgba(255, 153, 60, 1)", "rgba(255, 153, 60, 1)", "rgba(255, 153, 60, 1)", "rgba(255, 153, 60, 1)", "rgba(255, 153, 60, 1)", "rgba(255, 153, 60, 1)"],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scale: {
                        pointLabels: {
                            fontSize: 14,
                            fontStyle: "bold",
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
    margin: 80px 20px 0;
}
.mfti-description {
    text-align: center;
    font-size: 18px;
    margin: 10px 0 0;
}
.mfti-description span {
    font-size: 28px;
    font-weight: 800;
}
.type-wrap {
    text-align: center;
    font-size: 18px;
    margin: 5px 0;
}
.type-wrap > span {
    display: inline-block;
    margin: 0 15px;
    width: 50px;
}
.selected {
    font-weight: bold;
    font-size: 20px;
}
.unselected {
    font-weight: normal;
    color: #9b9b9b;
    font-size: 16px;
}
</style>
