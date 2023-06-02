import {
  createContextId,
  useContext,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

interface Theme {
  theme: string;
}

export const ThemeContext = createContextId<Theme>("theme");

export const useThemeProvider = () => {
  const store = useStore<{ theme: string }>({
    theme: "",
  });

  useContextProvider(ThemeContext, store);

  useVisibleTask$(({ track }) => {
    const change = track(() => store.theme);

    /**
     * We set theme to an '' when initialized, make sure we grab the actual
     * value
     */
    if (!store.theme) {
      store.theme = localStorage.theme || "dark";
    }

    /**
     * Ignore non-initialized value
     */
    if (!change) return;

    /**
     * Make sure we are only updating the html class if we have to to avoid
     * uneccesary paint calls
     */
    if (document.documentElement.className !== change) {
      document.documentElement.className = change;
    }

    /**
     * Update our local storage if a change has occurred
     */
    localStorage.theme = change;
  });
};

export const useTheme = () => useContext(ThemeContext);
