<template>
    <div>
        <p v-if='empty()'>入力してください。</p>
        <ul v-else>
            <li v-for="item in items" :key="item.id">
                <label :class="{ done: item.done }">
                    <input
                        type="checkbox"
                        :checked="item.done"
                        @change="toggle(item)" >
                    {{ item.content }}
                </label>
            </li>
        </ul>
        <p>
            <input class='add'
                type="text"
                v-model="todoContent"
                placeholder="Todoを入力してください。"
                v-on:keyup.enter="addContent">
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as todo from '@/store/modules/todo';

@Component<Todo>({
  computed: {
    ...todo.mapGetters(['items']),
  },
  methods: {
    ...todo.mapActions(['addAsync', 'setAsync']),
  },
})
export default class Todo extends Vue {
  /** テキストボックスに入力される文字列 */
  private todoContent: string = '';

  private empty(): boolean {
    return this.items.length === 0;
  }

  private toggle(item: todo.TodoItem): void {
      this.setAsync({ ...item, done: !item.done});
  }

  private addContent(): void {
      if (this.todoContent) {
          this.addAsync({done: false, content: this.todoContent});
          this.todoContent = '';
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.done {
  text-decoration: line-through;
}
</style>