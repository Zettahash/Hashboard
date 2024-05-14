<template>
  <div class="gauges-organiser">
    <div class="tiles-flex">
      <StatisticTile tileName="Average Hashrate" tileUnit="TH/s" tileValueRelative="up" tileValue="105.33"/>
      <StatisticTile tileName="Energised Hashrate" tileUnit="TH/s" tileValueRelative="up" tileValue="105.33"/>
      <StatisticTile tileName="Offline Hashrate" tileUnit="TH/s" tileValueRelative="down" tileValue="0.33"/>

      <StatisticTile tileName="Pool Efficiency" tileUnit="J/TH" tileValueRelative="up" tileValue="80.5"/>
      <StatisticTile tileName="Total Energy" tileUnit="MW" tileValueRelative="up" tileValue="300"/>
      <StatisticTile tileName="Network Share" tileUnit="%" tileValueRelative="up" tileValue="0.11"/>
      <StatisticTile tileName="Machine Count" tileUnit="units" tileValueRelative="up" tileValue="3035"/>
      <StatisticTile tileName="Machine Outages" tileUnit="units" tileValueRelative="down" tileValue="3"/>

      <StatisticLarge tileName="Revenue" tileUnit="USD-T" tileValueRelative="up" tileValue="$816,355" :filterOptions="sampleFilterOptions" />

      <StatisticMediumSemiCircleGauge tileName="Efficiency" tileUnit="kWh/USD-T" tileValueRelative="up" tileValue="115%" chartData="[80, 20, 5]" />
      <StatisticMediumList tileName="Revenue" tileUnit="USD-T" tileValueRelative="up" tileValue="$816,355" :filterOptions="sampleFilterOptions"/>

    </div>
  </div>
</template>

<script setup>
import StatisticTile from '@/components/charts/Mining/StatisticTile.vue'
import StatisticLarge from '@/components/charts/Mining/StatisticLarge.vue'
import StatisticMediumSemiCircleGauge from '@/components/charts/Mining/StatisticMediumSemiCircleGauge.vue';
import StatisticMediumList from '@/components/charts/Mining/StatisticMediumList.vue';

const sampleFilterOptions = [
  {title:'Period ', key:'Current quarter', options:['Current quarter','May','April','March']}
]
</script>

<style lang="scss" scoped>
.gauges-organiser{
  width: 100%;
  display: flex;
  flex-direction: column;
.tiles-flex {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 30px 20px;
    position: relative;
}
}
</style>