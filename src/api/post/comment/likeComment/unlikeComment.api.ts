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
 * /posts/{postId}/comments/{commentId}/unlike:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Comment
 *     summary: Unlike comment.
 *     description: Unlike a comment. users can Unlike a comment.
 *     parameters:
 *       - name: postId
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: postId
 *       - name: commentId
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: commentId
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
