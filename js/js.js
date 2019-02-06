
$( document ).ready(function() {

    var app = new Vue({
        el: "#app",
        data: {
          isVueWorking: "VueJS is working!"
        }
    });
    var apod = new Vue({
        el: "#apod",
        data: {
          isVueWorking: "VueJS is working!",
          submitted: false,
          apodtitle: '',
          apodurl: '',
          apodexplanation: '',
          apoddate: ''
        },
        methods: {
          getApod: function(){
            this.submitted = true;
            const url = "https://api.nasa.gov/planetary/apod?api_key=btcxP6qUvWv8xRzhAeeIIRJyYNaITnvdTXUwvJcz";
            axios.get(url)
              .then(function (res) {
                console.log(res);
                apod.apodtitle = res.data.title;
                apod.apodurl = res.data.url;
                apod.apodexplanation = res.data.explanation;
                apod.apoddate = res.data.date;
              })
          }
        }
    })
    var asteroids = new Vue({
        el: "#asteroids",
        data: {
          isVueWorking: "VueJS is working!",
          asteroids: []
        },
        created: function() {
          this.fetchAsteroids();
        },
        methods: {
          fetchAsteroids: function(){
            const url = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=btcxP6qUvWv8xRzhAeeIIRJyYNaITnvdTXUwvJcz";
            axios.get(url)
              .then(function (res) {
                asteroids.asteroids = res.data.near_earth_objects.slice(0, 10);
              })
          },
          getCloseApproachDate: function (a) {
            console.log(a.close_approach_data);
            if (a.close_approach_data.length > 0){
              return a.close_approach_data[0].close_approach_date;
            }
            return "N/A";
          }
        }
    })
});
