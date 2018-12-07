<template>
  <div>
    <md-list class='md-scrollbar'>
      <div v-for='message in messages' :key='message.id' class='message-container'>
        <md-avatar class='md-avatar-icon'>
          <md-ripple>{{ message.user }}</md-ripple>
        </md-avatar>
        <md-list-item class="message-item">
          <md-content>{{ message.content }}</md-content>
        </md-list-item>
        <md-list-item>{{ message.createdAt }}</md-list-item>
      </div>
    </md-list>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import * as user from '@/store/modules/user';
import * as chatroom from '@/store/modules/chatroom';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(VueMaterial);

@Component<Chatroom>({
    computed: {
        ...user.mapGetters(['email', 'uid', 'loggedin']),
        ...chatroom.mapGetters(['messages', 'currentRoom']),
    },
})
export default class Chatroom extends Vue {
}

</script>

<style lang='scss' scoped>
.message-container {
  display: flex;
}

.md-list {
  width: 40%;
  max-width: 100%;
  max-height: 200px;
  display: inline-block;
  vertical-align: top;
  border: 1px solid rgba(#000, .12);
  overflow-x: auto;

  .md-avatar {
    margin: unset;
  }

  .message-item {
    width: 80%;
  }
}
</style>
