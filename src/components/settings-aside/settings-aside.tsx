import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import settingsValues from "~/constants/settingsValues";

export default component$(() => {
  const location = useLocation();
  const loc = location.url.pathname.split("/");
  let active = loc[loc.length - 2];
  if (active === "settings") {
    active = "profile";
  }
  return (
    <aside class="py-6 lg:col-span-3">
      <nav class="space-y-1">
        {settingsValues.map((setting, i) => {
          if (setting.title.toLowerCase() === active) {
            return (
              <a
                href={setting.link}
                class="border-teal-500 bg-teal-50 text-teal-700 dark:bg-white/10 dark:text-teal-500 flex items-center border-l-4 px-3 py-2 text-sm font-medium cursor-default"
                aria-current="page"
                key={i}
              >
                <span dangerouslySetInnerHTML={setting.activeIcon} />
                <span class="truncate">{setting.title}</span>
              </a>
            );
          }
          return (
            <a
              href={setting.link}
              class="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-gray-100 group flex items-center border-l-4 px-3 py-2 text-sm font-medium"
              aria-current="page"
              key={i}
            >
              <span dangerouslySetInnerHTML={setting.icon} />
              <span class="truncate">{setting.title}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
});
