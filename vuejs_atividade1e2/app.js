var vue = new Vue({
  el: "#app",
  data: {
    posts: [],
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
      httpRequest.open("GET", "http://localhost:3000/posts", true);
      httpRequest.send(null);
    },
    likePost(id) {
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = () => {
        if (httpRequest.status == 200 && httpRequest.readyState == 4) {
          this.loadPosts();
        }
      };
      httpRequest.open("PUT", "http://localhost:3000/likes", true);
      httpRequest.send({ id });
    },
  },
});
vue.loadPosts();
vue.likePost("df805cb4");
