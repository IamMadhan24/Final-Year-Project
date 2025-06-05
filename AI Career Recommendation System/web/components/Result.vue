<template>
  <div>
    <div class="fixed top-0 left-0 w-full h-full bg-[#121a2e]">
      <div
        class="absolute w-full h-full top-0 left-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMTI3LCAxNDQsIDI1NSwgMC4wOCkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"
      ></div>

      <div
        v-if="isLoading"
        class="w-full max-w-[1024px] flex-col pb-20 mx-auto px-5 relative h-full overflow-auto hide-scrollbar flex items-center justify-center"
      >
        <div
          class="flex flex-col items-center justify-center w-20 h-20 border border-blue-500 rounded-full animate-pulse bg-slate-700/10"
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

        <h1 class="mt-10 text-xl font-medium text-white">
          {{ currentLoadingText }}
        </h1>

        <div
          class="bg-blue-500/10 w-full max-w-[500px] rounded-full h-2 mt-5 relative"
        >
          <div
            class="h-full bg-blue-400 rounded-full"
            :style="`width: ${loadingProgress}%`"
          ></div>
        </div>

        <p class="mt-5 text-white/40 max-w-[500px] text-xs">
          Our advanced AI is analyzing question patterns and generating a
          comprehensive career report for you. This process may take a few
          seconds, so please be patient. We appreciate your understanding!
        </p>
      </div>

      <div
        v-else
        class="w-full max-w-[1024px] pb-20 mx-auto px-5 relative h-full overflow-auto hide-scrollbar"
      >
        <div class="flex justify-center pt-20 mb-2">
          <span
            class="px-3 py-1 text-sm font-medium text-blue-400 rounded-full bg-blue-400/10"
            >Career Analysis Report</span
          >
        </div>

        <div
          class="sticky flex w-full p-2 overflow-auto rounded-full top-5 bg-blue-400/10 backdrop-blur-md"
        >
          <div
            v-for="(tab, tabIndex) in tabs"
            :key="tabIndex"
            class="w-full px-4 py-2 text-sm text-center rounded-full cursor-pointer text-white/90 whitespace-nowrap"
            :class="{
              'bg-blue-400/10 backdrop-blur-md': activeTab === tab.key,
            }"
            @click="scrollToSection(tab.key)"
          >
            {{ tab.text }}
          </div>
        </div>

        <div>
          <div class="w-full pt-20" id="overview">
            <h1 class="mb-4 text-4xl font-bold text-blue-400">Overview</h1>
            <div
              class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
            >
              <h1 class="font-medium text-blue-400">Summary</h1>

              <p class="mt-2 text-sm text-white/70">
                {{ report.overview.data.summary }}
              </p>
            </div>

            <div class="grid w-full gap-5 mt-5 lg:grid-cols-3">
              <div
                class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
              >
                <h1 class="font-medium text-blue-400">Skill Analysis</h1>

                <p class="mt-2 text-sm text-white/70">
                  {{ report.overview.data?.skillsAnalysis?.evaluation }}
                </p>

                <hr class="my-4 border-white/10" />

                <div class="flex flex-wrap gap-2">
                  <h2 class="mt-0.5 text-sm font-medium text-white">
                    Identified Skills:
                  </h2>

                  <span
                    v-for="(skill, skillIndex) in report.overview.data
                      ?.skillsAnalysis?.identifiedSkills"
                    :key="skillIndex"
                    class="px-2 py-1 text-xs text-blue-400 rounded-full bg-blue-400/10"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>

              <div
                class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
              >
                <h1 class="font-medium text-blue-400">Interest Analysis</h1>

                <p class="mt-2 text-sm text-white/70">
                  {{ report.overview.data?.interestsAnalysis?.analysis }}
                </p>

                <hr class="my-4 border-white/10" />

                <div class="flex flex-wrap gap-2">
                  <h2 class="mt-0.5 text-sm font-medium text-white">
                    Primary Interests:
                  </h2>

                  <span
                    v-for="(interest, interestIndex) in report.overview.data
                      ?.interestsAnalysis?.primaryInterests"
                    :key="interestIndex"
                    class="px-2 py-1 text-xs text-blue-400 rounded-full bg-blue-400/10"
                  >
                    {{ interest }}
                  </span>
                </div>
              </div>

              <div
                class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
              >
                <h1 class="font-medium text-blue-400">Personality Traits</h1>

                <p class="mt-2 text-sm text-white/70">
                  <span class="font-medium text-white">Working Style:</span>
                  {{ report.overview.data?.personalityTraits?.workingStyle }}
                </p>

                <hr class="my-4 border-white/10" />

                <div class="flex flex-wrap gap-2">
                  <h2 class="mt-0.5 text-sm font-medium text-white">
                    Dominant Traits:
                  </h2>

                  <span
                    v-for="(trait, traitIndex) in report.overview.data
                      ?.personalityTraits?.dominantTraits"
                    :key="traitIndex"
                    class="px-2 py-1 text-xs text-blue-400 rounded-full bg-blue-400/10"
                  >
                    {{ trait }}
                  </span>
                </div>
              </div>
            </div>

            <div
              class="w-full p-4 mt-5 border rounded-lg border-slate-700/40 bg-blue-400/10"
            >
              <h1 class="font-medium text-blue-400">Industry Trends</h1>

              <ul
                class="mt-2 space-y-2 text-sm list-disc list-inside text-white/70"
              >
                <li
                  v-for="(trend, trendIndex) in report.overview.data
                    ?.industryTrends?.relevantTrends"
                  :key="trendIndex"
                  class="flex items-center gap-4"
                >
                  <div
                    class="inline-block w-2 h-2 bg-blue-400 rounded-full min-w-2"
                  ></div>
                  <p class="text-sm text-white/80">
                    {{ trend }}
                  </p>
                </li>
              </ul>

              <hr class="my-4 border-white/10" />

              <p class="text-sm text-white/70">
                <span class="font-medium text-white">Market Demand: </span>
                {{ report.overview.data?.industryTrends?.marketDemand }}
              </p>
            </div>
          </div>

          <div class="w-full pt-20" id="careerFit">
            <h1 class="mb-4 text-4xl font-bold text-blue-400">Career Fit</h1>

            <div class="grid w-full gap-5 lg:grid-cols-3">
              <div
                v-for="(fit, fitIndex) in report.careerFit.data"
                :key="fitIndex"
                class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
              >
                <div class="flex items-center justify-between">
                  <h1 class="text-xl font-medium text-white">
                    {{ fit.career }}
                  </h1>

                  <div
                    class="flex items-center justify-center w-12 h-12 text-white rounded-full min-w-12 bg-blue-400/50"
                  >
                    <p class="text-xl font-medium text-white">
                      {{ fit.compatibilityScore
                      }}<span class="text-xs text-white/50">/10</span>
                    </p>
                  </div>
                </div>

                <p class="mt-4 text-sm text-white/70">
                  {{ fit.justification }}
                </p>
              </div>
            </div>

            <h2 class="mt-4 text-2xl font-medium text-white">
              Potential Career Paths
            </h2>

            <div class="flex flex-wrap w-full gap-2 mt-4">
              <div
                v-for="(path, pathIndex) in report.careerFit.data"
                :key="pathIndex"
                class="px-4 py-2 text-sm font-medium text-white rounded-full cursor-pointer w-fit"
                :class="{
                  'bg-blue-400': pathIndex === report.careerFit.activeIndex,
                  'bg-blue-400/10': pathIndex !== report.careerFit.activeIndex,
                }"
                @click="report.careerFit.activeIndex = pathIndex"
              >
                {{ path.career }}
              </div>
            </div>

            <div
              v-if="
                report.careerFit.activeIndex != null &&
                report.careerFit.activeIndex >= 0
              "
              class="grid gap-5 mt-5"
            >
              <div
                v-for="(path, pathIndex) in report.careerFit.data[
                  report.careerFit.activeIndex
                ].careerPathways"
                :key="pathIndex"
                class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
              >
                <h1 class="text-xl font-medium text-blue-400">
                  {{ path.pathName }}
                </h1>

                <div class="mt-5">
                  <h2 class="text-sm font-medium uppercase text-white/50">
                    Description
                  </h2>

                  <p class="mt-2 text-sm text-white/80">
                    {{ path.description }}
                  </p>
                </div>

                <div class="mt-5">
                  <h2 class="text-sm font-medium uppercase text-white/50">
                    Why This Fits You
                  </h2>

                  <p class="mt-2 text-sm text-white/80">
                    {{ path.fitReasoning }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full pt-20" id="analysis">
            <h1 class="mb-4 text-4xl font-bold text-blue-400">Analysis</h1>

            <div
              class="w-full p-4 text-white border rounded-lg border-slate-700/40 bg-blue-400/10"
            >
              {{ report.analysis.data?.strengthsWeaknesses?.analysis }}
            </div>

            <div class="grid gap-5 mt-5 lg:grid-cols-2">
              <div
                class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
              >
                <h1 class="text-xl font-medium text-green-400">Strengths</h1>

                <div class="flex flex-col w-full gap-3 mt-5">
                  <div
                    v-for="(item, itemIndex) in report.analysis.data
                      ?.strengthsWeaknesses?.strengths"
                    class="flex items-center gap-4 px-4 py-2 border rounded-lg border-green-400/20 bg-green-400/10"
                  >
                    <div
                      class="w-2 h-2 bg-green-400 rounded-full min-w-2"
                    ></div>

                    <p class="text-sm text-white">
                      {{ item }}
                    </p>
                  </div>
                </div>
              </div>

              <div
                class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
              >
                <h1 class="text-xl font-medium text-orange-400">
                  Areas for Improvement
                </h1>

                <div class="flex flex-col w-full gap-3 mt-5">
                  <div
                    v-for="(item, itemIndex) in report.analysis.data
                      ?.strengthsWeaknesses?.weaknesses"
                    class="flex items-center gap-4 px-4 py-2 border rounded-lg border-orange-400/20 bg-orange-400/10"
                  >
                    <div
                      class="w-2 h-2 bg-orange-400 rounded-full min-w-2"
                    ></div>

                    <p class="text-sm text-white">
                      {{ item }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 class="mt-5 text-2xl font-medium text-white">
              Work-Life Balance Assessment
            </h2>

            <div
              class="w-full p-4 mt-5 text-white border rounded-lg border-slate-700/40 bg-blue-400/10"
            >
              <p class="text-white">
                {{ report.analysis.data?.workLifeBalance?.assessment }}
              </p>

              <h2 class="mt-4 text-sm font-medium uppercase text-white/50">
                Recommendations:
              </h2>

              <div class="flex flex-col w-full gap-3 mt-3">
                <div
                  v-for="(item, itemIndex) in report.analysis.data
                    ?.workLifeBalance?.recommendations"
                  :key="itemIndex"
                  class="flex items-center gap-4 px-4 py-2 border rounded-lg border-slate-700/40 bg-blue-400/10"
                >
                  <div class="w-2 h-2 bg-blue-400 rounded-full min-w-2"></div>
                  <p>
                    {{ item }}
                  </p>
                </div>
              </div>
            </div>

            <h2 class="mt-5 text-2xl font-medium text-white">
              Growth Potential Assessment
            </h2>

            <div class="grid gap-5 mt-5 lg:grid-cols-2">
              <div
                class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
              >
                <h1 class="font-medium text-white">Short-Term Growth</h1>

                <p class="mt-4 text-sm text-white/80">
                  {{ report.analysis.data?.growthPotential?.shortTermGrowth }}
                </p>
              </div>

              <div
                class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
              >
                <h1 class="font-medium text-white">Long-Term Growth</h1>

                <p class="mt-4 text-sm text-white/80">
                  {{ report.analysis.data?.growthPotential?.longTermGrowth }}
                </p>
              </div>
            </div>

            <div
              class="w-full p-4 mt-5 border rounded-lg border-slate-700/40 bg-blue-400/10"
            >
              <h1 class="font-medium text-white">Opportunities</h1>

              <ul class="flex flex-col w-full gap-2 mt-3">
                <li
                  v-for="(item, itemIndex) in report.analysis.data
                    ?.growthPotential?.opportunities"
                  :key="itemIndex"
                  class="flex items-center gap-4"
                >
                  <div
                    class="inline-block w-2 h-2 bg-blue-400 rounded-full min-w-2"
                  ></div>
                  <p class="text-sm text-white/80">
                    {{ item }}
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div class="w-full pt-20" id="education">
            <h1 class="mb-4 text-4xl font-bold text-blue-400">
              Educational Recommendations
            </h1>

            <div class="grid w-full gap-5 lg:grid-cols-2">
              <div
                v-for="(item, itemIndex) in report.education.data"
                :key="itemIndex"
                class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
              >
                <div class="">
                  <p class="text-xs uppercase text-white/70">
                    {{ item.type }}
                  </p>
                  <h1 class="text-xl font-medium text-white">
                    {{ item.name }}
                  </h1>
                </div>

                <p class="mt-2 text-sm text-white/70">
                  {{ item.reason }}
                </p>
              </div>
            </div>
          </div>

          <div class="w-full pt-20" id="skills">
            <h1 class="mb-4 text-4xl font-bold text-blue-400">
              Skill Development Roadmap
            </h1>

            <div class="w-full">
              <div
                v-for="(skill, skillIndex) in report.skills.data
                  ?.skillDevelopmentRoadmap"
                :key="skillIndex"
                class="flex w-full gap-5"
              >
                <div class="relative">
                  <div
                    class="relative z-50 flex items-center justify-center w-10 h-10 text-white bg-blue-400 rounded-full min-w-10"
                  >
                    {{ skillIndex + 1 }}
                  </div>

                  <div
                    v-if="
                      skillIndex !=
                      report.skills.data?.skillDevelopmentRoadmap.length - 1
                    "
                    class="absolute top-0 -translate-x-1/2 left-1/2 h-full w-[2px] bg-blue-400"
                  ></div>
                </div>
                <div class="w-full pb-10">
                  <div
                    class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
                  >
                    <div class="flex items-center justify-between w-full">
                      <h1 class="text-xl font-medium text-white">
                        {{ skill.stage }}
                      </h1>

                      <div
                        class="px-4 py-1 text-xs rounded-full w-fit bg-blue-400/20 text-white/80"
                      >
                        {{ skill.timeframe }}
                      </div>
                    </div>

                    <ul class="flex flex-col gap-2 mt-5">
                      <li
                        v-for="(item, itemIndex) in skill.skills"
                        :key="itemIndex"
                        class="flex items-center gap-4"
                      >
                        <div
                          class="inline-block w-2 h-2 bg-blue-400 rounded-full min-w-2"
                        ></div>
                        <p class="text-sm text-white/80">
                          {{ item }}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h2 class="mt-5 text-2xl font-medium text-white">
              Your Competitive Advantages
            </h2>

            <div class="grid w-full gap-5 mt-5 lg:grid-cols-2">
              <div
                v-for="(item, itemIndex) in report.skills.data
                  ?.competitiveAdvantages"
                class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
              >
                <p class="text-white/70">
                  {{ item }}
                </p>
              </div>
            </div>
          </div>

          <div class="w-full pt-20" id="actionPlan">
            <h1 class="mb-4 text-4xl font-bold text-blue-400">
              Your Action Plan
            </h1>

            <div class="flex flex-col w-full gap-5 mt-5">
              <div
                class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
              >
                <div
                  class="px-4 py-2 text-sm font-medium text-blue-400 rounded-full w-fit bg-blue-400/20"
                >
                  Immediate
                </div>

                <div class="flex flex-col w-full gap-4 mt-4">
                  <div
                    v-for="(item, itemIndex) in report.actionPlan.data
                      ?.immediate"
                    class="flex items-center w-full gap-4 p-2 border rounded-lg border-slate-700/40 bg-blue-400/10"
                  >
                    <div
                      class="flex items-center justify-center w-6 h-6 text-xs font-medium text-white rounded-full bg-blue-400/50 min-w-6"
                    >
                      {{ itemIndex + 1 }}
                    </div>

                    <p class="text-white">
                      {{ item }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col w-full gap-5 mt-5">
              <div
                class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
              >
                <div
                  class="px-4 py-2 text-sm font-medium text-blue-400 rounded-full w-fit bg-blue-400/20"
                >
                  Short term
                </div>

                <div class="flex flex-col w-full gap-4 mt-4">
                  <div
                    v-for="(item, itemIndex) in report.actionPlan.data
                      ?.shortTerm"
                    class="flex items-center w-full gap-4 p-2 border rounded-lg border-slate-700/40 bg-blue-400/10"
                  >
                    <div
                      class="flex items-center justify-center w-6 h-6 text-xs font-medium text-white rounded-full bg-blue-400/50 min-w-6"
                    >
                      {{ itemIndex + 1 }}
                    </div>

                    <p class="text-white">
                      {{ item }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-col w-full gap-5 mt-5">
              <div
                class="w-full p-4 border rounded-lg border-slate-700/40 bg-blue-400/10"
              >
                <div
                  class="px-4 py-2 text-sm font-medium text-blue-400 rounded-full w-fit bg-blue-400/20"
                >
                  Long term
                </div>

                <div class="flex flex-col w-full gap-4 mt-4">
                  <div
                    v-for="(item, itemIndex) in report.actionPlan.data
                      ?.longTerm"
                    class="flex items-center w-full gap-4 p-2 border rounded-lg border-slate-700/40 bg-blue-400/10"
                  >
                    <div
                      class="flex items-center justify-center w-6 h-6 text-xs font-medium text-white rounded-full bg-blue-400/50 min-w-6"
                    >
                      {{ itemIndex + 1 }}
                    </div>

                    <p class="text-white">
                      {{ item }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full pt-20" id="resources">
            <h1 class="mb-4 text-4xl font-bold text-blue-400">
              Recommended Resources
            </h1>

            <div
              class="grid w-full px-4 mt-5 border divide-y rounded-lg border-slate-700/40 bg-blue-400/10 divide-blue-400/40"
            >
              <div
                v-for="(resource, resourceIndex) in report.resources.data"
                :key="resourceIndex"
                class="grid grid-cols-[40%_60%] items-center justify-between w-full py-4"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="flex items-center justify-center w-8 h-8 rounded-full min-w-8 bg-blue-400/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#60a5fa"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="w-4 h-4 lucide lucide-book-open"
                    >
                      <path d="M12 7v14"></path>
                      <path
                        d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
                      ></path>
                    </svg>
                  </div>

                  <div class="">
                    <h1 class="font-medium text-white">
                      {{ resource.name }}
                    </h1>
                    <p class="mt-1 text-xs uppercase text-white/60">
                      {{ resource.type }}
                    </p>
                  </div>
                </div>

                <div>
                  <p class="text-sm text-right text-white/60">
                    {{ resource.purpose }}
                  </p>
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
export default {
  props: {
    answer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeTab: "overview",
      tabs: [
        {
          key: "overview",
          text: "Overview",
        },
        {
          key: "careerFit",
          text: "Career Fit",
        },
        {
          key: "analysis",
          text: "Analysis",
        },
        {
          key: "education",
          text: "Education",
        },
        {
          key: "skills",
          text: "Skills",
        },
        {
          key: "actionPlan",
          text: "Action Plan",
        },
        {
          key: "resources",
          text: "Resources",
        },
      ],
      isLoading: true,
      loadingProgress: 0,
      currentLoadingText: "AI is analyzing your results...",
      loadingTextInterval: null,
      loadingTexts: [
        "AI Analyzing your career preferences...",
        "AI Identifying your strengths and interests...",
        "AI Mapping potential career paths...",
        "AI Generating personalized career insights...",
        "AI Finalizing your career analysis report...",
      ],
      report: {
        overview: {
          data: {},
        },
        careerFit: {
          data: {},
          activeIndex: null,
        },
        analysis: {
          data: {},
        },
        education: {
          data: {},
        },
        skills: {
          data: {},
        },
        actionPlan: {
          data: {},
        },
        resources: {
          data: {},
        },
      },
    };
  },
  async mounted() {
    this.startLoadingAnimation();
    await this.getReport();
  },
  methods: {
    scrollToSection(section) {
      this.activeTab = section;
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
    async getReport() {
      return await new Promise(async (resolve) => {
        await this.$http
          .post("/ai/report", {
            answers: this.answer,
          })
          .then((res) => {
            if (res.success) {
              this.report.overview.data = res.report.overview;

              this.report.careerFit.data = res.report.careerFit;
              if (res.report.careerFit.length > 0) {
                this.report.careerFit.activeIndex = 0;
              }

              this.report.analysis.data = res.report.analysis;

              this.report.education.data = res.report.education;

              this.report.skills.data = res.report.skills;

              this.report.actionPlan.data = res.report.actionPlan;

              this.report.resources.data = res.report.resources;
            } else {
              alert(
                "An error occurred while generating the report. Please try again."
              );

              window.location.href = "/";
            }
          });

        this.completeLoading();
      });
    },
    startLoadingAnimation() {
      // Start rotating loading text
      this.rotateLoadingText();

      // Animate progress bar to 80%
      const incrementInterval = setInterval(() => {
        if (this.loadingProgress < 80) {
          this.loadingProgress += 1;
        } else {
          clearInterval(incrementInterval);
        }
      }, 50); // Adjust speed as needed
    },
    rotateLoadingText() {
      // Change loading text periodically
      this.loadingTextInterval = setInterval(() => {
        const randomIndex = Math.floor(
          Math.random() * this.loadingTexts.length
        );
        this.currentLoadingText = this.loadingTexts[randomIndex];
      }, 2000);
    },
    completeLoading() {
      // Clear text rotation
      clearInterval(this.loadingTextInterval);

      // Complete progress bar to 100%
      const finalInterval = setInterval(() => {
        if (this.loadingProgress < 100) {
          this.loadingProgress += 2;
        } else {
          clearInterval(finalInterval);
          // Set final loading text
          this.currentLoadingText = "Analysis complete!";

          // Short delay before showing results
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
      }, 50);
    },
  },
  beforeUnmount() {
    // Clean up intervals if component is destroyed
    clearInterval(this.loadingTextInterval);
  },
};
</script>
