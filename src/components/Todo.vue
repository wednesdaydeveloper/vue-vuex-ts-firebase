<template>
    <div>
        <p v-if='empty()'>
            <md-empty-state
                class="md-primary"
                md-icon="done"
                md-label="Nothing in Done"
                md-description="Todo を追加してください。">
            </md-empty-state>
        </p>
        <div v-else>
            <div class="md-layout md-alignment-top-center">
                <div>
                    <md-radio v-model="filter" value="All"        >全て</md-radio>
                    <md-radio v-model="filter" value="Completed"  >完了のみ</md-radio>
                    <md-radio v-model="filter" value="Incompleted">未完了のみ</md-radio>
                </div>
            </div>
            <div class="md-layout md-alignment-top-center">
                <ul class="md-layout-item md-size-40">
                    <div>
                        <li v-for="item in items" :key="item.id" class="md-layout md-alignment-top-left">
                            <md-checkbox :value="!item.done" @change="toggle(item)" :class="{done: item.done}">
                                {{ item.content }}
                            </md-checkbox>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
        <div class="md-layout md-alignment-top-center">
            <md-field class="md-layout-item md-size-40">
                <md-input v-model="todoContent" placeholder="Todoを入力してください。" v-on:keyup.enter="addContent"></md-input>
            </md-field>
            <md-button @click="addContent" class="md-raised">追加</md-button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as todo from '@/store/modules/todo';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.use(VueMaterial);

@Component<Todo>({
  computed: {
    ...todo.mapGetters(['items', 'filterName']),
    filter: {
        get() {
            return this.filterName;
        },
        set(value: string) {
            Object.entries(todo.FilterType).map(([key, v]) => v)
                .filter((ft) => todo.FilterType[ft] === value)
                .forEach((ft) => this.changeFilterType(ft));
        },
    },
  },
  methods: {
    ...todo.mapActions(['addAsync', 'setAsync']),
    ...todo.mapMutations(['changeFilterType']),
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

li {
    list-style-type: none;
}

.md-empty-state {
    display: inline-block;
    vertical-align: middle;

    + .md-empty-state {
        margin-left: 16px;
    }
}
</style>