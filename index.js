var app = require('express')()
var mysql = require('mysql')
app.use(require('cors')())

var pool = mysql.createPool({
    host     : '222.249.132.19',
    user     : 'lwffdb',
    password : '123abc',
    database : 'mas'
});

app.get('/send',function (req, res) {


    pool.getConnection(function(err, connection) {
        // Use the connection
        if(err){
            return res.send(err)
        }
        var sql = `INSERT INTO api_mt_9902 (mobiles,content) VALUES (${req.query.phone},"${req.query.code}")`

				console.log(sql)
        connection.query(sql, function (error, results, fields) {
            // And done with the connection.
						connection.release();
            res.send('ok')
            // Handle error after the release.
            if (error) throw error;

            // Don't use the connection here, it has been returned to the pool.
        });
    });
})

app.listen(7788)
