$( document ).ready(function() {

  var app = new Vue({
    el: "#app",
    data: {
      isVueWorking: "VueJS is working!",
      submitted: false,
      thName: "",
      thURL: "",
      thAvatar: "",
      thBadgeCount: "",
      thTotalPoints: "",
      thHighSkills: [] // Skills with Points > 500
    },
    methods: {
      doSomething: function(){
        const url = "https://teamtreehouse.com/alexandermackenzie.json";
        axios.get(url)
          .then(function (res) {
            console.log(res.data);
            app.thName = res.data.name;
            app.thURL = res.data.profile_url;
            app.thAvatar = res.data.gravatar_url;
            app.thBadgeCount = res.data.badges.length;
            app.thTotalPoints = res.data.points.total;
            //------ Highest Skills Code --------------------------------------------------------
            for( topic in res.data.points ){ // Get all topics with 500+ points and add to array
              if (res.data.points[topic] > 499) {
                app.thHighSkills.push([topic, res.data.points[topic]]);
                console.log("Property Name: " + topic);
              }
            }
            app.thHighSkills.shift(); // Remove total from array
            app.thHighSkills.sort(function(a, b){ // Sort array by order of highest first
              return b[1]-a[1] // Array value [1] targets the points value for sorting
            });
            //------------------------------------------------------------------------------------
            app.submitted = true;
        })
      }
    }
  });
});
