<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <img class='img-fluid'
          src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Event Photo">
      </div>
      <div class="col-12">
        <h3>How Tower works</h3>
      </div>
      <div class="col-10 d-flex justify-content-between ">
        <p><i><i class="mdi mdi-glasses"></i></i> Discover events you are interest in </p>


        <button class="btn" data-bs-toggle="modal" data-bs-target="#eventModal">
          <i class="mdi mdi-plus me-1"></i> Start an event with your friends
        </button>
      </div>
      <div class="col-12 mb-3">
        <h3>Explore categories</h3>
      </div>
      <div class="col-12 d-flex justify-content-between mb-3">
        <button class="btn" v-for="type in types" :key="type" @click="changeFilterTerm(type)">
          {{ type }}
        </button>
      </div>
      <div class="col-12 mb-3">
        <h3>Upcoming Events</h3>
      </div>
      <div class="row">
        <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-4 d-flex mb-3">
          <EventCard :towerEvent='towerEvent' />
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, ref } from 'vue';
import { towerEventService } from '../services/TowerEventService';
import Pop from '../utils/Pop';
import { TowerEvent } from '../models/TowerEvent';
import { AppState } from '../AppState';
import EventCard from '../components/EventCard.vue'

export default {
  setup() {
    const filterTerm = ref('all')

    onMounted(() =>
      getAllTowerEvents())

    async function getAllTowerEvents() {
      try {
        await towerEventService.getAllTowerEvents()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {

      filterTerm,
      changeFilterTerm(term) {
        filterTerm.value = term
      },
      types: ['concert', 'convention', 'sport', 'digital', 'misc'],
      towerEvents: computed(() => {
        if (filterTerm.value == 'all') {
          return AppState.towerEvents
        }
        else {
          return AppState.towerEvents.filter(towerEvent => towerEvent.type == filterTerm.value)
        }
      })

    }
  },
  components: { EventCard }
}
</script>


<style lang="scss" scoped></style>
