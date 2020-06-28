var vue = new Vue({
  el: "#app",
  data: {
    posts: [],
    post: {},
    editPost: false,
    urlPost: "http://localhost:3000/posts",
    urlLikes: "http://localhost:3000/likes",
    httpRequest: new XMLHttpRequest(),
  },
  methods: {
    editar(id) {
      if (id) {
        this.posts.forEach((post) => {
          if (post.id === id) {
            this.post = post;
          }
        });
      } else {
        this.post = {};
      }
      this.editPost = true;
    },
    savePost() {
      this.httpRequest.onreadystatechange = () => {
        if (
          this.httpRequest.status == 200 &&
          this.httpRequest.readyState == 4
        ) {
          this.editPost = false;
          this.post = {};
          this.loadPosts();
        }
      };

      if (this.post.id) {
        let url = this.urlPost + "/" + this.post.id;
        console.log(this.post.id);
        this.httpRequest.open("PUT", url, true);
      } else {
        console.log("this.post sem id");
        this.httpRequest.open("POST", this.urlPost, true);
      }

      this.httpRequest.responseType = "json";

      this.httpRequest.setRequestHeader("Content-Type", "application/json");
      console.log(this.post);
      this.httpRequest.send(JSON.stringify({ post: this.post }));
    },
    deletePosts(id) {
      this.httpRequest.onreadystatechange = () => {
        console.log(this.httpRequest);
        if (
          this.httpRequest.status == 200 &&
          this.httpRequest.readyState == 4
        ) {
          this.loadPosts();
        }
      };
      let url = this.urlPost + "/" + id;
      this.httpRequest.open("DELETE", url, true);
      this.httpRequest.send();
    },
    loadPosts() {
      this.post = [];
      this.httpRequest.onreadystatechange = () => {
        if (
          this.httpRequest.status == 200 &&
          this.httpRequest.readyState == 4
        ) {
          try {
            let objeto = JSON.parse(this.httpRequest.response);
            this.posts = objeto;
          } catch (e) {
            this.posts = this.httpRequest.response;
          }
        }
      };
      this.httpRequest.open("GET", this.urlPost, true);
      this.httpRequest.send();
    },
    likePost(id) {
      this.httpRequest.onreadystatechange = () => {
        if (
          this.httpRequest.status == 200 &&
          this.httpRequest.readyState == 4
        ) {
          this.loadPosts();
        }
      };
      this.httpRequest.open("PUT", this.urlLikes, true);

      this.httpRequest.responseType = "json";

      this.httpRequest.setRequestHeader("Content-Type", "application/json");

      this.httpRequest.send(JSON.stringify({ id: id }));
    },
  },
});
vue.loadPosts();
