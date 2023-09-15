import { MiniLink } from "./links";

const InlineLink = (miniLink: MiniLink) => {
  return (
    <a
      className="border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 rounded p-1 text-sm inline-flex items-center leading-4 text-neutral-900 dark:text-neutral-100 no-underline"
      href={miniLink.url}
      target="_blank"
    >
      {miniLink.text}
    </a>
  );
};

export default InlineLink;
