<template>
  <div class="container">
    <section class="row">
      <div v-for="tickets in ticket" :key="tickets.id" class="col-md-3 mb-3">
        <button @click="deleteTicket(tickets.id)" class="btn btn-danger">Unattend</button>
        <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-md-4 d-flex mb-3">
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
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { ticketService } from '../services/TicketService';
import Pop from '../utils/Pop';
import { TowerEvent } from '../models/TowerEvent';
export default {

  props: { TowerEvent: { type: TowerEvent, required: true } },
  setup() {
    onMounted(() => {
      getMyTickets()
    })

    async function getMyTickets() {
      try {
        await ticketService.getMyTickets()
      } catch (error) {
        Pop.error(error)
      }
    }

    return {
      account: computed(() => AppState.account),
      ticket: computed(() => AppState.eventTickets),

      async deleteTicket(ticketId) {
        try {
          const yes = await Pop.confirm()

          if (!yes) return

          await ticketService.deleteTicket(ticketId)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.event-img {
  height: 25vh;
  width: 100%;
  object-position: center;
  object-fit: cover;
}
</style>
