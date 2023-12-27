export const Label = ({ label, f }: { label: string; f: string }) => (
  <label
    for={f}
    class="text-left block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100"
  >
    {label}
  </label>
);
