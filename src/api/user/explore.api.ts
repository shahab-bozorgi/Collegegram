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
 * /users/explore?page=1&limit=10:
 *   get:
 *     summary: Get user explore.
 *     description: Get all the posts of the people a user follows.
 *     parameters:
 *       - name: page
 *         in: query
 *         description: page number.
 *         schema:
 *           type: string
 *       - name: limit
 *         in: query
 *         description: limit data for each page.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Explore
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               data: {
 *                "posts": [
 *                  {
 *                    "id": "039b5505-5f2b-4ee4-baff-0d678596329a",
 *                    "author": {
 *                      "id": "9aacfc90-4de9-4148-bbca-6bd682d67a56",
 *                      "firstName": null,
 *                      "lastName": null,
 *                      "username": "Alireza",
 *                      "avatar": {
 *                        "id": "197421b6-a5ba-406f-99be-fe4560dcf698",
 *                        "name": "imageName_3.jpg",
 *                        "mime": "image/jpg",
 *                        "size": 1000000,
 *                        "path": "uploads/posts/imageName_3.jpg",
 *                        "url": "http://localhost:4000/uploads/posts/imageName_3.jpg"
 *                      },
 *                      "followersCount": 1
 *                    },
 *                    "media": [
 *                      "http://localhost:4000/uploads/posts/imageName_3.jpg",
 *                      "http://localhost:4000/uploads/posts/imageName_1.jpg",
 *                      "http://localhost:4000/uploads/posts/imageName_2.jpg"
 *                    ],
 *                    "likesCount": 1,
 *                    "isLiked": true,
 *                    "bookmarksCount": 1,
 *                    "isBookmarked": false,
 *                    "commentsCount": 1
 *                  }
 *                ],
 *                "nextPage": null,
 *                "totalPages": 1
 *              }
 *       '400':
 *         description: Bad request, possibly incorrect data
 *       '401':
 *         description: Not authenticated
 *       '500':
 *         description: Internal server error
 */
