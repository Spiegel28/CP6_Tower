<template>
    <form @submit.prevent="createComment()">
        <div class="form-floating mb-3">
            <input v-model="editableCommentData.body" type="text" class="form-control" id="body" placeholder="Body"
                minlength="1" maxlength="1000" required>
            <label for="body">Say Something</label>
        </div>

        <div class="text-end">
            <button type="submit" class="btn btn-primary">Submit</button>
        </div>
    </form>
</template>


<script>
import { ref } from 'vue';
import { commentService } from '../services/CommentService.js';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const editableCommentData = ref({ body: '', eventId: '' })
        const route = useRoute()
        return {
            editableCommentData,

            async createComment() {
                try {
                    const commentData = editableCommentData.value
                    const eventId = route.params.eventId // pull id out of route parameters
                    commentData.eventId = eventId.toString() // add id to ref object
                    await commentService.createComment(commentData)

                    editableCommentData.value = { body: '', eventId: '' }
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>