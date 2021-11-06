<template>
  <div class="card mt-md-2 mt-sm-4 shadow">
    <div class="row">
      <div class="mb-3">
        <textarea
          class="form-control"
          v-model.trim="postText"
          placeholder="post your question or link?"
        ></textarea>

        <select v-model="selected" class="form-select mb-2 mt-2">
          <option
            v-for="interest in interests"
            :key="interest"
            :value="interest"
            >{{ interest }}</option
          >
        </select>
        <div class="row gx-2  justify-content-between">
          <div class="col-1">
            <input
              type="submit"
              class="btn btn-sm btn-outline-info mx-2"
              :value="useDraft"
              @click.prevent="toggleDraft"
            />
          </div>
          <div class="col-1">
            <input
              type="submit"
              class="btn btn-sm btn-outline-success btn-block"
              value="post"
              @click.prevent="post"
            />
          </div>
          <div class="col-5">
            <input
              type="submit"
              class="btn btn-sm btn-outline-primary"
              value="save as draft"
              @click.prevent="saveDraft"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="draftContainer">
      <div v-if="myDraft.length > 0">
        <div class="draftContainer">
          <div class="draftInner m-2">
            <div
              v-for="(draft, id) in myDraft"
              :key="id"
              class="shadow border mt-3 mb-2 p-2 rounded"
            >
              <small
                >#{{ draft.draftType }} by ___{{ draft.by }} @{{
                  draft.time
                }}</small
              >
              <button
                class="btn btn-sm btn-outline-warning"
                @click="editDraft(id)"
              >
                <small>Edit</small>
              </button>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="deleteDraft(id)"
              >
                <small>Delete</small>
              </button>
              <button
                class="btn btn-sm btn-outline-success"
                @click="postDraft(id)"
              >
                <small>Post</small></button
              ><br />
              {{ draft.draftContent }} <br />
              <br /><br />
            </div>
          </div>
        </div>
      </div>
      <div v-else>you do not have draft content yet</div>
    </div>
  </div>
  <br />

  <div class="shadow">
    <div v-if="myFeed.length > 0" class="text-danger">Latest Post</div>
    <p v-else>Your post will appear here</p>
    <div
      class="mt-3 rounded bg-light shadow"
      v-for="(feed, index) in myFeed"
      :key="index"
    >
      <div class="bg-secondary text-white mr-4 rounded p-2 post w-100">
        <i class="fa fa-user-circle"></i>
        <small>#{{ feed.postType }} by ___{{ feed.by }} @{{ feed.time }}</small>
        <button
          @click="follow(index)"
          ref="followBtn"
          class="btn btn-sm btn-outline-light shift "
          v-if="currentUser.username !== feed.by"
        >
          <small>follow</small>
        </button>
        <button
          @click="bookmark(index)"
          class="btn btn-sm btn-outline-light shift "
          v-if="currentUser.username !== feed.by"
          title="bookmark post"
        >
          <i class="fa fa-star"></i>
        </button>
      </div>
      <div class="p-3 w-100">
        <div class="flex pl-3 pb-3">
          {{ feed.postContent }}
        </div>
        <button
          class="btn btn-sm btn-outline-success mx-1"
          @click.prevent="postLike(index)"
        >
          {{ upvote }} <span>{{ feed.likes > 0 ? feed.likes : "" }}</span>
          <span v-show="!up[index]"></span><span v-show="!down[index]"></span
          ><span v-show="!front[index]"></span>
        </button>
        <button
          class="btn btn-sm btn-outline-success"
          @click.prevent="toggleComment(index)"
        >
          {{ (commentBox[index] = "comment") }}
          <span class="commentCount">{{
            feed.comment.length > 0 ? feed.comment.length : ""
          }}</span>
        </button>
      </div>
      <br />

      <div v-if="commentContainer[index]">
        <div v-if="feed.comment.length > 0">
          <div v-for="(comments, id) in feed.comment" :key="id">
            <small class="comment">
              <i class="fa fa-user-circle"></i> #comment by ___{{
                comments.by
              }}
              @{{ comments.time }}
              <a class="reply-btn" href="" @click.prevent="focus(index, id)"
                >reply</a
              >
            </small>

            <div class="px-3">
              <p>
                <small>
                  {{ comments.commentContent }}
                </small>
              </p>
            </div>

            <div v-show="true" class="px-3">
              <a
                href=""
                @click.prevent="
                  () => {
                    toggleReply[id] = !toggleReply[id];
                  }
                "
                class="reply-btn"
                >replies...{{
                  comments.reply && comments.reply.length
                    ? comments.reply.length
                    : ""
                }}</a
              >
            </div>
            <div v-show="toggleReply[id]">
              <div v-for="(reply, ind) in comments.reply" :key="ind">
                <small
                  ><i class="fa fa-user-circle"></i> reply by ___{{
                    reply.by
                  }}</small
                ><small>@{{ reply.time }}</small> <br />
                <small class="px-3">{{ reply.replyContent }}</small>
              </div>
            </div>
            <br />
          </div>
        </div>
        <div v-else>
          <small class="fad">No comment yet, be the first to comment!!</small>
        </div>

        <div class="row  justify-content-between">
          <div class="col">
            <input
              v-model.trim="comment[index]"
              class="form-control border-"
              ref="commentInput"
              placeholder="comment or reply here"
            />
          </div>
          <div class="col">
            <span v-if="isReplying">
              <button
                @click="replyFunc(index, id)"
                class="btn btn-outline-info"
              >
                reply
              </button>
              <!-- <button class="btn btn-sm btn-outline-success" @click="commentFunc(index)">comment</button> -->
            </span>
            <span v-if="isCommenting">
              <button
                class="btn btn-outline-success"
                @click="commentFunc(index)"
              >
                comment
              </button>
            </span>
          </div>
        </div>

        <br /><br />
      </div>
    </div>
    <br /><br />
  </div>
