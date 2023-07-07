export default function Footer() {
  return (
    <div className="absolute w-full border-t border-gray-600  dark:border-gray-200  py-5 text-center">
      <p className="text-gray-500 dark:text-white">
        A webapp by{" "}
        <a
          className="font-medium text-red-800 underline transition-colors"
          href="https://github.com/lordksix"
          target="_blank"
          rel="noopener noreferrer"
        >
          lordksix
        </a>
      </p>
    </div>
  );
}
