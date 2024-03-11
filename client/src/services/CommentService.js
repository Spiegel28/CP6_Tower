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

async deleteComment(commentData){
    
    const response = await api.delete('api/comments/${commentId}', commentData)
    logger.log('deleted comment', response.data)
}
}

export const commentService = new CommentService()