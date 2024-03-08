<template>
    <form @submit.prevent="createTowerEvent()">

        <div class="form-floating mb-3">
            <input v-model="editableEventData.name" type="text" class="form-control" id="name" placeholder="Event Name"
                minlength="3" maxlength="50" required>
            <label for="name">Name</label>
        </div>

        <div class="form-floating mb-3">
            <input v-model="editableEventData.coverImg" type="url" class="form-control" id="coverImage"
                placeholder="Event Cover Image" minlength="1" maxlength="5000" required>
            <label for="coverImage">Cover Image URL</label>
        </div>
        <div class="form-floating mb-3">
            <input v-model="editableEventData.location" type="location" class="form-control" id="location"
                placeholder="Location" minlength="3" maxlength="2000" required>
            <label for="location">Location</label>
        </div>

        <div class="form-floating mb-3">
            <select v-model="editableEventData.type" class="form-select" id="type"
                aria-label="Floating label select example">
                <option v-for="type in types" :key="type" :value="type"> {{ type }}</option>
            </select>
            <label for="type">Type</label>
        </div>

        <div class="d-flex justify-content-between">

            <div class="form-floating mb-3">
                <input v-model="editableEventData.capacity" type="number" class="form-control" id="capacity"
                    placeholder="Capacity" minlength="1" maxlength="5000" required>
                <label for="capacity">Capacity</label>
            </div>

            <div class="form-floating mb-3">
                <input v-model="editableEventData.startDate" type="date" class="form-control" id="startDate"
                    placeholder="Description" minlength="1" maxlength="5000" required>
                <label for="startDate">StartDate</label>
            </div>
        </div>

        <div class="form-floating mb-3">
            <input v-model="editableEventData.description" type="text" class="form-control" id="description"
                placeholder="Description" minlength="1" maxlength="5000" required>
            <label for="description">Description</label>
        </div>

        <div class="text-end">
            <button class="btn btn-primary" type="submit">Submit</button>
        </div>
    </form>
</template>


<script>
import Pop from '../utils/Pop.js'
import { ref } from 'vue'
import { towerEventService } from '../services/towerEventService.js'
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const editableEventData = ref({ name: '', coverImg: '', category: 'misc' })
        const router = useRouter()
        return {
            editableEventData,
            types: ['concert', 'convention', 'sport', 'digital', 'misc'],

            async createTowerEvent() {
                try {
                    const towerEvent = await towerEventService.createTowerEvent(editableEventData.value)
                    editableEventData.value = { name: '', coverImg: '', category: 'misc' }
                    Modal.getOrCreateInstance('#eventModal').hide()
                    router.push({ name: 'Tower Event Details', params: { eventId: towerEvent.id } })
                } catch (error) {
                    Pop.error(error)
                }
            }

        }
    }
}
</script>


<style lang="scss" scoped></style>
