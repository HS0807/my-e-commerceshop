import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function NotFound() {
  return (
    <section className="grid place-items-center bg-[#f8f7f4] px-5 py-16 sm:px-8">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-6xl text-[#8f1d2c] sm:text-7xl">
          404
        </h1>
        <p className="mb-3 text-xs font-semibold tracking-[0.24em] text-[#8f1d2c]">
          LOST IN THE COLLECTION
        </p>
        <h1 className="text-3xl font-serif text-[#171717] sm:text-5xl">
          This page is no longer in season.
        </h1>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#8f1d2c] px-6 text-sm font-medium text-white hover:bg-[#631c25]">
            <FaArrowLeft /> Back to home </Link>
        </div>
      </div>
    </section>

  );
}
