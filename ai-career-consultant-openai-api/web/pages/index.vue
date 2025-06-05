<template>
  <div>
    <Quiz v-if="page === 'quiz'" @submit="handleQuizSubmit" />
    <Result v-else-if="page === 'result'" :answer="answer" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: "quiz",
      answer: null,
    };
  },
  methods: {
    handleQuizSubmit(e) {
      this.page = "result";

      this.answer = e;
    },
  },
};
</script>
