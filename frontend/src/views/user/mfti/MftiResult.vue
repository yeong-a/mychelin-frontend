<template>
    <div>
        <MainNavbar />
        <canvas id="myChart" width="500" height="500"></canvas>
    </div>
</template>

<script>
import Chart from "chart.js";
import MainNavbar from "@/components/bars/MainNavbar";

export default {
    data() {
        return {
            result: {},
        };
    },
    created() {
        let result = this.$route.params.mftiResult;
        console.log(result);
        // for (let key in result) {
        //     this.result[key] = result[key]['totalScore'] / result[key]['topicCount']
        // }
    },
    components: {
        MainNavbar,
    },
    mounted() {
        this.createChart();
    },
    methods: {
        createChart() {
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: "radar",
                data: {
                    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [
                        {
                            label: "# of Votes",
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                            ],
                            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        },
    },
};
</script>

<style></style>
