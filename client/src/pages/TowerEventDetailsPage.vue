<template>
    <div class="container-fluid">
        <section v-if="towerEvent" class="row">
            <div class="col-12 text-center">
                <img class=img-fluid :src="towerEvent.coverImg" :alt="towerEvent.name">
            </div>
            <div class="col-12">
                <div class="d-flex justify-content-center">
                    <h1 v-if="towerEvent" :class="{ 'text-danger': towerEvent.isCanceled }">{{ towerEvent.name }}</h1>
                    <p>{{ towerEvent.type }}</p>
                </div>
                <div class="d-flex justify-content-center">
                    <button @click="cancelEvent()" class="btn btn-success" type="button">
                        <i class=" me-1"></i>Cancel Event
                    </button>
                </div>
                <div class="row justify-content-between">
                    <div class="d-flex col-6 m-3">
                        <p>{{ towerEvent.description }}</p>
                    </div>
                    <div class="card col-3">
                        <p>interested in going?</p>
                        <div class="text-light text-center fw-bold p-2"
                            :title="towerEvent.ticketCount + ' tickets left'">
                            <!-- <i class="mdi mdi-heart"></i>{{ album.memberCount }} -->
                        </div>
                        <!-- <button @click="createTicket" :disabled="isAttend" || towerEvent.isCanceled>Attend</button> -->
                        <div v-for="singleTicket in tickets" :key="singleTicket.id" class="d-flex">
                            <img class=img-fluid :src="singleTicket.profile.picture">
                            <p>{{ singleTicket.profile.name }}</p>
                            <!-- {{ tickets }} -->
                        </div>
                    </div>
                </div>
                <div class="col-6">

                </div>
                <p>{{ towerEvent.startDate }}</p>
                <p>{{ towerEvent.location }}</p>
                <div class="col-10 ">
                    <p>see what folks are saying</p>
                    <CommentForm />
                    <div class="container-fluid my-3">
                        <div v-if="towerEvent" class="text-start">
                            <!-- <img class="card-img-top image-fluid event-img" :src="comments.creator.name"
                                :alt="`cover image for event ${towerEvent.name}`" /> -->
                            <div v-for="singleComment in comment" :key="singleComment.id" class=" mb-3 card card-body">
                                <h4 class="card-title">{{ singleComment.creator.name }}</h4>
                                <div class="d-flex justify-content-between">
                                    <img class=img-fluid :src="singleComment.creator.picture">
                                    <p class="card-text"> {{ singleComment.body }}</p>
                                    <button @click="deleteComment()">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>


<script>
import { computed, ref, onMounted, popScopeId } from 'vue';
import Pop from '../utils/Pop.js';
import { towerEventService } from '../services/TowerEventService.js'
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { commentService } from '../services/CommentService.js';
import CommentForm from '../components/CommentForm.vue'
import { ticketService } from '../services/TicketService.js';

export default {
    setup() {
        const route = useRoute()

        onMounted(() => {
            getTowerEventById()
            getCommentsByEventId()
            getTicketsByEventId()
            // TODO call your other get functions here
        })



        async function getTicketsByEventId() {
            try {
                await ticketService.getTicketsByEventId(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getCommentsByEventId() {
            try {
                await commentService.getCommentsByEventId(route.params.eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        async function getTowerEventById() {
            try {
                await towerEventService.getEventById(route.params.eventId)

            } catch (error) {
                Pop.error(error)
            }
        }
        // TODO write function to get tickets for event
        // TODO write function to get comments for event


        return {
            route,
            towerEvent: computed(() => AppState.activeEvent),
            comment: computed(() => AppState.comments),
            tickets: computed(() => AppState.eventTickets),
            // isAttend: computed(() => AppState.profileTickets.some(ticket))

            async cancelEvent() {
                try {
                    const event = AppState.activeEvent
                    const wantsToCancel = await Pop.confirm(`Are you sure you want to cancel${event.name}?`)
                    if (!wantsToCancel) { return }
                    await towerEventService.cancelEvent(event.id)
                } catch (error) {
                    Pop.error(error)
                }
            },

            async deleteComment(commentId) {
                try {
                    const yes = await Pop.confirm()

                    if (!yes) return

                    await commentService.deleteComment(commentId)
                } catch (error) {
                    Pop.error(error)
                }
            },

            async createTicket() {
                try {
                    const eventData = { eventId: route.params.eventId }
                    await ticketService.createTicket(eventData)
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    },
    components: { CommentForm }
}

</script>


<style lang="scss" scoped></style>