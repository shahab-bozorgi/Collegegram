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
 * /posts/{id}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Post
 *     summary: Edit post.
 *     description: Edit an existing post. Users can update their posts.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to edit.
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               caption:
 *                 type: string
 *                 description: Caption for the post.
 *                 example: This is an example of a caption with #tag.
 *               mentions:
 *                 type: string
 *                 description: User's to be mentioned in the post. if not set or empty, mentioned users will be deleted if any.
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
 *               deletedMedia:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of post's deleted media IDs.
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
