<template>
    <div>
        {{  $route.params.cityname }}
        {{  $route.params.lat }}
        {{  $route.params.lon }}
    </div>
</template>

<script lang="ts" setup>
import { OPEN_WEATHER_API_URL, OPEN_WEATHER_API_KEY } from "../api";


</script>

<style lang="scss" scoped>

</style>