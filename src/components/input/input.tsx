export const Input = ({ label, alt }: { label: string; alt?: string }) => (
  <input
    id={label}
    name={label}
    type={alt ? alt : label}
    autoComplete={alt ? alt : label}
    required
    class="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
  />
);
