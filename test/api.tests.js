/**
 * @author ChikeUdenze
 * @since 11/4/2017
 */

let mongoose = global.mongoose = require("mongoose");
let chai = require("chai");
let chaiHttp = require("chai-http");
mongoose.Promise = global.Promise = require("bluebird");

let {url} = require("../config");

mongoose.connect(url, {useMongoClient: true});
let conn = mongoose.connection;

chai.use(chaiHttp);

describe("All Tests", () => {
    after(async () => {
        await conn.dropDatabase();
        return await conn.close();
    });

    require("./u_auth");
});