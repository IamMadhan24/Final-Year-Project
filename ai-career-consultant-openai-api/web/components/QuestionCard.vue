<template>
  <div class="w-full p-5 border rounded-lg border-slate-700/40 bg-slate-700/10">
    <div class="flex items-center gap-2">
      <div
        class="flex items-center justify-center w-8 h-8 rounded-full bg-blue-400/20 animate-pulse"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
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

      <h1 class="text-xl font-bold">
        <span class="text-white/80"
          >{{ animation.question.displayText
          }}<span v-if="!optionsVisible" class="animate-pulse">|</span></span
        >
      </h1>
    </div>

    <div class="flex flex-col gap-3 mt-5">
      <div
        v-for="(option, index) in displayedOptions"
        :key="index"
        @click="selectOption(option)"
        class="flex items-center cursor-pointer hover:bg-slate-700/40 transition-[0.3s] w-full gap-2 p-3 border rounded-lg border-slate-700/40 bg-slate-700/10"
        :class="{
          '!border-blue-400': option.fullText == question.answer,
        }"
      >
        <div
          class="flex items-center justify-center w-8 h-8 font-bold rounded-full text-white/60 min-w-8 bg-blue-400/20"
        >
          {{ index + 1 }}
        </div>

        <p class="text-white/60">
          {{ option.displayText }}
          <span v-if="option.isTyping" class="animate-pulse">|</span>
        </p>
      </div>
    </div>

    <div class="h-[1px] w-full bg-white/20 mt-5"></div>

    <p class="mt-5 text-white/60">
      <span>Objective:</span> {{ animation.objective.displayText }}
      <span v-if="animation.objective.isTyping" class="animate-pulse">|</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      animation: {
        question: {
          displayText: "",
          typingSpeed: 10, // milliseconds per character
          waitTime: 1000, // milliseconds to wait after typing
        },
        options: {
          typingSpeed: 10, // milliseconds per character
          revealDelay: 400, // milliseconds between each option reveal
        },
        objective: {
          displayText: "",
          typingSpeed: 10, // milliseconds per character
          waitTime: 300, // milliseconds to wait before typing
          isTyping: false,
        },
      },
      displayedOptions: [],
      optionsVisible: false,
      buttonVisible: false,
    };
  },
  mounted() {
    this.animateQuestion();
  },
  methods: {
    animateQuestion() {
      let i = 0;
      const typeWriter = () => {
        if (i < this.question.question.length) {
          this.animation.question.displayText +=
            this.question.question.charAt(i);
          i++;
          setTimeout(typeWriter, this.animation.question.typingSpeed);
        } else {
          // Start showing options after question animation completes
          this.optionsVisible = true;
          this.animateOptions();
        }
      };

      // Add wait time before starting to type
      setTimeout(typeWriter, this.animation.question.waitTime);
    },
    animateOptions() {
      const options = this.question.options;

      this.startOptionSequence(options);
    },
    startOptionSequence(options) {
      let currentOptionIndex = 0;

      const startNextOption = () => {
        if (currentOptionIndex < options.length) {
          const option = options[currentOptionIndex];
          const optionObj = {
            fullText: option,
            displayText: "",
            isTyping: true,
          };

          this.displayedOptions.push(optionObj);

          // Start typing the current option
          this.typeOption(currentOptionIndex, 0, () => {
            // When done typing, move to next option
            currentOptionIndex++;
            setTimeout(startNextOption, this.animation.options.revealDelay);
          });
        } else {
          // All options are fully typed out
          this.buttonVisible = true;
          // Start animating the objective after options are done
          this.animateObjective();
        }
      };

      // Start the first option
      startNextOption();
    },
    typeOption(optionIndex, charIndex, callback) {
      const option = this.displayedOptions[optionIndex];

      if (charIndex < option.fullText.length) {
        // Continue typing
        option.displayText += option.fullText.charAt(charIndex);
        charIndex++;
        setTimeout(() => {
          this.typeOption(optionIndex, charIndex, callback);
        }, this.animation.options.typingSpeed);
      } else {
        // Finished typing this option
        option.isTyping = false;
        callback();
      }
    },
    animateObjective() {
      this.animation.objective.isTyping = true;
      setTimeout(() => {
        let i = 0;
        const typeObjective = () => {
          if (i < this.question.objective.length) {
            this.animation.objective.displayText +=
              this.question.objective.charAt(i);
            i++;
            setTimeout(typeObjective, this.animation.objective.typingSpeed);
          } else {
            this.animation.objective.isTyping = false;
          }
        };
        typeObjective();
      }, this.animation.objective.waitTime);
    },
    selectOption(option) {
      if (this.buttonVisible) {
        this.question.answer = option.fullText;
        this.$emit("showButton");
      }
    },
  },
};
</script>
