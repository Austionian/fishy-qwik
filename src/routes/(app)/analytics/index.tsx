import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getFetchDetails } from "~/helpers";

type Data = {
  number_of_registered_users: number;
  user_data: UserData[];
  most_liked_fish: string;
  most_liked_fish_id: string;
  fish_like_count: number;
  most_liked_recipe: string;
  most_liked_recipe_id: string;
  recipe_like_count: number;
  number_of_active_users: number;
  number_of_registered_users_in_last_month: number;
};

type UserData = {
  email: string;
  created_at?: string;
  latest_login?: string;
};

export const useGetData = routeLoader$<Data>(async ({ env, cookie, query }) => {
  let user_id = query.get("user_id");
  if (!user_id) {
    user_id = cookie.get("user_id")?.value || "";
  }
  const { apiKey, domain } = getFetchDetails(env);
  const res = await fetch(`${domain}/v1/admin/analytics/`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      cookie: `user_id=${user_id}`,
    },
  });
  cookie.set("user_id", user_id);
  return res.json();
});

export default component$(() => {
  dayjs.extend(relativeTime);
  const data = useGetData();
  return (
    <div>
      <div>
        <main>
          <header>
            <div class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-500/5 dark:bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
              <div>
                <div class="flex items-center gap-x-3">
                  <div class="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
                    <div class="h-2 w-2 rounded-full bg-current"></div>
                  </div>
                  <h1 class="flex gap-x-3 text-base leading-7">
                    <span class="font-semibold text-black dark:text-white">
                      MCW Fish App Analytics
                    </span>
                  </h1>
                </div>
                <p class="mt-2 text-xs leading-6 text-gray-600 dark:text-gray-400">
                  As of{" "}
                  {new Date().toLocaleString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}{" "}
                  UTC
                </p>
              </div>
              <div class="order-first flex-none rounded-full bg-teal-400/10 px-2 py-1 text-xs font-medium text-teal-400 ring-1 ring-inset ring-teal-400/30 sm:order-none">
                Production
              </div>
            </div>

            <div class="grid grid-cols-1 bg-gray-500/5 dark:bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-3">
              <div class="border-t border-black/5 dark:border-white/5 py-6 px-4 sm:px-6 lg:px-8">
                <p class="font-sans text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
                  Registered Users
                </p>
                <p class="mt-2 flex items-baseline gap-x-2">
                  <span class="font-mono text-4xl font-semibold tracking-tight text-black dark:text-white">
                    {data.value.number_of_registered_users}
                  </span>
                </p>
              </div>
              <div class="border-t border-black/5 dark:border-white/5 py-6 px-4 sm:px-6 lg:px-8 sm:border-l">
                <p class="font-sans text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
                  Current Active Users
                </p>
                <p class="mt-2 flex items-baseline gap-x-2">
                  <span class="font-mono text-4xl font-semibold tracking-tight text-black dark:text-white">
                    {data.value.number_of_active_users}
                  </span>
                </p>
              </div>
              <div class="border-t border-black/5 dark:border-white/5 py-6 px-4 sm:px-6 lg:px-8 lg:border-l">
                <p class="font-mono text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
                  New Users in the Last Month
                </p>
                <p class="mt-2 flex items-baseline gap-x-2">
                  <span class="font-mono text-4xl font-semibold tracking-tight text-black dark:text-white">
                    {data.value.number_of_registered_users_in_last_month}
                  </span>
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 bg-gray-500/5 dark:bg-gray-700/10 sm:grid-cols-2">
              <div class="border-t border-black/5 dark:border-white/5 py-6 px-4 sm:px-6 lg:px-8">
                <p class="font-sans text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
                  Most Liked Fish
                </p>
                <a href={`/fish/type/${data.value.most_liked_fish_id}`}>
                  <p class="mt-2 flex items-baseline gap-x-2">
                    <span class="font-mono text-4xl font-semibold tracking-tight text-black dark:text-white hover:text-teal-400">
                      {data.value.most_liked_fish}{" "}
                      <span class="text-gray-500">
                        ({data.value.fish_like_count})
                      </span>
                    </span>
                  </p>
                </a>
              </div>
              <div class="border-t border-black/5 dark:border-white/5 py-6 px-4 sm:px-6 lg:px-8 sm:border-l">
                <p class="font-sans text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
                  Most Liked Recipe
                </p>
                <a href={`/recipe/${data.value.most_liked_recipe_id}`}>
                  <p class="mt-2 flex items-baseline gap-x-2">
                    <span class="font-mono text-4xl font-semibold tracking-tight text-black dark:text-white hover:text-teal-400">
                      {data.value.most_liked_recipe}
                      <span class="text-gray-500">
                        ({data.value.recipe_like_count})
                      </span>
                    </span>
                  </p>
                </a>
              </div>
            </div>
          </header>

          <div class="border-t border-black/10 dark:border-white/10 pt-11 overflow-x-auto">
            <h2 class="font-sans px-4 text-base font-semibold leading-7 text-black dark:text-white sm:px-6 lg:px-8">
              Users
            </h2>
            <table class="mt-6 w-full whitespace-nowrap text-left">
              <colgroup>
                <col class="w-full sm:w-4/12" />
                <col class="lg:w-4/12" />
                <col class="lg:w-2/12" />
                <col class="lg:w-1/12" />
                <col class="lg:w-1/12" />
              </colgroup>
              <thead class="border-b boder-black/10 dark:border-white/10 text-sm leading-6 text-black dark:text-white">
                <tr>
                  <th
                    scope="col"
                    class="font-sans py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    class="font-mono py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    class="font-mono hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20"
                  >
                    Registered
                  </th>
                  <th
                    scope="col"
                    class="font-mono hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8"
                  >
                    Latest Login
                  </th>
                </tr>
              </thead>
              <tbody class="font-mono divide-y divide-black/5 dark:divide-white/5">
                {data.value.user_data.map((user) => {
                  return (
                    <tr key={user.email}>
                      <td class="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                        <div class="flex items-center gap-x-4">
                          <div class="truncate text-sm font-medium leading-6 text-black dark:text-white">
                            {user.email}
                          </div>
                        </div>
                      </td>
                      <td class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                        <div class="flex items-center justify-end gap-x-2 sm:justify-start">
                          <time
                            class="text-gray-400 sm:hidden"
                            dateTime="2023-01-23T11:00"
                          >
                            {dayjs(user.latest_login).fromNow()}
                          </time>
                          {dayjs(user.latest_login).diff(
                            new Date(),
                            "d",
                            true,
                          ) >= -14 ? (
                            <>
                              <div class="flex-none rounded-full p-1 text-green-400 bg-green-400/10">
                                <div class="h-1.5 w-1.5 rounded-full bg-current"></div>
                              </div>
                              <div class="hidden text-black dark:text-white sm:block">
                                Active
                              </div>
                            </>
                          ) : (
                            <>
                              <div class="flex-none rounded-full p-1 text-yellow-400 bg-yellow-400/10">
                                <div class="h-1.5 w-1.5 rounded-full bg-current"></div>
                              </div>
                              <div class="hidden text-black dark:text-white sm:block">
                                Inactive
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                      <td class="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-600 dark:text-gray-400 md:table-cell lg:pr-20">
                        {dayjs(user.created_at).format("MMM D, YYYY")}
                      </td>
                      <td class="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-600 dark:text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                        <time dateTime="2023-01-23T11:00">
                          {dayjs(user.latest_login).fromNow()}
                        </time>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {data.value.number_of_registered_users > 10 && (
              <div class="p-4 flex justify-center self-center">
                ... and {data.value.number_of_registered_users - 10} more
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Fishy Analytics",
  meta: [
    {
      name: "description",
      content: "An analytics dashboard for the MCW fish app.",
    },
  ],
};
