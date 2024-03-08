<template>
    <RouterLink :to="{ name: 'Tower Event Details', params: { eventId: towerEvent.id } }">
        <div class="container-fluid">
            <div class="card text-start">
                <img class="card-img-top image-fluid event-img" :src="towerEvent.coverImg"
                    :alt="`cover image for event ${towerEvent.name}`" />
                <div class="card-body">
                    <h4 class="card-title">{{ towerEvent.name }}</h4>
                    <p class="card-text">Hosted by {{ towerEvent.creator.name }}</p>
                    <!-- NOTE fix creator, comes over in log but not in object  -->
                </div>
            </div>
        </div>
    </RouterLink>
</template>


<script>
import { TowerEvent } from '../models/TowerEvent.js'
export default {
    props: { towerEvent: { type: TowerEvent, required: true } },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.event-img {
    height: 25vh;
    width: 100%;
    object-position: center;
    object-fit: cover;
}
</style>