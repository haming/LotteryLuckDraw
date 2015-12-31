/**
 * Created by ming on 15/12/17.
 */
/**
 * 数据库连接
 */

var mysql = require("mysql");
exports.client = mysql.createConnection({
    host: "120.25.79.109",
    port: 3306,
    user: "root", //数据库用户名
    password: "root", //数据库密码
    database: "aliyun_choujiang" //数据库

});
