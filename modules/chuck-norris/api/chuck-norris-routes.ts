import { Request, Response } from 'express';
import * as core from 'express-serve-static-core';
import { getQtyFromRequest } from '../../../utils/route-utils';
import facts from "./chuckfacts.json"
/**
 * @openapi
 * definitions:
 *   ChuckNorrisFact:
 *     description: Chuck Norris Facts were obtained from api.chucknorris.io
 *     type: object
 *     properties:
 *       categories:
 *         type: array
 *         items:
 *           type: string
 *         example: ["science","dev"]
 *         description: A list of categories that this fact relates to.
 *       icon:
 *         type: string
 *         example: https://assets.chucknorris.host/img/avatar/chuck-norris.png
 *         description: URL for an icon - provided in the original data from api.chucknorris.com      
 *       id:
 *         type: string
 *         example: izjeqnjzteeqms8l8xgdhw
 *         description: ID from api.chucknorris.io
 *       sourceUrl:
 *         type: string
 *         example: https://api.chucknorris.io/jokes/izjeqnjzteeqms8l8xgdhw
 *         description: URL for this Fact on api.chucknorris.io
 *       value:
 *         type: string
 *         example: Chuck Norris knows the last digit of pi.
 */

const defaultErrorMessage = 'Unable to provide a random list of names at this time. Unknown Error Occured';

/**
 * @openapi
 * definitions:
 *   ChuckNorrisFact:
 *     description: Chuck Norris Facts were obtained from api.chucknorris.io
 *     type: object
 *     properties:
 *       categories:
 *         type: array
 *         items:
 *           type: string
 *         example: ["science","dev"]
 *         description: A list of categories that this fact relates to.
 *       icon:
 *         type: string
 *         example: https://assets.chucknorris.host/img/avatar/chuck-norris.png
 *         description: URL for an icon - provided in the original data from api.chucknorris.com      
 *       id:
 *         type: string
 *         example: izjeqnjzteeqms8l8xgdhw
 *         description: ID from api.chucknorris.io
 *       sourceUrl:
 *         type: string
 *         example: https://api.chucknorris.io/jokes/izjeqnjzteeqms8l8xgdhw
 *         description: URL for this Fact on api.chucknorris.io
 *       value:
 *         type: string
 *         example: Chuck Norris knows the last digit of pi.
 */


module.exports = function (app: core.Express) {
    /**
     * @openapi
     * '/chuck-norris-fact/{category}':
     *   get:
     *     description: |-
     *        <img style="margin-right: 20px;float:left" height="50" width="50" title="image Title" alt="beware" src="/IMAG0038.jpg">
     *        **Retrieve a random Chuck Norris fact.**
     *        This endpoint returns a __single__ fact as it is not possible for the human brain to store more than 1 Chuck Norris fact without exploding (this is why we have Chuck Norris Databases)...  
     *        
     *        Of course the counter argument to that is "this is an api - and the end recipient is a computer".
     *        Maybe but think of the liability
     *     tags:
     *       - Chuck Norris
     *     summary: Returns a random Chuck Norris Fact.
     *     parameters:
     *       - in: path
     *         name: category
     *         description: The category of Chuck Norris fact.
     *         required: true
     *         default: all
     *         type: string
     *         enum:
     *           - all
     *           - dev
     *           - food
     *           - sport
     *           - career
     *           - fashion
     *           - history
     *           - animal
     *           - movie
     *           - money
     *           - music
     *           - celebrity
     *           - science
     *           - political
     *           - travel
     *           - religion
     *     responses:
     *       '200':
     *         description: OK
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/ChuckNorrisFact'
     *       '400':
     *         description: Unexpected Error
     *         schema:
     *           $ref: '#/definitions/ErrorResponse'
     */
    app.get('/chuck-norris-fact/:category/:qty?', (req: Request, res: Response) => {
        const qty = getQtyFromRequest(req,1);
        const category = req.params.category;
        console.log(JSON.stringify(category))
        console.log(qty)
        var factlist = []
        var filtered = category==="all" ? facts : facts.filter((value) =>{ return   value.categories.includes(category)   });
        console.log("Filtered list " + filtered.length);
        for (var i = 0; i < qty; i++) {
            var randomFact = {};
            randomFact = filtered[Math.floor(Math.random() * filtered.length)];
            factlist.push(randomFact)
        }
        res.json(factlist);
    });

    /**
     * @openapi
     * '/chuck-norris-fact/categories':
     *   get:
     *     tags:
     *       - Chuck Norris
     *     summary: Returns the available categories for a Chuck Norris Fact.
     *     responses:
     *       '200':
     *         description: OK
     *         schema:
     *           type: array
     *           items:
     *             type: string
     *             example: ["dev", "food", "sport", "career", "fashion", "history", "animal", "movie", "money", "music", "celebrity", "science", "political", "travel", "religion"]
     */
    app.get('/chuck-norris-fact/categories', (req: Request, res: Response) => {
        const categories = facts.map(item => item.categories[0]).filter((value, index, self) => self.indexOf(value) === index)
        console.log(JSON.stringify(categories));
        res.json(categories);
    });

 

};
