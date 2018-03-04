/* This is used to provide all generic Swagger definitions/models used in all routes. */

/**
 * @swagger
 * definitions:
 *   Feed:
 *     type: object
 *     properties:
 *       actor:
 *         type: string
 *       verb:
 *         type: string
 *       object:
 *         type: string
 *       message:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   ErrorMessage:
 *     type: object
 *     required:
 *       - code
 *       - message
 *     properties:
 *       code:
 *         type: integer
 *       message:
 *         type: string
 */

/**
 * @swagger
 * definitions:
 *   ValidationErrorMessage:
 *     type: object
 *     required:
 *       - errors
 *     properties:
 *       errors:
 *         type: array
 *         items:
 *           type: string
 */
