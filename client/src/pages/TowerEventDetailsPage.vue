<template>
    <div class="container-fluid">
        <section v-if="towerEvent" class="row">
            <div class="col-12">
                <img class=img-fluid :src="towerEvent.coverImg" :alt="towerEvent.name">
            </div>
            <div class="col-6">
                <div class="d-flex">
                    <h1 v-if="towerEvent" :class="{ 'text-danger': towerEvent.isCanceled }">{{ towerEvent.name }}</h1>
                    <p>{{ towerEvent.type }}</p>
                    <button @click="cancelEvent()" class="btn btn-success" type="button">
                        <i class=" me-1"></i>Cancel Event
                    </button>
                </div>
                <div class="d-flex ">
                    <p>{{ towerEvent.description }}</p>
                    <div class="col-4 card">
                        <p>interested in going?</p>
                        <button>Attend</button>
                    </div>
                </div>
                <p>tim</p>
                <p>{{ towerEvent.location }}</p>
                <div class="col-6">
                    <p>see what folks are saying</p>
                </div>
            </div>

        </section>
    </div>
</template>


<script>
import { computed, ref, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { towerEventService } from '../services/TowerEventService.js'
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';

export default {
    setup() {
        const route = useRoute()

        onMounted(() => {
            getTowerEventById()
        })

        async function getTowerEventById() {
            try {
                await towerEventService.getEventById(route.params.eventId)

            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            route,
            towerEvent: computed(() => AppState.activeEvent),

            async cancelEvent() {
                try {
                    const event = AppState.activeEvent
                    const wantsToCancel = await Pop.confirm(`Are you sure you want to cancel${event.name}?`)
                    if (!wantsToCancel) { return }
                    await towerEventService.cancelEvent(event.id)
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }

}

</script>


<style lang="scss" scoped></style>