import { CalendarDaysIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default function BlogsPage() {
  return (
    <section>
      <h1 className="text-7xl font-extrabold text-center m-10">My blogs</h1>
      <div className="relative">
        <input
          aria-label="Search blogs"
          type="text"
          name=""
          id=""
          placeholder="Search here"
          className="w-full bg-transparent text-gray-100 border border-gray-300 rounded-lg transition-all duration-300 py-2 px-10 mb-8 focus:outline-none focus:border-blue-300 focus:ring-2"
        />
        <SearchIcon className="absolute left-3 top-2" />
      </div>
      <ul className="flex flex-col gap-y-4">
        <BlogTile />
      </ul>
    </section>
  );
}

const BlogTile = () => {
  return (
    <li className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-gray-400 transition-colors duration-300">
      <Link href={""}>
        <div className="flex items-center gap-x-3">
          <CalendarDaysIcon size={20} />
          <span>Dec 10, 2024</span>
        </div>
        <h2 className="text-xl font-bold my-3">Here is my first blog</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec
          eleifend nulla. In vehicula purus et velit volutpat, vitae pretium est
          mollis. Etiam consequat ante sit amet leo mattis, id aliquet eros
          semper.
        </p>
      </Link>
    </li>
  );
};
