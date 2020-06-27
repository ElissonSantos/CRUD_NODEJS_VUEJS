var vue = new Vue({
  el: "#app",
  data: {
    posts: [],
    urlPost: "http://localhost:3000/posts",
    urlLikes: "http://localhost:3000/likes",
  },
  methods: {
    loadPosts() {
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = () => {
        if (httpRequest.status == 200 && httpRequest.readyState == 4) {
          var objeto = JSON.parse(httpRequest.responseText);
          this.posts = objeto;
        }
      };
      httpRequest.open("GET", this.urlPost, true);
      httpRequest.send(null);
    },
    likePost(id) {
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = () => {
        if (httpRequest.status == 200 && httpRequest.readyState == 4) {
          this.loadPosts();
        }
      };
      httpRequest.open("PUT", this.urlLikes, true);

      httpRequest.responseType = "json";

      httpRequest.setRequestHeader("Content-Type", "application/json");

      httpRequest.send(JSON.stringify({ id: id }));
    },
  },
});
vue.loadPosts();
