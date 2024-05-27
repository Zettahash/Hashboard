<template>
  <div class="gauges-organiser">
    <div class="tiles-flex">
      <StatisticTile tileName="Average Hashrate" tileUnit="TH/s" tileValueRelative="up" tileValue="600"/>
      <StatisticTile tileName="Energised Hashrate" tileUnit="TH/s" tileValueRelative="up" tileValue="~600"/>
      <StatisticTile tileName="Offline Hashrate" tileUnit="TH/s" tileValueRelative="down" tileValue="0.33"/>

      <StatisticTile tileName="Pool Accepted Shares" tileUnit="%" tileValueRelative="up" tileValue="99.4"/>
      <StatisticTile tileName="Total Energy Demand" tileUnit="KW" tileValueRelative="up" tileValue="10.5"/>
      <StatisticTile tileName="Network Share" tileUnit="%" tileValueRelative="up" tileValue="0.11"/>
      <StatisticTile tileName="Machine Count" tileUnit="units" tileValueRelative="up" tileValue="3"/>
      <StatisticTile tileName="Machine Outages" tileUnit="units" tileValueRelative="down" tileValue="0"/>

      <StatisticLarge tileName="Revenue" tileUnit="USD-T" tileValueRelative="up" tileValue="$816,355" :filterOptions="sampleFilterOptions" />

      <StatisticMediumSemiCircleGauge tileName="Operating Margin" tileUnit="$/MWh margin" tileValueRelative="up" tileValue="1.5" chartData="80,75" chartLegend="Hashprice,Hashcost" />
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