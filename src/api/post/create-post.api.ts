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
 * /posts:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Post
 *     summary: Create post.
 *     description: Create new posts. users can create new posts.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               caption:
 *                 type: string
 *                 description: Caption for the post.
 *                 example: This is an example of a caption.
 *               mentions:
 *                 type: string
 *                 description: User's to be mentioned in the post.
 *                 example: "@testUser @someOtherUser"
 *               closeFriendsOnly:
 *                 type: boolean
 *                 description: Should the post be published to close friends only or not.
 *                 example: true
 *               pictures:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: An array of post's picture's binaries.
 *           encoding:
 *             pictures:
 *               contentType:
 *                 - image/jpeg
 *                 - image/jpg
 *                 - image/png
 *                 - image/webp
 *                 - image/avif
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
