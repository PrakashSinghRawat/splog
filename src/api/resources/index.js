var express = require("express");
var router = express.Router();
const ZoomController = require("./Zoom");
const ZoomService = require("../services/ZoomService")
router.get("/meetings", async (req, res)=>{
    console.log("jere");
    try {
        var meeting =await ZoomController.getMeetings(req,res)
    } catch (error) {
        return res.status(500).send(error);
    }
    return res.json(meeting)
});

router.post("/meeting/create", async(req, res)=>{
    let mtgData={
        topic:  req.body.topic || "Testing",
        "start_time": req.body.start_time || "2020-11-29T15:50:00",
        "duration": req.body.duration || 30,
        "agenda": req.body.agenda,
    }
    try {
        var mtg=await ZoomService.createEvent(mtgData);
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
    if(!mtg){
       return res.send("Zoom meeting not created!");
    }
    return res.json(mtg)
})

router.get("/meeting/:meetingId/start", async function(req, res){
    let meetingNumber=req.params.meetingId;
    let personName = "Demo User";
    if(req.query.personName && req.query.personName!="" ){
        personName = req.query.personName
    }
    try {
        var mtgData=await ZoomService.startEvent(meetingNumber, "x", '1p4zV3V5SuGBk6NMACcuOQ')
    } catch (error) {
        return res.status(500).send(error)
    }
    mtgData.personName= personName;
    return res.render("../src/views/zoom-mtg", mtgData);

}),
router.get("/meeting/:meetingId/join",async function(req, res){ 
    console.log("working",req.params.meetingId);
    let meetingNumber=req.params.meetingId;
    let personName = "Demo User";
    if(req.query.personName && req.query.personName!="" ){
        personName = req.query.personName
    }
    try {
        var mtgData=await ZoomService.joinEvent(meetingNumber);
    } catch (error) {
        return res.status(500).send(error)
    }//kr lo
    mtgData.personName= personName;
    return res.render("../src/views/zoom-mtg", mtgData);
}),
router.get("/meeting/:meetingId/end", function(req, res){
    return res.render("../src/views/zoom-end", {})
})

module.exports =router;