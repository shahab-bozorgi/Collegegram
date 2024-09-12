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
 * /posts/{postId}/unbookmark:
 *   post:
 *     summary: Remove bookmarked post from user bookmarks.
 *     description: Allows users to unbookmark their bookmarked posts.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Bookmarking
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to unbookmark.
 *     responses:
 *       200:
 *         description: Successfully unbookmarked the post
 *         content:
 *          application/json:
 *            example:
 *              ok: true
 *              data: {}
 *       400:
 *         description: Bad request, possibly incorrect data
 *       401:
 *         description: Not authenticated
 *       404:
 *         description: Post not found
 *       422:
 *           description: Field has an invalid or required value
 *           content:
 *            application/json:
 *               example:
 *                ok: true
 *                message: "Check validation key of this object!"
 *                validation: {
 *                      "postId": "invalid | required",
 *                }
 *       500:
 *         description: Internal server error
 */
