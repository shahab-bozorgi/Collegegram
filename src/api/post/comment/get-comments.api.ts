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
 * /posts/{postId}/comments?page=1&limit=2:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Comment
 *     summary: Get comments.
 *     description: Get comments of post by PostId.
 *     parameters:
 *       - name: postId
 *         in: path
 *         schema:
 *           type: string
 *         required: true
 *         description: PostId
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *         required: true
 *         description: page number.
 *       - name: limit
 *         in: query
 *         schema:
 *           type: integer
 *         required: true
 *         description: page size.
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               data: {
 *                  "comments": [
 *                      {
 *                          "id": "781d31da-5c67-406b-9dd4-996381a2bdc1",
 *                          "postId": "365028a0-4562-9dd4-8a62-3fdeb4801b1c",
 *                          "parentId": null,
 *                          "likeCommentsCount": 2,
 *                          "description": "This is a nice post",
 *                          "replies": [
 *                              {
 *                          "id": "adc5cadf-5c67-7d26-9dd4-996381a2bdc1",
 *                          "postId": "365028a0-4562-9dd4-8a62-3fdeb4801b1c",
 *                          "parentId": "781d31da-5c67-406b-9dd4-996381a2bdc1",
 *                          "likeCommentsCount": 10,
 *                          "description": "Thanks",
 *                          "createdAt": "2024-08-25T08:37:19.860Z",
 *                          "user": {
 *                          "id": "d9ae9bd5-abf8-4dc6-ade2-9b23f71615ff",
 *                          "firstName": "john",
 *                          "lastName": "Doe",
 *                          "username": "johndoe"
 *                          },
 *                      }
 *                          ],
 *                          "createdAt": "2024-08-24T02:37:19.860Z",
 *                          "user": {
 *                          "id": "d9ae9bd5-abf8-4dc6-ade2-9b23f71615ff",
 *                          "firstName": "john",
 *                          "lastName": "Doe",
 *                          "username": "johndoe"
 *                          },
 *                      },
 *                      {
 *                          "id": "kis5cadf-5c67-7d26-9dd4-996381a2duj1",
 *                          "postId": "365028a0-4562-9dd4-8a62-3dkie4801b1c",
 *                          "parentId": null,
 *                          "likeCommentsCount": 0,
 *                          "description": "Thanks",
 *                          "createdAt": "2024-08-25T08:37:19.860Z",
 *                          "user": {
 *                          "id": "d9ae9bd5-abf8-4dc6-ade2-9b23f71615ff",
 *                          "firstName": "john",
 *                          "lastName": "Doe",
 *                          "username": "johndoe"
 *                          },
 *                      }
 *                  ]
 *               }
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */
