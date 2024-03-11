<template>
  <div class="container">
    <section class="row">
      <div v-for="tickets in ticket" :key="tickets.id" class="col-md-3 mb-3">
        <EventCard :event="ticket" />
        <button @click="deleteTicket(tickets.id)" class="btn btn-danger">Delete Collab</button>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { ticketService } from '../services/TicketService';
import Pop from '../utils/Pop';
export default {
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
</style>
