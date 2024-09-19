export default function Custom404() {
  return (
    <main className="grid min-h-[90vh] place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-tan">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-cta-text sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-pear px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm bg-opacity-100 hover:bg-light-green-500 hover:bg-opacity-50 transition duration-300 ease-in-out focus-visible:outline-none ring-0 focus:ring-4 focus:ring-light-green-500"
          >
            Go back home
          </a>

          {/* <a href="#" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </div>
    </main>
  );
}
