export default function TimeLine() {
  return (
    <ul className="bg-gray-50 rounded-3xl p-2 sm:p-5 xl:p-6">
      <li>
        <article>
          <a
            href="https://blog.tailwindcss.com/tailwindcss-2-2"
            className="grid md:grid-cols-8 xl:grid-cols-9 items-start relative rounded-xl p-3 sm:p-5 xl:p-6 overflow-hidden hover:bg-white"
          >
            <h3 className="font-semibold text-gray-900 md:col-start-3 md:col-span-6 xl:col-start-3 xl:col-span-7 mb-1 ml-9 md:ml-0">
              平台alpha版上线
            </h3>
            <time
              dateTime="2021-06-17T19:00:00.000Z"
              className="md:col-start-1 md:col-span-2 row-start-1 md:row-end-3 flex items-center font-medium mb-1 md:mb-0"
            >
              <svg
                viewBox="0 0 12 12"
                className="w-3 h-3 mr-6 overflow-visible text-cyan-400"
              >
                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                <circle
                  cx="6"
                  cy="6"
                  r="11"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                ></circle>
                <path
                  d="M 6 18 V 500"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="text-gray-200"
                ></path>
              </svg>
              Mar 5, 2023
            </time>
            <p className="md:col-start-3 md:col-span-6 xl:col-span-7 ml-9 md:ml-0">
              前端大班车平台alpha版上线
            </p>
          </a>
        </article>
      </li>
      <li>
        <article>
          <a
            href="https://blog.tailwindcss.com/tailwindcss-v2"
            className="grid md:grid-cols-8 xl:grid-cols-9 items-start relative rounded-xl p-3 sm:p-5 xl:p-6 overflow-hidden hover:bg-white"
          >
            <h3 className="font-semibold text-gray-900 md:col-start-3 md:col-span-6 xl:col-start-3 xl:col-span-7 mb-1 ml-9 md:ml-0">
              立项
            </h3>
            <time
              dateTime="2020-11-18T17:45:00.000Z"
              className="md:col-start-1 md:col-span-2 row-start-1 md:row-end-3 flex items-center font-medium mb-1 md:mb-0"
            >
              <svg
                viewBox="0 0 12 12"
                className="w-3 h-3 mr-6 overflow-visible text-gray-300"
              >
                <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                <path
                  d="M 6 -6 V -30"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="text-gray-200"
                ></path>
              </svg>
              Nov 19, 2022
            </time>
            <p className="md:col-start-3 md:col-span-6 xl:col-span-7 ml-9 md:ml-0">
              使用NuxtJS技术构建新一代内容交付平台
            </p>
          </a>
        </article>
      </li>
    </ul>
  );
}
