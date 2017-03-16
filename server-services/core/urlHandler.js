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

function finance(req,res){
    console.log('[INFO] Get finance page');
    // FIXME , replace country 1 and country 2 with certain user-specific country
    // Debug: using static pair
    var country_pair = {
        pair: [
            {
                "c1": "taiwan",
                "c2": "hongkong"
            },
            {
                "c1": "america",
                "c2": "india"
            }
        ]
    }

    res.render('finance',{
        title: "Title",
        col1: "匯率國家1",
        col2: "匯率國家2",
        col3: "匯率比例",
        col4: "對匯時間",
        content: country_pair
    });
}


module.exports = {
    intro: intro,
    founders: founders,
    partnership: partnership,
    finance: finance
}
