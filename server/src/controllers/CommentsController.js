import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentService } from "../services/CommentService.js";

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:commentId', this.archiveComment)

    }

    async archiveComment(request, response, next) {
        try {
            const commentId = request.params.commentId
            const userId = request.userInfo.id
            const message = await commentService.archiveComment(commentId, userId)
        } catch (error) {
            next(error)
        }
    }

    async createComment(request, response, next) {
        try {
            const commentData = request.body
            commentData.creatorId = request.userInfo.id
            const comment = await commentService.createComment(commentData)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }
}