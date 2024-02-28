export function Switch() {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input type="checkbox" className="peer sr-only" />
      <div className="peer-checked:bg-secondary-500 peer-checked:after:bg-secondary-40 peer relative h-6 w-11 rounded-full bg-gray-500 after:absolute after:start-[4px] after:top-[4px] after:h-4 after:w-4 after:rounded-full after:bg-gray-600 after:transition-all after:duration-300 after:content-[''] peer-checked:after:translate-x-5"></div>
    </label>
  );
}
