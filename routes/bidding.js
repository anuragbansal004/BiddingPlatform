var express=require('express');
var router = express.Router();



router.post('/addBid',function(req,res)
 {

 	var bid_details=req.body;

    //var productId=bid_details.productlocation+""+bid_details.date+""+bid_details.timeslot;

    console.log(bid_details.productId);
    console.log(bid_details.email);
    console.log(bid_details.amount);

    var post={product_id:bid_details.productId,user_email:bid_details.email,bid_amount:bid_details.amount};

    var connection=req.connection;

    connection.query('INSERT INTO bid_table SET ?',post, function(err, result) {
         
    if(!err)
    {
        res.render('bidSuccess.html');
    }
    else
    {
        
    }
});

    //connection.end();
    
});

router.post('/deleteBid',function(req,res,next)
 {

 	var connection = req.connection;

    var reqbody = req.body;
    var email = reqbody.email;
    var productId=reqbody.productlocation+""+reqbody.date+""+reqbody.timeslot;
    //var bidAmount = reqbody.amount;
  

    connection.query('DELETE FROM bid_table where product_id = ? AND user_email=?',[productId,email], function(err, result) {
         
    if(err)
        console.log("error in query exec "+err);
    else
        res.send(result);
});

	
    //connection.end();
});


router.post('/updateBid', function(req, res, next) {
  var connection = req.connection;

  var reqbody = req.body;
  var email = reqbody.email;
  var productId=reqbody.productlocation+""+reqbody.date+""+reqbody.timeslot;
  var bidAmount = reqbody.amount;
  
  console.log(email);
  console.log(productId);
  console.log(bidAmount);
  
  
  connection.query('update bid_table SET bid_amount =? WHERE user_email=? AND product_id = ?'
    ,[bidAmount,email,productId],function(err,results){

    if(err)
        console.log("error in query exec "+err);
    else
        res.send("Baba UPdateds!!!");
  });
});




router.post('/startbid',function(req,res,next){

    var requestBody = req.body;
    var productId=bid_details.productlocation+""+bid_details.date+""+bid_details.timeslot;
    var connection = req.connection;
    var active ="ACTIVE";

    connection.query('insert into product_bid_status(product_id,status) values (?,?);',[productId,active],function(err,results){
        if(err)
            console.log("error " +err);
        else
            console.log("query success");
        res.send(results);
    });
});



router.post('/endBid',function(req,res,next)
 {

 	var bid_details=req.body;
 	var  product_id=bid_details.productlocation+""+bid_details.date+""+bid_details.timeslot;

    var connection=req.connection;



    connection.query('SELECT  user_email,bid_amount from bid_table where product_id = ? ORDER BY bid_amount DESC',[product_id],function(err, rows, fields) {
    if (err) throw err;


    console.log('Email: ', rows[0].user_email);

    if(rows.length==0)
         res.json({winnername:"Bidding not done ",amount:'NA'});
    else if(rows.length>1)
        res.json({winnername:rows[0].user_email,amount:rows[1].bid_amount});

    else if(rows.length==1)
        res.json({winnername:rows[0].user_email,amount:rows[0].bid_amount});

   
        
    /*for (var i in rows) {
        console.log('Post Titles: ', rows[i].user_email);
    }*/
});

	
    //connection.end();
});



router.get('/showBid',function(req,res)
 {

 	var bid_details=req.body;
 	var  product_id=bid_details.product_id;

    var connection=req.connection;

    

    connection.query('SELECT  user_email,bid_amount from bid_table where product_id = ?',[product_id],function(err, rows, fields) {
    if (err) throw err;


   
 
    for (var i in rows) {
        console.log(rows[i].user_email+'  '+rows[i].bid_amount);
    }
});

	
    //connection.end();
});


module.exports = router;