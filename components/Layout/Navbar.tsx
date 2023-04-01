import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <div className="flex h-[50px] sm:h-[60px] border-b border-neutral-300 py-2 px-2 sm:px-8 items-center justify-between">
      <div className="font-bold text-3xl flex items-center">
          <img className="ml-2 w-10 h-10 rounded-full mx-auto" src="/wb_head.jpg" alt="" width="10" height="10">
          </img>
          <a
          className="ml-2 hover:opacity-50"
          href="https://openai-ui-taupe.vercel.app/"
        >
          Warren Buffett Is Here
        </a>
      </div>
    </div>
  );
};
