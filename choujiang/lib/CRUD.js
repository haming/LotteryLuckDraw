/**
 * Created by root on 15-3-11.
 */
var CRUD = {
    //新增
    _insert: function (client, insertSQLString, value,callback) {
        client.query(insertSQLString, value, function (error, results) {
            if (error) {
                console.log("ClientReady Error:" + error.message);
                client.end();
                callback(error,false);
            } else {
                console.log("Inserted:" + results.affectedRows + " row.");
                console.log("Insert success...");
                callback(error,results);
            }
        });
    },
    //查询
    _select: function (client, selectSQLString, value,callback) {
        client.query(selectSQLString, value, function (error, results) {
            if (error) {
                console.log("GetData Error:" + error.message);
                client.end();
                callback(error,false);
            }
            if (results.length > 0) {
                callback(error,results);
            }else{
                callback('result is null',false);
            }
        });
    },


    //更新
    _update: function (client, updateSQLString,value,callback) {
        client.query(updateSQLString,value, function (error, results) {
            if (error) {
                console.log("ClientReady Error:" + error.message);
                client.end();
                callback(error,false);
            }
            console.log("Update success...");
            callback(error,results);
        });
    },

    //删除
    _delete: function (client, deleteSQLString,value,callback) {
        client.query(deleteSQLString, value,function (error, results) {
            if (error) {
                console.log("ClientReady Error:" + error.message);
                client.end();
                callback(error,false);
            }
            console.log("Delete success...");
            callback(error,results);
        });
    }
};

exports._insert = CRUD._insert;
exports._select = CRUD._select;
exports._update = CRUD._update;
exports._delete = CRUD._delete;