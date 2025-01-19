function SearchHeader() {
    return (
        <div className="relative">
            <input
                type="text"
                className="bg-background pr-6 pl-12 py-1 border-none outline-none ring-blue-500 rounded-md"
                placeholder="Search..."
            />
            <div className="absolute top-[50%] translate-y-[-50%] left-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </div>
        </div>
    );
}

export default SearchHeader;
