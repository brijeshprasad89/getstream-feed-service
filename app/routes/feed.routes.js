const router = require('express').Router();
const feedController = require('../controllers/feed.controller');
/**
 * @swagger
 * /feed/post:
 *   post:
 *     summary: To post a feed on behalf of an admin
 *     tags:
 *       - GetStream feed post service
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: body
 *         description: Body of the Feed
 *         in: body
 *         required: true
 *         schema:
 *             "$ref": "#/definitions/Feed"
 *     responses:
 *       200:
 *         description: Feed posted successfully
 *         schema:
 *           $ref: '#/definitions/Feed'
 *       400:
 *         description: Bad Request
 *         schema:
 *           $ref: '#/definitions/ValidationErrorMessage'
 *       404:
 *         description: Not Found
 *         schema:
 *           $ref: '#/definitions/ErrorMessage'
 *       500:
 *         description: Internal Server Error
 *         schema:
 *           $ref: '#/definitions/ErrorMessage'
 */

router.post('/post', (req, res) => {
    return feedController.postFeed(req, res);
});
module.exports = router;