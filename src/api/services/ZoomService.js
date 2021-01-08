const request = require("request");
const zoomUtil = require("../helpers/zoomutil");
module.exports={
    createEvent:function(mtgBody){
        return new Promise(async function(resolve, reject){
            let mtgData={
                "topic": mtgBody.topic,
                "type": 2,
                "start_time": mtgBody.start_time,
                "duration": mtgBody.duration,
                "timezone": "Asia/Kolkata",
                "password": "12345",
                "agenda": mtgBody.agenda,

                "settings": {
                  "host_video": true,
                //   "participant_video": "boolean",
                //   "cn_meeting": "boolean",
                  "in_meeting": true,
                  "join_before_host": true,
                  "mute_upon_entry": true,
                //   "watermark": "boolean",
                //   "use_pmi": "boolean",
                  "approval_type": 0,
                //   "registration_type": "integer",
                //   "audio": "string",
                  "auto_recording": "cloud",
                //   "enforce_login": "boolean",
                //   "enforce_login_domains": "string",
                //   "alternative_hosts": "string",
                //   "global_dial_in_countries": [
                //     "string"
                //   ],
                //   "registrants_email_notification": "boolean"
                }
            };
            var zoomSettings = {
                "key" : "ZOOM",
                "value" : "",
                "more" : {
                    "apiKey" : "oBTw3-P7S16ditXnlQOiUw",
                    "apiSecret" : "pVeadQirKVvBqZUmOfde4BF7rdZJoNKdo3lg",
                    "jwtToken" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Im9CVHczLVA3UzE2ZGl0WG5sUU9pVXciLCJleHAiOjE2MzgxODQ5ODAsImlhdCI6MTYwNjY0MzY1M30.goPbSWUfOil85YQANOEydo9NJvYtZcOstcKq55MVoTs"
                },
            };
             
              var options = {
                method: 'POST',
                // A non-existing sample userId is used in the example below.
                url: 'https://api.zoom.us/v2/users/me/meetings',
                headers: {
                    'content-type': 'application/json',
                    authorization: 'Bearer '+zoomSettings.more.jwtToken // Do not publish or share your token publicly.
                },
                body:mtgData,
                json: true
            };

            request(options, function (error, response, body) {
                if (error) return reject(error);

                console.log(body);
                return resolve(body)
            });
        })
    },
    updateEvent:function(meetingId, mtgBody, clientId, userId){
        return new Promise(async function(resolve, reject){
            if(!meetingId){
                return reject({code:"Error", message:"Meeting ID required!"})
            }
            let mtgData={};
            if(mtgBody.start_time){
                mtgData.start_time=mtgBody.start_time;
            }
            if(mtgBody.duration){
                mtgData.duration=mtgBody.duration;
            }
            if(mtgBody.agenda){
                mtgData.agenda=mtgBody.agenda;
            }
            if(mtgBody.topic){
                mtgData.topic=mtgBody.topic;
            }
            var zoomSettings = {
                "key" : "ZOOM",
                "value" : "",
                "more" : {
                    "apiKey" : "oBTw3-P7S16ditXnlQOiUw",
                    "apiSecret" : "pVeadQirKVvBqZUmOfde4BF7rdZJoNKdo3lg",
                    "jwtToken" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Im9CVHczLVA3UzE2ZGl0WG5sUU9pVXciLCJleHAiOjE2MzgxODQ5ODAsImlhdCI6MTYwNjY0MzY1M30.goPbSWUfOil85YQANOEydo9NJvYtZcOstcKq55MVoTs"
                },
            }; 
            console.log("HERe");

              var options = {
                method: 'PATCH',
                // A non-existing sample userId is used in the example below.
                url: 'https://api.zoom.us/v2/meetings/'+meetingId,
                headers: {
                    'content-type': 'application/json',
                    authorization: 'Bearer '+zoomSettings.more.jwtToken // Do not publish or share your token publicly.
                },
                body:mtgData,
                json: true
            };
            console.log(options);

            request(options, function (error, response, body) {
                if (error) return reject(error);

                // console.log(response);
                // console.log(body);
                return resolve(mtgData)
            });
        })
    },
    startEvent:function(meetingNumber, clientId, hostUserId){
        return new Promise(async function(resolve, reject){
            var zoomSettings = {
                "key" : "ZOOM",
                "value" : "",
                "more" : {
                    "apiKey" : "oBTw3-P7S16ditXnlQOiUw",
                    "apiSecret" : "pVeadQirKVvBqZUmOfde4BF7rdZJoNKdo3lg",
                    "jwtToken" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Im9CVHczLVA3UzE2ZGl0WG5sUU9pVXciLCJleHAiOjE2MzgxODQ5ODAsImlhdCI6MTYwNjY0MzY1M30.goPbSWUfOil85YQANOEydo9NJvYtZcOstcKq55MVoTs"
                },
            };
            let role=1;  //to host
            let options = {
                method: 'GET',
                url: 'https://api.zoom.us/v2/meetings/'+meetingNumber,
                headers: {authorization: 'Bearer '+zoomSettings.more.jwtToken}
            };
            console.log("Start");
            request(options, function (error, response, body) {
                if (error) return reject(error);

                var signature = zoomUtil.generateSignatureString(meetingNumber, role, zoomSettings.more.apiKey, zoomSettings.more.apiSecret);
                return resolve({mtg:JSON.parse(body), signature:signature, apiKey:zoomSettings.more.apiKey})
            });
        })
    },
    joinEvent:function(meetingNumber){
        return new Promise(async function(resolve, reject){
            var zoomSettings = {
                "key" : "ZOOM",
                "value" : "",
                "more" : {
                    "apiKey" : "oBTw3-P7S16ditXnlQOiUw",
                    "apiSecret" : "pVeadQirKVvBqZUmOfde4BF7rdZJoNKdo3lg",
                    "jwtToken" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Im9CVHczLVA3UzE2ZGl0WG5sUU9pVXciLCJleHAiOjE2MzgxODQ5ODAsImlhdCI6MTYwNjY0MzY1M30.goPbSWUfOil85YQANOEydo9NJvYtZcOstcKq55MVoTs"
                },
            };
            let role=0;  //to join
            let options = {
                method: 'GET',
                url: 'https://api.zoom.us/v2/meetings/'+meetingNumber,
                headers: {authorization: 'Bearer '+zoomSettings.more.jwtToken}
            };
            request(options, function (error, response, body) {
                if (error) return reject(error);

                var signature = zoomUtil.generateSignatureString(meetingNumber, role, zoomSettings.more.apiKey, zoomSettings.more.apiSecret);
                return resolve({mtg:JSON.parse(body), signature:signature, apiKey:zoomSettings.more.apiKey})
            });
        })
    }
}
