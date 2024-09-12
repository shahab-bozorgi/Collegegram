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
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Post
 *     summary: Get a post by ID.
 *     description: Retrieve a post using its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post.
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               data: {
 *                "id": "781d31da-5c67-406b-9dd4-996381a2bdc1",
 *                "caption": "some caption",
 *                "author": {
 *                    "firstName": "name",
 *                    "lastName": "lname",
 *                    "username": "username",
 *                    "avatar": {
 *                        "id": "b17b5225-4b0c-4236-9119-aeed0c9534f5",
 *                        "name": "99a183dc-e1db-461f-8484-b6aaa8b55a12.jpg",
 *                        "mime": "image/jpeg",
 *                        "size": 1842302,
 *                        "path": "uploads/users/avatar/99a183dc-e1db-461f-8484-b6aaa8b55a12.jpg"
 *                    }
 *                },
 *                "tags": [
 *                    "tag1",
 *                    "tag2",
 *                ],
 *                "mentions": [
 *                    "someUser"
 *                ],
 *                "media": [
 *                    {
 *                        "id": "11a69c2a-112b-439d-af2b-9243b23079da",
 *                        "name": "3a935f79-cb50-49d5-9aa5-eb4faf773b66.jpg",
 *                        "mime": "image/jpeg",
 *                        "size": 1842302,
 *                        "path": "uploads/posts/3a935f79-cb50-49d5-9aa5-eb4faf773b66.jpg"
 *                    },
 *                    {
 *                        "id": "adc5cadf-7d26-4562-8a62-3fdeb4801b1c",
 *                        "name": "144028a0-ac7e-46c3-afcc-3379984c577f.jpeg",
 *                        "mime": "image/jpeg",
 *                        "size": 9402,
 *                        "path": "uploads/posts/144028a0-ac7e-46c3-afcc-3379984c577f.jpeg"
 *                    }
 *                ],
 *                "isBookmarked": true,
 *                "bookmarksCount": 0,
 *                "likesCount": 0,
 *                "commentsCount": 0,
 *                "closeFriendsOnly": boolean,
 *                "createdAt": 2024-08-24T02:37:15.664Z
 *            }
 *       '400':
 *         description: Bad request, possibly incorrect ID
 *       '401':
 *         description: Not authenticated
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */
