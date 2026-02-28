export function SearchInput({
  placeholder,
  onInput,
}: {
  placeholder: string;
  onInput: (value: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      class="w-full bg-input border border-border rounded-lg text-text text-[11px] px-3 py-[5px] outline-none box-border transition-shadow duration-150"
      onInput={(e: InputEvent) => {
        onInput((e.target as HTMLInputElement).value);
      }}
    />
  );
}
