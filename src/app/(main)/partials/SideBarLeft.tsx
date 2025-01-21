const SideBarLeft = () => {
    return (
        <>
            <div className="">
                <div className="flex w-full h-[48px] gap-5 pl-2 items-center rounded-md my-1 duration-200 hover:bg-primary-500">
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-secondary-500"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h11l5 5v11q0 .825-.587 1.413T19 21zm2-4h10v-2H7zm0-4h10v-2H7zm8-4h4l-4-4zM7 9h5V7H7z"
                            />
                        </svg>
                    </div>
                    <p className="font-semibold text-base">Bảng tin</p>
                </div>

                <div className="flex w-full h-[48px] gap-5 pl-2 items-center rounded-md my-1 hover:bg-primary-500 duration-200">
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1m0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1m0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1m-8-5a3 3 0 1 1 6 0a3 3 0 0 1-6 0m1.942 4a3 3 0 0 0-2.847 2.051l-.044.133l-.004.012c-.042.126-.055.167-.042.195c.006.013.02.023.038.039c.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415a.7.7 0 0 1 .146-.155c.019-.016.031-.026.038-.04c.014-.027 0-.068-.042-.194l-.004-.012l-.044-.133A3 3 0 0 0 10.059 14z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <p className="font-semibold text-base">Hồ sơ</p>
                </div>
                <div className="flex w-full h-[48px] gap-5 pl-2 items-center rounded-md my-1 hover:bg-primary-500 duration-200">
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 640 512"
                        >
                            <path
                                fill="currentColor"
                                d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32S80 82.1 80 144s50.1 112 112 112m76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2M480 256c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96s43 96 96 96m48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4c24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48c0-61.9-50.1-112-112-112"
                            />
                        </svg>
                    </div>
                    <p className="font-semibold text-base">Bạn bè</p>
                </div>
                <div className="flex w-full h-[48px] gap-5 pl-2 items-center rounded-md my-1 hover:bg-primary-500 duration-200">
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-4.724l-4.762 2.857a1 1 0 0 1-1.508-.743L7 21v-2H6a4 4 0 0 1-3.995-3.8L2 15V7a4 4 0 0 1 4-4zm-4 9H8a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2m2-4H8a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2"
                            />
                        </svg>
                    </div>
                    <p className="font-semibold text-base">Bảng tin</p>
                </div>
            </div>

            <div className="py-2">
                <hr className="" />
            </div>

            <div className="">
                <p className="text-base text-gray-900">Resource</p>
                <div className="flex w-full h-[48px] gap-5 pl-2 items-center rounded-md my-1 hover:bg-primary-500 duration-200">
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M256 42.667c117.822 0 213.334 95.512 213.334 213.333c0 117.82-95.512 213.334-213.334 213.334c-117.82 0-213.333-95.513-213.333-213.334S138.18 42.667 256 42.667m21.38 192h-42.666v128h42.666zM256.217 144c-15.554 0-26.837 11.22-26.837 26.371c0 15.764 10.986 26.963 26.837 26.963c15.235 0 26.497-11.2 26.497-26.667c0-15.446-11.262-26.667-26.497-26.667"
                            />
                        </svg>
                    </div>
                    <p className="font-semibold text-base">Giới thiệu</p>
                </div>
                <div className="flex w-full h-[48px] gap-5 pl-2 items-center rounded-md my-1 hover:bg-primary-500 duration-200">
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"
                            />
                        </svg>
                    </div>
                    <p className="font-semibold text-base">Quyền riêng tư</p>
                </div>
                <div className="flex w-full h-[48px] gap-5 pl-2 items-center rounded-md my-1 hover:bg-primary-500 duration-200">
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fill="currentColor"
                                d="M11.95 18q.525 0 .888-.363t.362-.887t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362m-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.312.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825M12 22q-2.075 0-3.9-.787t-3.175-2.138T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                            />
                        </svg>
                    </div>
                    <p className="font-semibold text-base">Hỗ trợ</p>
                </div>
            </div>

            <div className="py-2">
                <hr className="" />
            </div>

            <div className="">
                <p className="text-base text-gray-900">Recomend for you</p>
                <div className="flex w-full h-[48px] gap-5 pl-2 items-center rounded-md my-1 hover:bg-primary-500 duration-200">
                    <p className="font-semibold text-base">#React</p>
                </div>
                <div className="flex w-full h-[48px] gap-5 pl-2 items-center rounded-md my-1 hover:bg-primary-500 duration-200">
                    <p className="font-semibold text-base">#TypeScript</p>
                </div>
                <div className="flex w-full h-[48px] gap-5 pl-2 items-center rounded-md my-1 hover:bg-primary-500 duration-200">
                    <p className="font-semibold text-base">#JavaScript</p>
                </div>
            </div>
        </>
    );
};

export default SideBarLeft;
