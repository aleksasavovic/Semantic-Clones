"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./model/User"));
const code_1 = __importDefault(require("./model/code"));
const id_1 = __importDefault(require("./model/id"));
const randomList_1 = __importDefault(require("./model/randomList"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect("mongodb://localhost:27017/diplomski");
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('Uspesna konekcija');
});
const router = express_1.default.Router();
var ObjectId = require('mongoose').Types.ObjectId;
router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    User_1.default.findOne({ "username": username, "password": password }, (err, u) => {
        if (err)
            console.log(err);
        else
            res.json(u);
    });
});
router.route('/register').post((req, res) => {
    var u = new User_1.default(req.body);
    var pendingReviews = new Array();
    User_1.default.findOne({ "username": req.body.username }, (err, userExists) => {
        if (err)
            res.json({ "msg": "unable to create account, please try again" });
        else if (userExists)
            res.json({ "msg": 'username already exists' });
        else {
            User_1.default.findOne({ "email": req.body.email }, (err, emailExists) => {
                if (err)
                    res.json({ "msg": "unable to create account, please try again" });
                else if (emailExists)
                    res.json({ "msg": 'e-mail already exists' });
                else {
                    u.save().then(u => {
                        u.save().then(u => {
                            res.json({ "msg": "" });
                        }).catch(saveErr => {
                            res.json({ "msg": "unable to create account, please try again" });
                        });
                    });
                }
            });
        }
    });
});
// router.route('/addCode').post((req,res)=>{
//     var javaCode = new code();
//     var methods:Array<string> = req.body.methods;
//     var wholeCode=req.body.wholeCode;
//     var compareMethods= new Array<Object>();
//     var rl= new Array<Object>();
//     id.findOne({},(err,nid)=>{
//         var nextId=nid.get("nextId");
//         var codeId=nid.get("nextIdCode");
//         for(var i=0;i<methods.length-1;i++){
//             for(var j=i+1;j<methods.length;j++){
//                 var review = new Array<Object>();
//                 var priority;
//                 if(methods[i].length>methods[j].length)
//                     priority = methods[j].length/methods[i].length;
//                 else
//                     priority=methods[i].length/methods[j].length;
//                 var randomListObjs={
//                     id:nextId,
//                     priority:priority,
//                 }
//                 var cm={
//                     id:nextId++,
//                     priority:priority,
//                     mth1:i,
//                     mth2:j,
//                     reviews:review,
//                 }
//                 compareMethods.push(cm);
//                 rl.push(randomListObjs);
//             }
//         }
//         randomList.updateOne({},{$push:{"randomList":rl}},err=>{
//             if(err)
//                 console.log(err);
//             else{
//                 randomList.findOne({},(err,rl)=>{
//                     if(err)
//                         console.log(err);
//                     else{
//                         var arr : Array<any>=rl.get("randomList");
//                         arr.sort((a,b)=>{
//                             if(a.priority>b.priority)
//                                 return -1;
//                             else return 1;
//                         });
//                         randomList.updateOne({},{$set:{randomList:arr}},err=>{
//                             if(err)
//                                 console.log(err);
//                         });
//                     }
//                 })
//             }
//         })
//         id.updateOne({},{$set:{"nextId":nextId, "nextIdCode":++codeId}},err=>{
//         });
//         javaCode.set("id",codeId);
//         javaCode.set("wholeCode",wholeCode);
//         javaCode.set("methods",methods);
//         javaCode.set("name",req.body.name);
//         javaCode.set("methodsCombinations",compareMethods);
//         javaCode.set("status",'active');
//         javaCode.save(err=>{
//            if(err){
//                res.json({"ret":"Unable to add code"});
//            }
//            else{
//                 res.json({"ret":"Code successfully added"});
//            }
//         }
//         )
//     })
// });
router.route('/addCode2').post((req, res) => {
    var javaCode = new code_1.default();
    var methods = req.body.methods;
    var wholeCode = req.body.wholeCode;
    var compareMethods = new Array();
    var randList = new Array();
    id_1.default.findOne({}, (err, nid) => {
        var nextId = nid.get("nextId");
        var codeId = nid.get("nextIdCode");
        for (var i = 0; i < methods.length - 1; i++) {
            for (var j = i + 1; j < methods.length; j++) {
                var review = new Array();
                var priority;
                if (methods[i].length > methods[j].length)
                    priority = methods[j].length / methods[i].length;
                else
                    priority = methods[i].length / methods[j].length;
                var cm = {
                    id: 0,
                    priority: priority,
                    mth1: i,
                    mth2: j,
                    reviews: review,
                };
                compareMethods.push(cm);
            }
        }
        compareMethods.sort((a, b) => {
            if (a.priority > b.priority)
                return -1;
            else
                return 1;
        });
        var userList = new Array();
        compareMethods.forEach((iterator) => {
            iterator.id = nextId;
            var randListObj = {
                compareMethodsId: nextId++,
                codeId: codeId,
                priority: iterator.priority
            };
            randList.push(randListObj);
        });
        randomList_1.default.findOne({}, (err, rl) => {
            var arr = rl.get("randomList");
            arr = arr.concat(randList);
            arr.sort((a, b) => {
                if (a.priority > b.priority)
                    return -1;
                else
                    return 1;
            });
            randomList_1.default.updateOne({}, { $set: { randomList: arr } }, err => {
                if (err)
                    console.log(err);
            });
        });
        javaCode.set("id", codeId);
        id_1.default.updateOne({}, { $set: { "nextId": nextId, "nextIdCode": ++codeId } }, err => {
        });
        javaCode.set("wholeCode", wholeCode);
        javaCode.set("methods", methods);
        javaCode.set("name", req.body.name);
        javaCode.set("methodsCombinations", compareMethods);
        javaCode.set("status", 'active');
        javaCode.save(err => {
            if (err) {
                res.json({ "ret": "Unable to add code" });
            }
            else {
                res.json({ "ret": "Code successfully added" });
            }
        });
    });
});
// router.route('/initPendingReviewList').post((req, res) => {
//     var username = req.body.username;
//     var time = 0;
//     code.find({}, (err, codeList) => {
//         codeList.forEach(javaCode => {
//             var exists: boolean = false;
//             var userList: Array<string> = javaCode.get('inUsersReviewList');
//             userList.forEach(u => {
//                 if (u == username)
//                     exists = true;
//             });
//             if (!exists) {
//                 var methodcombinations: Array<object> = javaCode.get('methodsCombinations');
//                 var currentCodeReviewList = new Array<Object>();
//                 methodcombinations.forEach((methodCombination: any) => {
//                     var obj = {
//                         codeId: javaCode.id,
//                         methodsId: methodCombination.id,
//                         time: 0
//                     }
//                     currentCodeReviewList.push(obj);
//                 })
//                 User.updateOne({ "username": username }, { $push: { "pendingReviews": currentCodeReviewList } }, err => {
//                     if (err)
//                         console.log(err);
//                     else {
//                         code.updateOne({ "_id": javaCode.id }, { $push: { "inUsersReviewList": username } }, err => {
//                         });
//                     }
//                 });
//             }
//         })
//     });
//     res.json({ "msg": 'ok' });
// });
router.route('/addToReviewList').post((req, res) => {
    randomList_1.default.updateOne({}, { $push: { "randomList": req.body.methodCombos } }, err => {
        if (err)
            console.log(err);
        else
            res.json({ "msg": 'ok' });
    });
});
router.route('/getMethods').post((req, res) => {
    var m1 = req.body.m1;
    var m2 = req.body.m2;
    var id = ObjectId(req.body.id);
    var m1Str = "";
    var m2Str = '';
    code_1.default.findOne({ "_id": id }, (err, c) => {
        if (err)
            console.log(err);
        else {
            var retObj = {
                m1: c.methods[m1],
                m2: c.methods[m2]
            };
            res.json(retObj);
        }
    });
});
router.route('/getRandomMethods').post((req, res) => {
    var username = req.body.username;
    var finishedReviews = req.body.fr;
    var exists = true;
    var randomListIndex = -1;
    randomList_1.default.findOne({}, (err, randList) => {
        var arr = randList.get("randomList");
        for (var i = 0; i < arr.length && exists; i++) {
            exists = false;
            for (var j = 0; i < finishedReviews.length; j++) {
                if (arr[i].codeId == finishedReviews[j].codeId && arr[i].compareMethodsId == finishedReviews[j].compareMethodsId) {
                    exists = true;
                    break;
                }
            }
            if (!exists)
                randomListIndex = i;
        }
        code_1.default.findOne({ "id": arr[randomListIndex].codeId }, (err, codeObj) => {
            var index = arr[randomListIndex].compareMethodsId - codeObj.get("methodsCombinations")[0].id;
            var m1 = codeObj.get("methods")[codeObj.get("methodsCombinations")[index].mth1];
            var m2 = codeObj.get("methods")[codeObj.get("methodsCombinations")[index].mth2];
            var retObj = {
                m1: m1,
                m2: m2
            };
            res.json(retObj);
        });
    });
});
router.route("/getRandomList").get((req, res) => {
    randomList_1.default.findOne({}, (err, rl) => {
        if (err)
            console.log(err);
        else {
            res.json(rl.get("randomList"));
        }
    });
});
router.route("/getMethodCombinationsForCode").post((req, res) => {
    var id = req.body.id;
    code_1.default.findOne({ "id": id }, (err, codeObj) => {
        if (err)
            console.log(err);
        else {
            res.json(codeObj.get("methodsCombinations"));
        }
    });
});
router.route("/getMethodsText").post((req, res) => {
    var everythingReviewed = req.body.everythingReviewed;
    if (everythingReviewed) {
        res.json(null);
    }
    else {
        var codeId = req.body.codeId;
        var compareMethodsId = req.body.compareMethodsId;
        var userStartedReviewsList = req.body.userStartedReviewsList;
        var reviewListIndex = req.body.reviewListIndex;
        var time = 0;
        for (var i = 0; i < userStartedReviewsList.length; i++)
            if (userStartedReviewsList[i].codeId == codeId && userStartedReviewsList[i].compareMethodsId == compareMethodsId)
                time = userStartedReviewsList[i].time;
        code_1.default.findOne({ "id": codeId }, (err, codeObj) => {
            if (err)
                console.log(err);
            else {
                var index = compareMethodsId - codeObj.get("methodsCombinations")[0].id;
                var m1 = codeObj.get("methods")[codeObj.get("methodsCombinations")[index].mth1];
                var m2 = codeObj.get("methods")[codeObj.get("methodsCombinations")[index].mth2];
                var retObj = {
                    m1: m1,
                    m2: m2,
                    time: time,
                    codeId: codeId,
                    compareMethodsId: compareMethodsId,
                    reviewListIndex: reviewListIndex
                };
                res.json(retObj);
            }
        });
    }
});
router.route("/getMethodsTextForStarted").post((req, res) => {
    console.log(req.body);
    var codeId = req.body.codeId;
    var compareMethodsId = req.body.compareMethodsId;
    code_1.default.findOne({ "id": codeId }, (err, codeObj) => {
        if (err)
            console.log(err);
        else {
            var index = compareMethodsId - codeObj.get("methodsCombinations")[0].id;
            console.log(index);
            var m1 = codeObj.get("methods")[codeObj.get("methodsCombinations")[index].mth1];
            var m2 = codeObj.get("methods")[codeObj.get("methodsCombinations")[index].mth2];
            var retObj = {
                m1: m1,
                m2: m2,
            };
            res.json(retObj);
        }
    });
});
router.route("/getActiveCodes").get((req, res) => {
    code_1.default.find({ "status": "active" }, (err, codes) => {
        if (err)
            console.log(err);
        else {
            res.json(codes);
        }
    });
});
router.route("/addToStartedList").post((req, res) => {
    var username = req.body.username;
    var codeId = req.body.codeId;
    var time = req.body.time;
    var compareMethodsId = req.body.compareMethodsId;
    var data = {
        codeId: codeId,
        time: time,
        compareMethodsId: compareMethodsId
    };
    User_1.default.updateOne({ "username": username }, { $push: { "startedReviews": data } }, err => {
        if (err)
            console.log(err);
        else {
            User_1.default.findOne({ "username": username }, (err, u) => {
                if (err)
                    console.log(err);
                else {
                    res.json(u);
                }
            });
        }
    });
});
router.route("/updateStartedList").post((req, res) => {
    var username = req.body.username;
    var codeId = req.body.codeId;
    var time = req.body.time;
    var compareMethodsId = req.body.compareMethodsId;
    User_1.default.findOne({ "username": username }, (err, u) => {
        if (err)
            console.log(err);
        else {
            var arr = u.get("startedReviews");
            arr.forEach((startedReview) => {
                if (startedReview.codeId == codeId && compareMethodsId == startedReview.compareMethodsId)
                    startedReview.time = time;
            });
            u.set("startedReviews", arr);
            User_1.default.updateOne({ "username": username }, { $set: { "startedReviews": arr } }, err => {
                if (err)
                    console.log(err);
                else {
                    res.json(u);
                }
            });
        }
    });
});
router.route("/submitReview").post((req, res) => {
    var username = req.body.username;
    var codeId = req.body.codeId;
    var rating = req.body.rating;
    var compareMethodsId = req.body.compareMethodsId;
    var time = req.body.time;
    var finished = {
        codeId: codeId,
        rating: rating,
        compareMethodsId: compareMethodsId,
        time: time
    };
    User_1.default.findOne({ "username": username }, (err, u) => {
        if (err)
            console.log(err);
        else {
            var arr = u.get("startedReviews");
            arr.forEach((startedReview, index) => {
                if (startedReview.codeId == codeId && compareMethodsId == startedReview.compareMethodsId)
                    arr.splice(index, 1);
            });
            u.set("startedReviews", arr);
            u.get("finishedReviews").push(finished);
            var arr2 = u.get("activeCodesProgress");
            var foundCode = false;
            arr2.forEach((activeCodeProgress) => {
                if (activeCodeProgress.codeId == codeId) {
                    activeCodeProgress.progress++;
                    foundCode = true;
                }
            });
            if (!foundCode) {
                var activeCodeProgressObj = {
                    codeId: codeId,
                    progress: 1
                };
                arr2.push(activeCodeProgressObj);
            }
            u.set("activeCodesProgress", arr2);
            console.log(u.get("activeCodesProgress"));
            User_1.default.updateOne({ "username": username }, { $set: { "startedReviews": arr, "finishedReviews": u.get("finishedReviews"), "activeCodesProgress": u.get("activeCodesProgress") } }, err => {
                if (err)
                    console.log(err);
                else {
                    code_1.default.findOne({ "id": codeId }, (err, c) => {
                        if (err)
                            console.log(err);
                        else {
                            var data = {
                                username: username,
                                time: time,
                                rating: rating
                            };
                            var index = compareMethodsId - c.methodsCombinations[0].id;
                            c.methodsCombinations[index].reviews.push(data);
                            code_1.default.updateOne({ "id": codeId }, { $set: { "methodsCombinations": c.get("methodsCombinations") } }, err => {
                                if (err)
                                    console.log(err);
                                else {
                                    res.json(u);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});
router.route("/getStartedReviews").post((req, res) => {
    var username = req.body.username;
    User_1.default.findOne({ "username": username }, (err, u) => {
        if (err)
            console.log(err);
        else {
            res.json(u.get("startedReviews"));
        }
    });
});
router.route("/getMethodsById").post((req, res) => {
    var codeId = req.body.codeId;
    var compareMethodsId = req.body.compareMethodsId;
    code_1.default.findOne({ "id": codeId }, (err, c) => {
        if (err)
            console.log(err);
        else {
        }
    });
});
router.route("/getCodeById").post((req, res) => {
    var codeId = req.body.id;
    code_1.default.findOne({ "id": codeId }, (err, c) => {
        if (err)
            console.log(err);
        else {
            res.json(c);
        }
    });
});
router.route("/getProgressList").post((req, res) => {
    var username = req.body.username;
    User_1.default.findOne({ "username": username }, (err, u) => {
        if (err)
            console.log(err);
        else {
            res.json(u.get("activeCodesProgress"));
        }
    });
});
router.route("/getUserByUsername").post((req, res) => {
    var username = req.body.username;
    User_1.default.findOne({ "username": username }, (err, u) => {
        if (err)
            console.log(err);
        else {
            res.json(u);
        }
    });
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map