</template>

<script>
export default {
  name: "Post",
  props: ["currentUser", "interests"],

  data() {
    return {
      selected: "Science",
      postText: "",
      myFeed: [],
      myDraft: [],
      draftContainer: false,
      useDraft: "useDraft",
      comment: [],
      commentContainer: [],
      commentBox: ["comment"],
      likesToggle: false,
      upvote: "upvote",
      isCommenting: true,
      isReplying: false,
      replyId: "",
      toggleReply: [],
      up: [],
      down: [],
      front: [],
      book: "",
    };
  },




  mounted() {
    let store = JSON.parse(localStorage.getItem("quora"));
    let user = store.filter(
      (res) => Number(res.id) === Number(this.$route.params.id)
    );
    this.myDraft = user[0].draft;
    this.book = user[0].bookmark;
    let userPost = user[0].post;
    let username = user[0].username;

    user = user.map((info) => info.interest);
    user = user[0];

    let array = [];

    for (let j = 0; j < store.length; j++) {
      const elem = store[j].post;
      if (store[j].username === username) {
        continue;
      }
      for (let k = 0; k < elem.length; k++) {
        const elm = [elem[k]];
        for (let l = 0; l < user.length; l++) {
          const el = user[l];
          let a = elm.filter((val) => val.postType === el);
          if (a.length > 0) {
            array.push(...a);
          }
        }
      }
    }
    array.unshift(...userPost);
    this.myFeed = array;
  },





  methods: {



    post() {
      if (this.postText !== "" && this.selected !== "") {
        let store = JSON.parse(localStorage.getItem("quora"));
        let user = store.find(
          (res) => res.username === this.currentUser.username
        );
        let date = new Date();
        let time = date.toLocaleTimeString();

        user.post.unshift({
          postType: this.selected,
          postContent: this.postText,
          time: time,
          by: this.currentUser.username,
          comment: [],
          id: user.post.length + 1,
          likes: 0,
        });
        let index = store.indexOf(user);
        store[index] = user;
        localStorage.setItem("quora", JSON.stringify(store));



        this.myFeed.unshift({
          postType: this.selected,
          postContent: this.postText,
          time: time,
          by: this.currentUser.username,
          comment: [],
          id: this.myFeed.length + 1,
          likes: 0,
        });


        this.postText = "";
        this.selected = "";
      } else {
        alert("all field must be filled to post");
      }
    },






    saveDraft() {
      if (this.postText !== "" && this.selected !== "") {
        let store = JSON.parse(localStorage.getItem("quora"));
        let user = store.find(
          (res) => res.username === this.currentUser.username
        );
        let date = new Date();
        let time = date.toLocaleTimeString();
        user.draft.unshift({
          draftType: this.selected,
          draftContent: this.postText,
          time: time,
          by: this.currentUser.username,
        });
        let index = store.indexOf(user);
        store[index] = user;
        localStorage.setItem("quora", JSON.stringify(store));

        this.myDraft.unshift({
          draftType: this.selected,
          draftContent: this.postText,
          time: time,
          by: this.currentUser.username,
        });

        this.postText = "";
        this.selected = "";
      } else {
        alert("all filled should be filled to save as draft");
      }
    },






    editDraft(id) {
      setTimeout(() => {
        let value = this.myDraft.find((val, ind) => ind === id);
        this.postText = value.draftContent;
        this.selected = value.draftType;

        let result = this.myDraft.filter((val, ind) => ind !== id);
        this.myDraft = result;
        let store = JSON.parse(localStorage.getItem("quora"));
        let user = store.find(
          (res) => res.username === this.currentUser.username
        );
        user.draft.splice(id, 1);
        let index = store.indexOf(user);
        store[index] = user;
        localStorage.setItem("quora", JSON.stringify(store));
      }, 2000);
    },






    deleteDraft(id) {
      let value = this.myDraft.filter((val, ind) => ind !== id);
      this.myDraft = value;
      let store = JSON.parse(localStorage.getItem("quora"));
      let user = store.find(
        (res) => res.username === this.currentUser.username
      );
      user.draft.splice(id, 1);
      let index = store.indexOf(user);
      store[index] = user;
      localStorage.setItem("quora", JSON.stringify(store));
    },







    postDraft(id) {
      let value = this.myDraft.find((val, ind) => ind === id);
      this.postText = value.draftContent;
      this.selected = value.draftType;

      let store = JSON.parse(localStorage.getItem("quora"));
      let user = store.find(
        (res) => res.username === this.currentUser.username
      );
      let date = new Date();
      let time = date.toLocaleTimeString();
      user.post.unshift({
        postType: this.selected,
        postContent: this.postText,
        time: time,
        by: this.currentUser.username,
      });
      let index = store.indexOf(user);
      store[index] = user;
      localStorage.setItem("quora", JSON.stringify(store));

      this.myFeed.unshift({
        postType: this.selected,
        postContent: this.postText,
        time: time,
        by: this.currentUser.username,
      });

      setTimeout(() => {
        this.postText = "";
        this.selected = "";

        user.draft.splice(id, 1);
        index = store.indexOf(user);
        store[index] = user;
        localStorage.setItem("quora", JSON.stringify(store));

        let value = this.myDraft.filter((val, ind) => ind !== id);
        this.myDraft = value;
      }, 2000);
    },







    toggleDraft() {
      this.draftContainer = !this.draftContainer;
      if (this.useDraft === "useDraft") {
        this.useDraft = "closeDraft";
      } else if (this.useDraft === "closeDraft") {
        this.useDraft = "useDraft";
      }
    },






    toggleComment(id) {
      let key = this.myFeed.find((val, ind) => ind === id);

      if (key) {
        if (this.commentContainer[id] === undefined) {
          this.commentContainer[id] = true;
          for (let i = 0; i < this.myFeed.length; i++) {
            if (i === id) {
              continue;
            } else {
              this.commentContainer[i] = undefined;
              this.isReplying = false;
              this.isCommenting = true;
            }
          }
        } else if (this.commentContainer[id] === true) {
          this.commentContainer[id] = undefined;
          this.isReplying = false;
          this.isCommenting = true;
        }
      }
    },






    postLike(id) {
      let dispatsh = this.myFeed.find((val, ind) => ind === id);
      let owner = dispatsh.by;
      let identity = dispatsh.id;

      if (this.currentUser.username !== owner) {
        let storage = JSON.parse(localStorage.getItem("quora"));
        let postOwner = storage.find((res) => res.username === owner);
        let post = postOwner.post.find((val) => val.id === identity);
        if (this.up[id] === undefined) {
          post.likes++;
          this.up[id] = true;
        } else if (this.up[id] === true) {
          post.likes--;
          this.up[id] = undefined;

        }
        let ind = storage.indexOf(postOwner);
        storage[ind] = postOwner;
        localStorage.setItem("quora", JSON.stringify(storage));
      } else {
        let disp = this.myFeed.find((val, ind) => ind === id);
        let ident = disp.id;


        let store = JSON.parse(localStorage.getItem("quora"));
        let user = store.find(
          (res) => res.username === this.currentUser.username
        );
        let post = user.post.find((val) => val.id === ident);

        if (this.down[id] === undefined) {
          post.likes++;
          this.down[id] = true;

        } else if (this.down[id] === true) {
          post.likes--;
          this.down[id] = undefined;

        }
        let index = store.indexOf(user);
        store[index] = user;
        localStorage.setItem("quora", JSON.stringify(store));
      }
      let key = this.myFeed.find((val, ind) => ind === id);
      if (this.front[id] === undefined) {
        key.likes++;
        this.front[id] = true;

      } else if (this.front[id] === true) {
        key.likes--;
        this.front[id] = undefined;

      }
    },








    bookmark(id) {
      let dispatsh = this.myFeed.find((val, ind) => ind === id);
      let owner = this.currentUser.username;
      let postId = dispatsh.id;
      let storage = JSON.parse(localStorage.getItem("quora"));
      let user = storage.find((res) => res.username === owner);
      let duplicate = user.bookmark.filter(
        (val) =>
          val.content === dispatsh.postContent && val.time === dispatsh.time
      );

      if (duplicate.length === 0) {
        user.bookmark.unshift({
          content: dispatsh.postContent,
          by: dispatsh.by,
          time: dispatsh.time,
          id: postId,
        });
        let ind = storage.indexOf(user);
        storage[ind] = user;
        localStorage.setItem("quora", JSON.stringify(storage));

        this.book.unshift({
          content: dispatsh.postContent,
          by: dispatsh.by,
          time: dispatsh.time,
          id: postId,
        });
        this.$store.dispatch({ type: "increaseBook", payload: this.book });
      } else {
        alert("you already bookmark this post");
      }
    },








    follow(id) {
      let dispatsh = this.myFeed.find((val, ind) => ind === id);
      let owner = dispatsh.by;

      let storage = JSON.parse(localStorage.getItem("quora"));
      let postOwner = storage.find(
        (res) => res.username === this.currentUser.username
      );
      let duplicate = postOwner.following.filter((val) => val === owner);

      if (duplicate.length === 0) {
        let ind = storage.indexOf(postOwner);
        postOwner.following.unshift(owner);
        this.$store.dispatch({ type: "increaseFollower", payload: owner });
        storage[ind] = postOwner;
        localStorage.setItem("quora", JSON.stringify(storage));
      } else {
        alert(`you are already following ` + owner);
      }
    },









    commentFunc(id) {
      if (this.comment[id] !== undefined) {
        console.log(this.comment[id]);
        let date = new Date();
        let time = date.toLocaleTimeString();

        let dispatsh = this.myFeed.find((val, ind) => ind === id);
        let owner = dispatsh.by;
        let identity = dispatsh.id;

        if (this.currentUser.username !== owner) {
          let storage = JSON.parse(localStorage.getItem("quora"));
          let postOwner = storage.find((res) => res.username === owner);
          let post = postOwner.post.find((val) => val.id === identity);

          post.comment.unshift({
            commentContent: this.comment[id],
            time: time,
            by: this.currentUser.username,
            reply: [],
            id: this.myFeed.length + 1,
          });

          let ind = storage.indexOf(postOwner);
          storage[ind] = postOwner;
          localStorage.setItem("quora", JSON.stringify(storage));
        } else {
          let disp = this.myFeed.find((val, ind) => ind === id);
          let ident = disp.id;

          let store = JSON.parse(localStorage.getItem("quora"));
          let user = store.find(
            (res) => res.username === this.currentUser.username
          );
          let post = user.post.find((val) => val.id === ident);

          post.comment.unshift({
            commentContent: this.comment[id],
            time: time,
            by: this.currentUser.username,
            reply: [],
            id: this.myFeed.length + 1,
          });

          let index = store.indexOf(user);
          store[index] = user;
          localStorage.setItem("quora", JSON.stringify(store));
        }
        let key = this.myFeed.find((val, ind) => ind === id);
        key.comment.unshift({
          commentContent: this.comment[id],
          time: time,
          by: this.currentUser.username,
          reply: [],
          id: this.myFeed.length + 1,
        });

        this.comment[id] = undefined;
      } else {
        alert("kindly type a valid comment");
      }
    },











    focus(index, id) {
      this.$refs.commentInput.focus();
      this.isCommenting = false;
      this.isReplying = true;
      this.replyId = id;
    },








    replyFunc(index) {
      if (this.comment[index] !== undefined) {
        
        let date = new Date();
      let time = date.toLocaleTimeString();

      let dispatsh = this.myFeed.find((val, ind) => ind === index);
      let owner = dispatsh.by;
      let identity = dispatsh.id;

      if (this.currentUser.username !== owner) {
        let storage = JSON.parse(localStorage.getItem("quora"));
        let postOwner = storage.find((res) => res.username === owner);
        let post = postOwner.post.find((val) => val.id === identity);
        let comment = post.comment.find((key, keyId) => keyId === this.replyId);
        console.log(comment);
        comment.reply.unshift({
          replyContent: this.comment[index],
          time: time,
          by: this.currentUser.username,
          id: this.myFeed.length + 1,
        });
        let localIndex = storage.indexOf(postOwner);
        storage[localIndex] = postOwner;
        localStorage.setItem("quora", JSON.stringify(storage));
      } else {
        let disp = this.myFeed.find((val, ind) => ind === index);
        let ident = disp.id;

        let store = JSON.parse(localStorage.getItem("quora"));
        let user = store.find(
          (res) => res.username === this.currentUser.username
        );
        let post = user.post.find((key) => key.id === ident);
        let comment = post.comment.find((key, keyId) => keyId === this.replyId);

        comment.reply.unshift({
          replyContent: this.comment[index],
          time: time,
          by: this.currentUser.username,
          id: this.myFeed.length + 1,
        });
        let localId = store.indexOf(user);
        store[localId] = user;
        localStorage.setItem("quora", JSON.stringify(store));
      }
      let key = this.myFeed.find((val, ind) => ind === index);
      key.comment[this.replyId].reply.unshift({
        replyContent: this.comment[index],
        time: time,
        by: this.currentUser.username,
        id: this.myFeed.length + 1,
      });

      this.comment[index] = undefined;
      }else{
        alert("sorry your reply input is not valid")
      }
    },






  },
};
</script>





<style scoped>
.bord {
  border: 1px solid #ccc;
}
.border {
  border: 2px solid gray;
  padding-left: 10px;
}
.commentCount {
  color: rgb(112, 5, 50);
  padding: 2px 5px;
  border-radius: 50%;
}
.fad {
  color: #ccc;
}

.reply-btn {
  text-decoration: none;
  font-style: italic;
  font-size: 10px;
}
.post .fa-user-circle {
  color: white;
  font-size: 2rem;
  padding-top: 5px;
  padding-right: 3px;
  display: inline-block;
}
.comment .fa-user-circle {
  color: #444;
  font-size: 1.3rem;
  padding-top: 5px;
  padding-right: 3px;
  display: inline-block;
}
.reply .fa-user-circle {
  color: #333;
  font-size: 1rem;
  padding-top: 5px;
  padding-right: 3px;
  display: inline-block;
}

.shift {
  float: right !important;
  margin-top: 0.3rem;
  margin-left: 0.75rem;
}
.flex {
  display: flex;
  flex-wrap: wrap;
  word-wrap: break-word;
  word-break: break-all;
}
</style>
