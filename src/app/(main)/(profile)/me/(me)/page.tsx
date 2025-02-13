const Page = () => {
  return (
    <div className="">
      {/* TextPostt */}
      <div className="mt-4 w-[680px] h-32 flex flex-col border border-b rounded-2xl p-4 bg-card">
        <input
          type="text"
          className="w-full h-12 border border-gray-300 rounded-xl px-4  text-sm"
          placeholder="What do you think?"
        />
        <div className="flex items-center justify-between mt-4 ">
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-950 font-semibold rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 "
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-neutral-900">Image</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-950 font-semibold rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
              </svg>
              <span className="text-sm text-neutral-900">Video</span>
            </button>
          </div>
          <button className="px-6 py-2 bg-slate-100 text text-sm rounded-lg">
            Post
          </button>
        </div>
      </div>
      {/* TextPostt */}
      {/* posts */}
      <div className="h-[400px] mt-4 border border-b rounded-2xl bg-card"></div>

      {/* posts */}
    </div>
  );
};

export default Page;
