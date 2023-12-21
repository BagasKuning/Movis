import instagram from "./../images/instagram.png";
import facebook from "./../images/facebook.png";
import github from "./../images/github.png";

export default function SideBar() {
  return (
    <div className="z-50 fixed top-1/2 right-0 -translate-y-1/2 flex items-center">
      <div className="z-50 bg-[#2f3335] sm:pr-4 pr-3 sm:pl-3 pl-2 sm:py-5 py-4 flex gap-4 flex-col rounded-tl-xl rounded-bl-xl">
        <a
          href="https://www.instagram.com/d.bagask_/?hl=id"
          alt=""
          target="blank"
          className="w-5 h-5 sm:w-8 sm:h-8 rounded-md"
        >
          <img src={instagram} alt="IG" />
        </a>
        <a
          href="https://www.facebook.com/dwi.bagaskara.9847/"
          alt=""
          target="blank"
          className="w-5 h-5 sm:w-8 sm:h-8 rounded-md"
        >
          <img src={facebook} alt="FB" className="rounded-md"/>
        </a>
        <a
          href="https://github.com/BagasKuning"
          alt=""
          target="blank"
          className="w-5 h-5 sm:w-8 sm:h-8 bg-[#ffffff] rounded-md"
        >
          <img src={github} alt="GITHUB" />
        </a>
      </div>
    </div>
  );
}
