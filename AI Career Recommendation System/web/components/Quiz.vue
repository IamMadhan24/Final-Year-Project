<template>
  <div class="fixed top-0 left-0 w-full h-full bg-[#121a2e]">
    <div
      class="absolute w-full h-full top-0 left-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTI3LCAxNDQsIDI1NSwgMC4wOCkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"
    ></div>

    <div
      class="w-full max-w-[768px] mx-auto px-5 py-20 relative h-full overflow-auto hide-scrollbar"
    >
      <div
        class="flex items-center justify-center w-20 h-20 mb-10 border border-blue-500 rounded-full animate-pulse bg-slate-700/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-blue-500 lucide lucide-brain"
        >
          <path
            d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"
          ></path>
          <path
            d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"
          ></path>
          <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
          <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
          <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
          <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
          <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
          <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
          <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
        </svg>
      </div>

      <div v-if="stage == 0">
        <div
          class="w-full p-5 border rounded-lg bg-slate-700/10 border-slate-700/40"
        >
          <p class="text-white/40">
            {{ animatedText.mainPara.displayText
            }}<span class="animate-pulse">|</span>
          </p>
        </div>

        <div
          v-if="animatedText.buttonVisible"
          class="flex justify-center w-full mt-4"
        >
          <div
            @click="getQuestions()"
            class="px-10 py-4 text-white bg-blue-500 rounded-lg"
          >
            Get Started
          </div>
        </div>
      </div>

      <div v-else-if="stage == 1">
        <div
          class="w-full p-5 border rounded-lg border-slate-700/40 bg-slate-700/10"
        >
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center gap-2">
              <div
                class="w-2 h-2 bg-blue-400 rounded-full min-w-2 animate-pulse"
              ></div>

              <p class="text-sm text-white/40">
                Question {{ progress.activeIndex + 1 }} of
                {{ questions.length }}
              </p>
            </div>
            <div>
              <p class="text-blue-400">
                {{ getProgressPercentage() }}% Complete
              </p>
            </div>
          </div>
          <div class="w-full h-2 mt-2 overflow-hidden rounded-full bg-black/20">
            <div class="h-full bg-blue-400 anima" style="width: 40%"></div>
          </div>
        </div>

        <div class="flex flex-col w-full gap-5 mt-5">
          <QuestionCard
            v-for="(question, questionIndex) in uiQuestions"
            :key="questionIndex"
            :question="question"
            @showButton="showButton = true"
          />

          <div v-if="showButton" class="flex justify-center w-full mt-4">
            <div
              v-if="progress.activeIndex == questions.length - 1"
              @click="submitQuestion()"
              class="px-10 py-4 text-white bg-blue-500 rounded-lg"
            >
              Finish
            </div>
            <div
              @click="nextQuestion()"
              v-else
              class="px-10 py-4 text-white bg-blue-500 rounded-lg"
            >
              Next
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="generateLoading"
      class="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full bg-black/10 backdrop-blur-sm"
    >
      <div class="animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-blue-400"
        >
          <path
            d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
          ></path>
          <path d="M20 3v4"></path>
          <path d="M22 5h-4"></path>
          <path d="M4 17v2"></path>
          <path d="M5 18H3"></path>
        </svg>
      </div>

      <h1 class="mt-5 text-xl font-medium text-white/80">
        AI Generating questions for you
      </h1>

      <p class="mt-4 text-sm text-center text-white/60">
        It will take few seconds to generate the questions
      </p>
    </div>
  </div>
</template>

<style scoped></style>

<script>
import { useToast } from "vue-toastification";

export default {
  data() {
    return {
      generateLoading: false,
      stage: 0,
      animatedText: {
        mainPara: {
          displayText: "",
          fullText:
            "Welcome to the AI Career Consulting Quiz. This quiz will help you pick the right career path in the AI based on your skills and interests. Let's get started!",
          typingSpeed: 10, // milliseconds per character
          waitTime: 1000, // milliseconds to wait after typing
        },
        buttonVisible: false,
      },
      progress: {
        activeIndex: 0,
      },
      questions: [
        {
          question: "What is your favorite color?",
          options: ["Red", "Blue", "Green", "Yellow"],
          answer: "",
        },
        {
          question: "What is your favorite animal?",
          options: ["Dog", "Cat", "Elephant", "Lion"],
          answer: "",
        },
        {
          question: "What is your favorite food?",
          options: ["Pizza", "Burger", "Pasta", "Salad"],
          answer: "",
        },
      ],
      uiQuestions: [],
      showButton: false,
    };
  },
  mounted() {
    let i = 0;
    const typeWriter = () => {
      if (i < this.animatedText.mainPara.fullText.length) {
        this.animatedText.mainPara.displayText +=
          this.animatedText.mainPara.fullText.charAt(i);
        i++;
        setTimeout(typeWriter, this.animatedText.mainPara.typingSpeed);
      } else {
        // Show button after animation completes
        this.animatedText.buttonVisible = true;
      }
    };

    // Add wait time before starting to type
    setTimeout(typeWriter, this.animatedText.mainPara.waitTime);
  },
  methods: {
    async getQuestions() {
      this.stage = 1;

      // fetch questions
      this.generateLoading = true;

      await this.$http.get("/ai/questions").then((res) => {
        if (res.success) {
          this.questions = res.questions;

          if (this.questions.length > 0) {
            this.uiQuestions.push(this.questions[0]);
          }

          this.generateLoading = false;
        } else {
          useToast().error("Failed to fetch questions");
        }
      });
    },
    getProgressPercentage() {
      return Math.floor(
        (this.progress.activeIndex / this.questions.length) * 100
      );
    },
    nextQuestion() {
      this.showButton = false;
      this.progress.activeIndex++;

      if (this.progress.activeIndex < this.questions.length) {
        this.uiQuestions.push(this.questions[this.progress.activeIndex]);
      }
    },
    submitQuestion() {
      this.$emit("submit", this.uiQuestions);
    },
  },
};
</script>

<style>
/* Hide scrollbar for Chrome, Safari and Opera */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
