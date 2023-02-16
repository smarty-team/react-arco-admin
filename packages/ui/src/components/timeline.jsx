export default function TimeLine() {
  return (
    <ul class="bg-gray-50 rounded-3xl p-2 sm:p-5 xl:p-6">
      <li>
        <article>
          <a
            href="https://blog.tailwindcss.com/tailwindcss-2-2"
            class="grid md:grid-cols-8 xl:grid-cols-9 items-start relative rounded-xl p-3 sm:p-5 xl:p-6 overflow-hidden hover:bg-white"
          >
            <h3 class="font-semibold text-gray-900 md:col-start-3 md:col-span-6 xl:col-start-3 xl:col-span-7 mb-1 ml-9 md:ml-0">
              Tailwind CSS v2.2
            </h3>
            <time
              datetime="2021-06-17T19:00:00.000Z"
              class="md:col-start-1 md:col-span-2 row-start-1 md:row-end-3 flex items-center font-medium mb-1 md:mb-0"
            >
              <svg
                viewBox="0 0 12 12"
                class="w-3 h-3 mr-6 overflow-visible text-cyan-400"
              >
                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                <circle
                  cx="6"
                  cy="6"
                  r="11"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                ></circle>
                <path
                  d="M 6 18 V 500"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  class="text-gray-200"
                ></path>
              </svg>
              Jun 18, 2021
            </time>
            <p class="md:col-start-3 md:col-span-6 xl:col-span-7 ml-9 md:ml-0">
              Over the last few weeks, we've been having a ton of fun dumping
              new and exciting features into Tailwind. Now feels like the right
              time to cut a release, so here it is — Tailwind CSS v2.2! We've
              built-in a new high-performance CLI tool, added before and after
              pseudo-element support, introduced new sibling selector variants,
              the ability to style highlighted text, and tons more.
            </p>
          </a>
        </article>
      </li>
      <li>
        <article>
          <a
            href="https://blog.tailwindcss.com/tailwindcss-2-1"
            class="grid md:grid-cols-8 xl:grid-cols-9 items-start relative rounded-xl p-3 sm:p-5 xl:p-6 overflow-hidden hover:bg-white"
          >
            <h3 class="font-semibold text-gray-900 md:col-start-3 md:col-span-6 xl:col-start-3 xl:col-span-7 mb-1 ml-9 md:ml-0">
              Tailwind CSS v2.1
            </h3>
            <time
              datetime="2021-04-05T19:00:00.000Z"
              class="md:col-start-1 md:col-span-2 row-start-1 md:row-end-3 flex items-center font-medium mb-1 md:mb-0"
            >
              <svg
                viewBox="0 0 12 12"
                class="w-3 h-3 mr-6 overflow-visible text-gray-300"
              >
                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                <path
                  d="M 6 -6 V -30"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  class="text-gray-200"
                ></path>
                <path
                  d="M 6 18 V 500"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  class="text-gray-200"
                ></path>
              </svg>
              Apr 6, 2021
            </time>
            <p class="md:col-start-3 md:col-span-6 xl:col-span-7 ml-9 md:ml-0">
              We just released Tailwind CSS v2.1 which brings the new JIT engine
              to core, adds first-class CSS filter support, and more!
            </p>
          </a>
        </article>
      </li>
      <li>
        <article>
          <a
            href="https://blog.tailwindcss.com/just-in-time-the-next-generation-of-tailwind-css"
            class="grid md:grid-cols-8 xl:grid-cols-9 items-start relative rounded-xl p-3 sm:p-5 xl:p-6 overflow-hidden hover:bg-white"
          >
            <h3 class="font-semibold text-gray-900 md:col-start-3 md:col-span-6 xl:col-start-3 xl:col-span-7 mb-1 ml-9 md:ml-0">
              Just-In-Time: The Next Generation of Tailwind CSS
            </h3>
            <time
              datetime="2021-03-15T16:30:00.000Z"
              class="md:col-start-1 md:col-span-2 row-start-1 md:row-end-3 flex items-center font-medium mb-1 md:mb-0"
            >
              <svg
                viewBox="0 0 12 12"
                class="w-3 h-3 mr-6 overflow-visible text-gray-300"
              >
                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                <path
                  d="M 6 -6 V -30"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  class="text-gray-200"
                ></path>
                <path
                  d="M 6 18 V 500"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  class="text-gray-200"
                ></path>
              </svg>
              Mar 16, 2021
            </time>
            <p class="md:col-start-3 md:col-span-6 xl:col-span-7 ml-9 md:ml-0">
              One of the hardest constraints we've had to deal with as we've
              improved Tailwind CSS over the years is the generated file size in
              development. With enough customizations to your config file, the
              generated CSS can reach 10mb or more, and there's only so much CSS
              that build tools and even the browser itself will comfortably
              tolerate.
            </p>
          </a>
        </article>
      </li>
      <li>
        <article>
          <a
            href="https://blog.tailwindcss.com/welcoming-james-mcdonald-to-tailwind-labs"
            class="grid md:grid-cols-8 xl:grid-cols-9 items-start relative rounded-xl p-3 sm:p-5 xl:p-6 overflow-hidden hover:bg-white"
          >
            <h3 class="font-semibold text-gray-900 md:col-start-3 md:col-span-6 xl:col-start-3 xl:col-span-7 mb-1 ml-9 md:ml-0">
              Welcoming James McDonald to Tailwind Labs
            </h3>
            <time
              datetime="2021-03-08T19:00:00.0Z"
              class="md:col-start-1 md:col-span-2 row-start-1 md:row-end-3 flex items-center font-medium mb-1 md:mb-0"
            >
              <svg
                viewBox="0 0 12 12"
                class="w-3 h-3 mr-6 overflow-visible text-gray-300"
              >
                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                <path
                  d="M 6 -6 V -30"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  class="text-gray-200"
                ></path>
                <path
                  d="M 6 18 V 500"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  class="text-gray-200"
                ></path>
              </svg>
              Mar 9, 2021
            </time>
            <p class="md:col-start-3 md:col-span-6 xl:col-span-7 ml-9 md:ml-0">
              Many years ago I got a message from Steve that said something like
              "Have I ever shared this guy's Dribbble profile with you before?
              Been following him forever, some of my absolute favorite work I've
              ever found." That person was James McDonald, and today we're
              totally over the moon to share that James is joining our team
              full-time.
            </p>
          </a>
        </article>
      </li>
      <li>
        <article>
          <a
            href="https://blog.tailwindcss.com/tailwindcss-from-zero-to-production"
            class="grid md:grid-cols-8 xl:grid-cols-9 items-start relative rounded-xl p-3 sm:p-5 xl:p-6 overflow-hidden hover:bg-white"
          >
            <h3 class="font-semibold text-gray-900 md:col-start-3 md:col-span-6 xl:col-start-3 xl:col-span-7 mb-1 ml-9 md:ml-0">
              "Tailwind CSS: From Zero to Production" on YouTube
            </h3>
            <time
              datetime="2021-02-16T16:05:00.000Z"
              class="md:col-start-1 md:col-span-2 row-start-1 md:row-end-3 flex items-center font-medium mb-1 md:mb-0"
            >
              <svg
                viewBox="0 0 12 12"
                class="w-3 h-3 mr-6 overflow-visible text-gray-300"
              >
                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                <path
                  d="M 6 -6 V -30"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  class="text-gray-200"
                ></path>
                <path
                  d="M 6 18 V 500"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  class="text-gray-200"
                ></path>
              </svg>
              Feb 17, 2021
            </time>
            <p class="md:col-start-3 md:col-span-6 xl:col-span-7 ml-9 md:ml-0">
              Today we're excited to release Tailwind CSS: From Zero to
              Production, a new screencast series that teaches you everything
              you need to know to get up and running with Tailwind CSS v2.0 from
              scratch.
            </p>
          </a>
        </article>
      </li>
      <li>
        <article>
          <a
            href="https://blog.tailwindcss.com/welcoming-david-luhr-to-tailwind-labs"
            class="grid md:grid-cols-8 xl:grid-cols-9 items-start relative rounded-xl p-3 sm:p-5 xl:p-6 overflow-hidden hover:bg-white"
          >
            <h3 class="font-semibold text-gray-900 md:col-start-3 md:col-span-6 xl:col-start-3 xl:col-span-7 mb-1 ml-9 md:ml-0">
              Welcoming David Luhr to Tailwind Labs
            </h3>
            <time
              datetime="2021-02-01T13:35:00.0Z"
              class="md:col-start-1 md:col-span-2 row-start-1 md:row-end-3 flex items-center font-medium mb-1 md:mb-0"
            >
              <svg
                viewBox="0 0 12 12"
                class="w-3 h-3 mr-6 overflow-visible text-gray-300"
              >
                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                <path
                  d="M 6 -6 V -30"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  class="text-gray-200"
                ></path>
                <path
                  d="M 6 18 V 500"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  class="text-gray-200"
                ></path>
              </svg>
              Feb 1, 2021
            </time>
            <p class="md:col-start-3 md:col-span-6 xl:col-span-7 ml-9 md:ml-0">
              We started working with David Luhr last summer on a
              project-by-project basis to help us develop a Figma version of
              Tailwind UI (almost ready!), as well as to leverage his
              accessibility expertise when building Tailwind UI templates,
              ensuring we were following best practices and delivering markup
              that would work for everyone, no matter what tools they use to
              browse the web. Today we're excited to share that David has joined
              the team full-time!
            </p>
          </a>
        </article>
      </li>
      <li>
        <article>
          <a
            href="https://blog.tailwindcss.com/multi-line-truncation-with-tailwindcss-line-clamp"
            class="grid md:grid-cols-8 xl:grid-cols-9 items-start relative rounded-xl p-3 sm:p-5 xl:p-6 overflow-hidden hover:bg-white"
          >
            <h3 class="font-semibold text-gray-900 md:col-start-3 md:col-span-6 xl:col-start-3 xl:col-span-7 mb-1 ml-9 md:ml-0">
              Multi-line truncation with @tailwindcss/line-clamp
            </h3>
            <time
              datetime="2021-01-24T20:00:00Z"
              class="md:col-start-1 md:col-span-2 row-start-1 md:row-end-3 flex items-center font-medium mb-1 md:mb-0"
            >
              <svg
                viewBox="0 0 12 12"
                class="w-3 h-3 mr-6 overflow-visible text-gray-300"
              >
                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                <path
                  d="M 6 -6 V -30"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  class="text-gray-200"
                ></path>
                <path
                  d="M 6 18 V 500"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  class="text-gray-200"
                ></path>
              </svg>
              Jan 25, 2021
            </time>
            <p class="md:col-start-3 md:col-span-6 xl:col-span-7 ml-9 md:ml-0">
              Imagine you're implementing a beautiful design you or someone on
              your team carefully crafted in Figma. You've nailed all the
              different layouts at each breakpoint, perfected the whitespace and
              typography, and the photography you're using is really bringing
              the design to life.
            </p>
          </a>
        </article>
      </li>
      <li>
        <article>
          <a
            href="https://blog.tailwindcss.com/tailwindcss-v2"
            class="grid md:grid-cols-8 xl:grid-cols-9 items-start relative rounded-xl p-3 sm:p-5 xl:p-6 overflow-hidden hover:bg-white"
          >
            <h3 class="font-semibold text-gray-900 md:col-start-3 md:col-span-6 xl:col-start-3 xl:col-span-7 mb-1 ml-9 md:ml-0">
              Tailwind CSS v2.0
            </h3>
            <time
              datetime="2020-11-18T17:45:00.000Z"
              class="md:col-start-1 md:col-span-2 row-start-1 md:row-end-3 flex items-center font-medium mb-1 md:mb-0"
            >
              <svg
                viewBox="0 0 12 12"
                class="w-3 h-3 mr-6 overflow-visible text-gray-300"
              >
                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                <path
                  d="M 6 -6 V -30"
                  fill="none"
                  stroke-width="2"
                  stroke="currentColor"
                  class="text-gray-200"
                ></path>
              </svg>
              Nov 19, 2020
            </time>
            <p class="md:col-start-3 md:col-span-6 xl:col-span-7 ml-9 md:ml-0">
              Today we're finally releasing Tailwind CSS v2.0, including an
              all-new color palette, dark mode support, and tons more!
            </p>
          </a>
        </article>
      </li>
    </ul>
  );
}
