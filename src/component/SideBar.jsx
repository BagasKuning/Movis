import instagram from "./../images/instagram.png"
import facebook from "./../images/facebook.png"
import github from "./../images/github.png"

export default function SideBar() {
  return (
    <div className="fixed top-0 z-50 h-screen w-screen flex justify-end items-center">
      <div className="bg-[#2f3335] pr-[22px] pl-3 py-5 flex gap-4 flex-col rounded-tl-xl rounded-bl-xl">
        <a href="https://www.instagram.com/d.bagask_/?hl=id" alt="" className="w-8 h-8 rounded-md" >
            <img src={instagram} alt="" />
        </a>
        <a href="https://www.facebook.com/dwi.bagaskara.9847/" alt="" className="w-8 h-8 rounded-md" >
            <img src={facebook} alt="" />
        </a>
        <a href="https://github.com/BagasKuning" alt="" className="w-8 h-8 bg-[#ffffff] rounded-md" >
            <img src={github} alt="" />
        </a>
      </div>
    </div>
  );
}
