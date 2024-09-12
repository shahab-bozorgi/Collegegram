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
 * /posts?page=1&take=2&username=someUser:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Post
 *     summary: Get posts.
 *     description: Get all posts of a specifed user..
 *     parameters:
 *       - name: page
 *         in: query
 *         description: page number.
 *         schema:
 *           type: integer
 *       - name: take
 *         in: query
 *         description: page size.
 *         schema:
 *           type: integer
 *       - name: username
 *         in: query
 *         description: posts of username.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 *               data: {
 *                 "posts": [
 *                   {
 *                     "id": "2cf303ab-3095-43ce-a578-3c5b10fef519",
 *                     "createdAt": "2024-08-24T02:37:19.860Z",
 *                     "media": [
 *                       {
 *                         "id": "a99ce403-fbb2-4c3e-a8bb-66a615cc136f",
 *                         "name": "061ee257-1a2f-46c0-b152-b7381d678f7a.png",
 *                         "mime": "image/png",
 *                         "size": 111061,
 *                         "path": "http://localhost:4000/uploads/posts/061ee257-1a2f-46c0-b152-b7381d678f7a.png"
 *                       }
 *                     ]
 *                   },
 *                   {
 *                     "id": "60615098-fb31-432d-aefc-e9c73d327bf2",
 *                     "createdAt": "2024-08-24T02:37:19.205Z",
 *                     "media": []
 *                   }
 *                 ],
 *                 "nextPage": 2,
 *                 "totalPages": 12
 *               }
 *       '400':
 *         description: Bad request, possibly incorrect ID
 *       '401':
 *         description: Not authenticated
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */
