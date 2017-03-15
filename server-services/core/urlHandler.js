/* url handler here */
function intro(req,res){
    console.log("[INFO] Get Intro page");
    res.end("[INFO] Get Intro page");
}

function founders(req,res){
    console.log("[INFO] Get Founders page");
    res.end("[INFO] Get Founders page");
}

function partnership(req,res){
    console.log("[INFO] Get partnership page");
    res.end("[INFO] Get partnership page");
}


module.exports = {
    intro: intro,
    founders: founders,
    partnership: partnership
}
