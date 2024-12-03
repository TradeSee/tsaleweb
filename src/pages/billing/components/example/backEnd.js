// .env example
// TOKEN_URL= https://aaaaaaaaaaaaa
// CHARGE_URL= https://aaaaaaaaaa

// app.post('/authorizePurchase',  function(req,res) {

//   var postBody = {
//       url: process.env.CHARGE_URL,
//       headers: {
//           'Content-Type': 'application/json',
//           'Request-Id' : uuidv1(),
//           'Authorization' : 'Bearer ' + process.env.ACCESS_TOKEN
//       },
//       body: req.body.json,
//       json: true
//   };

//   request.post(postBody, function (err, response) {
//       chargeID = response.body.id;
//       res.send(response.body);
//   });

// });

// app.post('/captureCharge', function(req,res) {

// ChargeId === RequestId enviado na request acima

//   var postBody = {
//       url: process.env.CHARGE_URL +'/'+ chargeID +'/capture',
//       headers: {
//           'Content-Type': 'application/json',
//           'Request-Id' : uuidv1(),
//           'Authorization' : 'Bearer ' + process.env.ACCESS_TOKEN
//       },
//       body: req.body.json,
//       json: true
//   };

//   request.post(postBody, function (err, response, data) {
//       res.send(response.body);
//   });

// });
