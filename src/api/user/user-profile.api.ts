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
 * /users/profile?username=someUser:
 *   get:
 *     summary: Retrieve user profile information
 *     description: Get the profile information of a user. JWT token should be provided in the Authorization header.
 *       if username is set profile info of the specified user will be returned.
 *     parameters:
 *       - name: username
 *         in: query
 *         description: user's username.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Profile
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User ID
 *                 avatar:
 *                   type: string
 *                   description: URL of the user's avatar
 *                 username:
 *                   type: string
 *                   description: Username of the user
 *                 email:
 *                   type: string
 *                   description: Email of the user. only provided in authenticated user's profile.
 *                 firstName:
 *                   type: string
 *                   description: User's first name
 *                 lastName:
 *                   type: string
 *                   description: User's last name
 *                 bio:
 *                   type: string
 *                   description: Bio of the user
 *                 isPrivate:
 *                   type: boolean
 *                   description: Whether profile is public or private.
 *                 followingsCount:
 *                   type: integer
 *                   description: Number of users the profile is following
 *                 followersCount:
 *                   type: integer
 *                   description: Number of users following the profile
 *                 postsCount:
 *                   type: integer
 *                   description: Number of posts made by the user
 *                 followingStatus:
 *                   type: string
 *                   description:  Pending | Blocked | Following | NotFollowing. only provided when viewing other users profiles.
 *             example:
 *               ok: true
 *               data: {
 *                 "id": "5bca304c-2e79-4045-b165-2b704fb2bbc4",
 *                 "avatar": {
 *                   "id": "b17b5225-4b0c-4236-9119-aeed0c9534f5",
 *                   "name": "99a183dc-e1db-461f-8484-b6aaa8b55a12.jpg",
 *                   "mime": "image/jpeg",
 *                   "size": 1842302,
 *                   "path": "uploads/users/avatar/99a183dc-e1db-461f-8484-b6aaa8b55a12.jpg"
 *                 },
 *                 "username": "test",
 *                 "email": "test@gmail.com",
 *                 "firstName": "test",
 *                 "lastName": "testy",
 *                 "bio": "test bio.",
 *                 "followingsCount": 5,
 *                 "followersCount": 6,
 *                 "postsCount": 7,
 *                 "isPrivate": true,
 *                 "followingStatus": "NotFollowing",
 *                 "followedStatus": "Blocked",
 *               }
 *       '400':
 *         description: Bad request, possibly incorrect data
 *       '401':
 *         description: Not authenticated
 *       '500':
 *         description: Internal server error
 */
