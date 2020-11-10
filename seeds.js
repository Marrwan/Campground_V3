var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")
var data = [
  {
    name: "Cloud's Rest",
    image:
      "https://cdn.hiconsumption.com/wp-content/uploads/2014/08/Al-Aqsa-Mosque-Jerusalem.jpg",
    description: "Blah blah blah",
  },
  {
    name: "Moon's Rest",
    image:
      "https://cdn.hiconsumption.com/wp-content/uploads/2014/08/Al-Aqsa-Mosque-Jerusalem.jpg",
    description: "Blah blah blah",
  },
  {
    name: "Sun's Rest",
    image:
      "https://cdn.hiconsumption.com/wp-content/uploads/2014/08/Al-Aqsa-Mosque-Jerusalem.jpg",
    description: "Blah blah blah",
  },
];
function seedDB() {
  // Remove Campgrounds
  Campground.remove({}, (err) => {
    console.log("Removed");
    // Add a few campgrounds
    data.forEach((seed) => {
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Added New Campground");
        //   create a comment
        Comment.create({
            text: "This is great",
            author : "Abdulbasit"
        },(err,comment)=>{
            if(err){
                console.log(err);
            }else{
            campground.comments.push(comment)
            campground.save();
            console.log("Created new comment");
        }}
        )
        }
      });
    });
  });
}

module.exports = seedDB;
