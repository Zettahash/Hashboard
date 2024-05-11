<template>
  <LineGraph :data="data" :options="options" class="ui-ele" />
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line as LineGraph } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'AssetsStats',
  components: {
    LineGraph
  },
  props: ['dataValues', 'colour'],
  data() {
    return {
      data: {
        labels: this.dataValues,
        datasets: [
          {
            borderWidth: 3,
            data: this.dataValues,
            fill: true,
            backgroundColor: this.colour,
            borderColor: this.colour,
            tension: .1,
          }
        ]
      },
      options: {
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false
            }
          },
          y: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0
          }
        },
        animation: {
          duration: 0
        },
        backgroundColor: this.colour,

        maintainAspectRatio: false
      }
    }
  },
  mounted() {

  },
}
</script>
