import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentService {
async createComment(commentData){
    
    const response = await api.post('api/comments', commentData)
    logger.log('created comment', response.data)
    AppState.comments.push(new Comment(response.data))
}

async getCommentsByEventId(eventId) {
    const response = await api.get(`api/events/${eventId}/comments`)
    logger.log('got comments', response.data)
    AppState.comments = response.data.map(commentPojo => new Comment(commentPojo))
}

async deleteComment(commentId){
    
    const response = await api.delete(`api/comments/${commentId}`, commentId)
    logger.log('deleted comment', response.data)
    const commentIndex = AppState.comments.findIndex(comment => comment.id == commentId)
    if (commentIndex == -1) {
        throw new Error('index was -1')
    }

    AppState.comments.splice(commentIndex,1)
}
}

export const commentService = new CommentService()