<template>
  <Navbar :username="username" />

  <div class="container-md">
    <div class="row">
      <div class="col-md-2 col-sm-11 mt-md-2 mt-sm-4 ml-sm-3 card">
        <div class="card-header">
          <h6>spaces to follow</h6>
        </div>
        <div v-if="interests.length > 0">
          <div
            v-for="(interest, index) in interests"
            :key="interest"
            class="row  justify-content-between"
          >
            <div class="col-4">
              <label :for="interest">{{ interest }}</label>
            </div>
            <div class="col-4 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                value=""
                id="flexCheckDefault"
                @click="add(interest, index)"
              />
            </div>
          </div>
        </div>
        <div v-else>
          no more space to follow
        </div>
        <div class="card mt-5 p-1">
          followers
          {{
            $store.state.followers.length > 0
              ? $store.state.followers.length
              : ""
          }}
          <div class="follower">

          <div
            v-for="(follower, ind) in $store.state.followers"
            :key="follower"
            class="mt-2"
          >
            <div>
              <i class="fa fa-user-circle"></i>@{{ follower }}
              <small @click="remove(ind)" class="btn btn-sm btn-outline-danger"
                >Unfollow</small
              >
            </div>
          </div>
          </div>
        </div>
      </div>

      <div class="col-md-7 col-sm-11">
        <Post :currentUser="currentUser" :interests="option" />
      </div>

      <div class="col-md-3 col-sm-11 mt-md-2 mt-sm-5 mb-sm-5 pb-sm-5 card">
        <div class="card-header">
          <h6>spaces you are currently following</h6>
        </div>
        <div v-if="mySpace.length > 0">
          <div
            v-for="(space, index) in mySpace"
            :key="space"
            class="row  justify-content-between mt-2"
          >
            <div class="col-5">
              <button class="btn btn-sm btn-light">{{ space }}</button>
            </div>
            <div class="col-5">
              <button
                class="btn btn-sm btn-outline-danger"
                @click="unfollow(space, index)"
              >
                <small>Unfollow</small>
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          you have not follow any space yet.
        </div>

        <div class="card mt-5 p-1 ">
          <div>
            <span>My Bookmark</span
            ><span class="w-100 bg-secondary text-info rounded px-2 mx-2">
              {{
                $store.state.bookmark.length > 0
                  ? $store.state.bookmark.length
                  : ""
              }}</span
            >
          </div>
          <div class="bookmark">
          <div
            v-for="(book, id) in $store.state.bookmark"
            :key="book"
            class="mt-2 bookmark"
          >
            <small>
              <i class="fa fa-user-circle"></i> posted by ___{{ book.by }} @{{
                book.time
              }}
              <span class="px-3">{{
                book.content.length > 22
                  ? book.content.slice(0, 15) + "......"
                  : book.content
              }}</span>
              <div>
                <a
                  class="px-3"
                  href=""
                  data-bs-toggle="modal"
                  data-bs-target="#example"
                  @click.prevent="view(id)"
                  >view</a
                >
                <a class="px-1" href="" @click.prevent="deleted(id)">delete</a>
              </div>
            </small>
          </div>

          </div>
          <!-- Modal -->
          <div class="modal fade" id="example">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">
                    <i class="fa fa-user-circle"></i> posted by ___{{
                      bookmarkBy
                    }}
                    @{{ bookmarkTime }}
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">{{ bookmarkContent }}</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Post from "../components/Post.vue";
export default {
  name: "Quora",
  components: { Navbar, Post },

  data() {
    return {
      username: "",
      route: this.$route.params.id,
      interests: [],
      mySpace: [],
      currentUser: {},
      bookmarkContent: "",
      bookmarkBy: "",
      bookmarkTime: "",
      option: [],
    };
  },
  
  mounted: function() {
    this.$store.dispatch({type:'closeNav'})
    let store = JSON.parse(localStorage.getItem("quora"));
    let user = store.find(
      (res) => Number(res.id) === Number(this.$route.params.id)
    );
    this.currentUser = user;
    this.username = user.username;
    this.interests = [...user.space];
    this.option = [...user.space, ...user.interest];
    this.mySpace = user.interest;

    this.$store.dispatch({ type: "setFollower", payload: user.following });
    this.$store.dispatch({ type: "setBookmark", payload: user.bookmark });
    this.$store.dispatch({ type: "closeNav" });
  },

  methods: {
    add(ints, id) {
      let interest = this.interests.find((int) => int === ints);
      let store = JSON.parse(localStorage.getItem("quora"));
      let user = store.find((res) => res.username === this.username);
      user.interest.push(interest);
      this.mySpace.push(interest);
  
      user.space.splice(id, 1);
      let index = store.indexOf(user);
      store[index] = user;
      localStorage.setItem("quora", JSON.stringify(store));

      setTimeout(() => {
        let expire = this.interests.filter((int) => int !== ints);
        this.interests = expire;
      }, 500);
    },

    unfollow(space, id) {
      let interest = this.mySpace.find((int) => int === space);
      let store = JSON.parse(localStorage.getItem("quora"));
      let user = store.find((res) => res.username === this.username);
      user.interest.splice(id, 1);
      this.currentUser.interest.splice(id, 1);
      user.space.push(interest);
      this.interests.push(interest);
      let index = store.indexOf(user);
      store[index] = user;
      localStorage.setItem("quora", JSON.stringify(store));

      setTimeout(() => {
        let expire = this.mySpace.filter((int) => int !== space);
        this.mySpace = expire;
      }, 500);
    },

    view(id) {
      let findPost = this.$store.state.bookmark.find((val, ind) => ind === id);

      this.bookmarkContent = findPost.content;
      this.bookmarkBy = findPost.by;
      this.bookmarkTime = findPost.time;
    },
    deleted(id) {
      let store = JSON.parse(localStorage.getItem("quora"));
      let user = store.find(
        (res) => res.username === this.currentUser.username
      );

      user.bookmark.splice(id, 1);

      let index = store.indexOf(user);
      store[index] = user;
      localStorage.setItem("quora", JSON.stringify(store));

      this.$store.dispatch({ type: "decreaseBook", payload: id });
      console.log(id);
    },

    remove(id) {
      let store = JSON.parse(localStorage.getItem("quora"));
      let user = store.find(
        (res) => res.username === this.currentUser.username
      );

      user.following.splice(id, 1);

      let index = store.indexOf(user);
      store[index] = user;
      localStorage.setItem("quora", JSON.stringify(store));
      this.$store.dispatch({ type: "unFollow", payload: id });
    },
  },
};
</script>
<style scoped>
.bookmark{
  max-height: 30vh;
  overflow-y: auto;
}
.follower{
  max-height: 30vh;
  overflow-y: auto;
}
.bookmark a{
  text-decoration: none;
}
</style>