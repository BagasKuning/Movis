export default function Footer() {
  return (
    <div className="max-w-[1500px] bg-[#0f2531] flex justify-between mx-5 2xl:mx-auto h-20 rounded-tl-xl rounded-tr-xl pl-7 pr-10 pt-5 pb-24">
      <div className="flex-1">
        <p className="text-[#ffffff80] sm:text-sm text-xs">
          Data Source:
        </p>
        <h1>
          <a
            href="https://developer.themoviedb.org/docs/getting-started"
            className="pl-1 sm:text-3xl text-xl font-bold italic" style={{textShadow: "black 1px 3.5px 10px"}}
          >
            TMDB API
          </a>
        </h1>
      </div>
      <div className="flex-1 flex justify-end">
        <div>
        <a href="https://github.com/BagasKuning/Movis">
            <svg xmlns="http://www.w3.org/2000/svg" className="sm:w-10 sm:h-10 w-7 h-7" fill="currentColor" class="bi bi-file-earmark-code-fill" viewBox="0 0 16 16">
                <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M6.646 7.646a.5.5 0 1 1 .708.708L5.707 10l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708zm2.708 0 2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 10 8.646 8.354a.5.5 0 1 1 .708-.708"/>
            </svg>
        </a>
        <p className="text-sm sm:text-base text-[#ffffff20]">Code</p>
        </div>
      </div>
    </div>
  );
}
