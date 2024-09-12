/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * security:
 *   - bearerAuth: []
 *
 * /posts/{postId}/comments:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Comment
 *     summary: Create comment.
 *     description: Create new comments. users can create new comments.
 *     parameters:
 *       - name: postId
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: PostId 
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [description]
 *             properties:
 *               parentId:
 *                 type: string
 *                 description: ParentId of the comment.
 *                 example: This can be id of a comment or null.
 *               description:
 *                 type: string
 *                 description: Comment of a post should have description.
 *                 example: "That is a nice post"
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               data: {}
 *       '400':
 *         description: Bad request, possibly incorrect data
 *       '401':
 *         description: Not authenticated
 *       '500':
 *         description: Internal server error
 */
