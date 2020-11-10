var express = require("express");
const { Mongoose, Schema } = require("mongoose");
app = express();
bodyParser = require("body-parser");
mongoose = require("mongoose");
Campground = require("./models/campground");
seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v3", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Campground.create(
//     {name: 'TESTING',
//      image: 'https://cdn.hiconsumption.com/wp-content/uploads/2014/08/Al-Haram-Mosque-Mecca.jpg',
//      description : 'The largest and oldest mosque in the world, as well as the holiest site in Islam. Muslims pray facing Mecca, but specifically they are facing this mosque, in particular the Kaaba, a cubed building at the center of the site and the most sacred spot in Islam. In low light it could be mistaken for the Tardis. During the Hajj – the annual pilgrimage to Mecca and one of the largest gatherings in the world – up to two million worshipers can be accommodated here.'
//     },(err, campground) => {
//          if(err){
//              console.log("OH NO!");
//              console.log(err);
//          }else{
//              console.log("We did it!");
//              console.log(campground);

//          }
//      })

app.get("/", (req, res) => {
  res.render("landing");
});
// INDEX- SHOW ALL CAMPGROUNDS
app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, allcampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", { varCamp: allcampgrounds });
    }
  });
});
// CREATE- Add new to database
app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
  var image = req.body.url;
  var desc = req.body.description;
  var newCamp = { name: name, image: image, description: desc };
  //    create a new campground and save to database
  Campground.create(newCamp, (err, newlycreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});
// NEW - Show form to add new
app.get("/campgrounds/new", (req, res) => {
  res.render("new");
});
// SHOW - to Show info about a particular Item(camp)
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function (err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        res.render("show", { campground: foundCampground });
      }
    });
});

app.listen("5000", () => {
  console.log("Yelp server has started!");
});
