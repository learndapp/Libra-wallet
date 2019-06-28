<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <ul>
      <li>
        <a
          href="https://github.com/libra/libra"
          target="_blank"
        >
          Libra
        </a>
      </li>
      <li>
        <a
          href="https://github.com/learndapp/awesome-libra"
          target="_blank"
        >
          Awesome Libra
        </a>
      </li>
      <li>
        <a
          href="https://github.com/learndapp/LearnDapp"
          target="_blank"
        >
          LearnDapp
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Libra Wallet Demo',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #392d8a;
}
</style>
