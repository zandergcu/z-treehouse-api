$( document ).ready(function() {

  var app = new Vue({
    el: "#app",
    data: {
      isVueWorking: true,
      submitted: false,
      error: false,
      thName: "",
      thProfileName: "",
      thURL: "",
      thAvatar: "",
      thBadgeCount: "",
      thTotalPoints: "",
      thHighSkills: []
    },
    methods: {
      doSomething: function(){
        const url = "https://teamtreehouse.com/" + app.thProfileName + ".json";
        axios.get(url)
          .then(function (res) {
            console.log(res.data);
            app.thName = res.data.name;
            app.thURL = res.data.profile_url;
            app.thAvatar = res.data.gravatar_url;
            app.thBadgeCount = res.data.badges.length;
            app.thTotalPoints = res.data.points.total;
            //------ Highest Skills Code --------------------------------------------------------
            for( skill in res.data.points ){ // Get all skills with 500+ points and add to array
              if (res.data.points[skill] > 499) {
                app.thHighSkills.push([skill, res.data.points[skill]]);
              }
            }
            app.thHighSkills.shift(); // Remove total from array
            app.thHighSkills.sort(function(a, b){ // Sort array by order of highest first
              return b[1]-a[1] // Array value [1] targets the points value for sorting
            });
            //------------------------------------------------------------------------------------
            app.submitted = true;
        })
        .catch(function (error) {
          app.error = true;
        })
      },
      errorFalse: function(){
        app.error = false;
      }
    }
  });
});
