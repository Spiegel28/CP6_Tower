import { dbContext } from "../db/DbContext.js"

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

}

export const commentService = new CommentService()