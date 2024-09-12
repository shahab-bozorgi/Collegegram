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

 * /users/close-friends?page=1&limit=2:
 *   get:
 *     summary: Get a list of close friends
 *     description: Retrieves the list of close friends.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Close friends
 *     parameters:
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
 *       200:
 *         description: Successfully retrieved the list of close friends
 *         content:
 *           application/json:
 *             example:
 *               ok: true,
 *               data: {
 *                "users": [
 *                  {
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
 *                  }
 *                ],
 *                "nextPage": null,
 *                "totalPages": 1
 *              }
 *       400:
 *         description: Bad request, possibly due to invalid user ID
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
