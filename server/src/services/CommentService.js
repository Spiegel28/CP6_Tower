import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentService {
    async createComment(commentData) {

        const comment = await dbContext.Comments.create(commentData)
        await comment.populate('creator', 'name picture')
        return comment

    }

    async getCommentsInEvent(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
        return comments
    }

    async archiveComment(commentId, userId) {
        const archiveComment = await dbContext.Comments.findById(commentId)

        if (!archiveComment) { throw new BadRequest(`invalid id: ${commentId}`) }

        if (archiveComment.creatorId != userId) { throw new Forbidden('Not your event') }

        await archiveComment.deleteOne()

        return 'Ticket returned '
    }

}

export const commentService = new CommentService()