// var request = require("request");
var zoomUtil = require("../helpers/zoomutil");
var ZoomController = {
    getMeetings: function (req, res) {
        console.log("working");
        return new Promise((resolve, reject)=>{
            // return resolve({done:true, title:"Meeting Success"})
       
        var options = {
            method: 'GET',
            // A non-existing sample userId is used in the example below.
            url: 'https://api.zoom.us/v2/users/me/meetings',
            headers: {
                authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Im9CVHczLVA3UzE2ZGl0WG5sUU9pVXciLCJleHAiOjE2MzgxODQ5ODAsImlhdCI6MTYwNjY0MzY1M30.goPbSWUfOil85YQANOEydo9NJvYtZcOstcKq55MVoTs' // Do not publish or share your token publicly.
            }
        };

        request(options, function (error, response, body) {
            if (error) return reject(error);
            return res.json(body)
        });
    })
    },
    createMeeting: function (req, res) { 
        return new Promise( async(resolve, reject)=>{
            let mtgData={
                topic:  req.body.topic || "Testing",
                "start_time": req.body.start_time || "2020-11-29T15:50:00",
                "duration": req.body.duration || 30,
                "agenda": req.body.agenda,
            }
            try {
                var mtg=await ZoomService.createEvent(mtgData);
            } catch (error) {
                console.log(error)
                return reject(error)
            }
            if(!mtg){
               return reject("Zoom meeting not created!");
            }
            return resolve(mtg);
        })
    },
    getOneMeeting: function (req, res) {
        if(!req.params.meetingId){
            return reject({code:"Error", message:"Meeting ID required!"})
        }

        let meetingNumber=req.params.meetingId;
        let role=0;
        let apiKey="-4M954hwRaKaYD0CTvK_tA";
        let apiSecret="Q8SE0bvFBsMaRDlunnn5N6u6R8J3mysINFzT";

        let options = {
            method: 'GET',
            url: 'https://api.zoom.us/v2/meetings/'+meetingNumber,
            headers: {authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Ii00TTk1NGh3UmFLYVlEMENUdktfdEEiLCJleHAiOjE2MjM0ODc0NDAsImlhdCI6MTU5MTk0NjA2Mn0.5ZhoqVyNZ1iShQEDueuEp6dJca9pODyqOlfXFUhpvaU'}
        };

        request(options, function (error, response, body) {
            if (error) return reject(error);

            var signature = zoomUtil.generateSignatureString(meetingNumber, role, apiKey, apiSecret);
            console.log(body);
            return res.render("../src/views/zoom-mtg", {mtg:JSON.parse(body), signature:signature, apiKey:apiKey});
        });


    },
    updateMeeting: function (req, res) {

    },
    deleteMeeting: function (req, res) {

    } ,
    
}

module.exports = ZoomController; 