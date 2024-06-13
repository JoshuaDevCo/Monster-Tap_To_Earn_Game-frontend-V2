import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CountDate from "../component/CountDate";
import ProgressBar from "../component/ProgressBar";
import { dispatch } from "../store";
import { insertWallet } from "../store/reducers/wallet";
import { TonConnectButton, useTonWallet, useTonAddress } from "@tonconnect/ui-react";
function Home() {
  const address = useTonAddress();
  const wallet = useTonWallet();
  console.log("--------->", wallet?.device, address);
  useEffect(() => {
    if(address){
      dispatch(insertWallet(address))
    }
  },[address])
  const [token, setToken] = useState<number>(2000);
  const [remainedEnergy, setRemainedEnergy] = useState(500);
  function formatNumberWithCommas(number: number, locale = "en-US") {
    return new Intl.NumberFormat(locale).format(number);
  }
  const bodyRef = useRef<HTMLDivElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.random() * (event.clientX - rect.left);
    const y = Math.random() * (event.clientY - rect.top);

    const styleElement = document.createElement("style");
    document.head.appendChild(styleElement);

    styleElement.sheet &&
      styleElement.sheet.insertRule(
        "@keyframes fade-out-top-right {0% {opacity: 1; transform: translateY(0); } 100% {opacity: 0;transform: translateY(-100%);}}",
        0
      );

    const newDiv = document.createElement("div");
    newDiv.textContent = "+1";
    newDiv.style.backgroundImage = "url('image/dollar.png')";
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.style.backgroundPosition = "center";
    newDiv.style.fontSize = "20px";
    newDiv.style.paddingLeft = "30px";
    newDiv.style.display = "flex";
    newDiv.style.justifyContent = "center";
    newDiv.style.alignItems = "center";
    newDiv.style.backgroundSize = "cover";
    newDiv.style.width = "40px";
    newDiv.style.height = "40px";
    newDiv.style.position = "absolute";
    newDiv.style.left = `${x + 50}px`;
    newDiv.style.top = `${y}px`;
    newDiv.style.color = "#58E1E2";
    newDiv.className =
      "dynamic-div animate-fadeouttopright transform max-sm:text-3xl text-5xl font-bold transition not-selectable";

    bodyRef.current && bodyRef.current.appendChild(newDiv);
    const interval = setTimeout(() => newDiv && newDiv.remove(), 1000);

    return () => clearTimeout(interval);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainedEnergy((pre) =>
        pre == 499 ? 500 : pre < 500 ? pre + 1 : 500
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }
    if (remainedEnergy > 0) {
      setRemainedEnergy(remainedEnergy - 1);
      setToken(token + 1);
      handleClick(event);
    }
  };
  const [imgStatus, setImgStatus] = useState(false);
  const handleMouseDown = () => {
    setImgStatus(true);
  };
  const handleMouseLeave = () => {
    setImgStatus(false);
  };
  console.log("imgStatus", imgStatus);

  return (
    <div className="mt-3">
      <ToastContainer />
      <div className="w-full flex justify-center">
        <TonConnectButton />
      </div>

      <CountDate date={3} />
      <div
        id="mainWindow"
        className="relative mt-5 flex flex-col items-center justify-center w-full h-[60vh] mb-9"
      >
        <div className="flex flex-col justify-center items-center mb-7">
          <h3 className="text-xl font-bold text-[#939392]">$GoXP balance</h3>
          <h1 className="text-5xl text-white">
            {formatNumberWithCommas(token)}
          </h1>
        </div>
        <div>
          <img
            src="/image/shape.png"
            alt=""
            className="absolute z-10 left-0 top-[-50px]"
          />
          <div
            className={`relative bg-[url('/image/mikeToken.png')] rounded-full bg-cover z-50 w-[400px] h-[400px] max-sm:w-[280px] max-sm:h-[280px] z-10 ${
              remainedEnergy > 0
                ? "cursor-pointer"
                : "cursor-not-allowed opacity-50"
            } ${imgStatus ? " border-[5px]" : "border-0"}`}
            ref={bodyRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeave}
            onClick={handleTap}
          />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <h3 className="text-2xl mb-2 text-white">
            <span className="text-3xl ">
              <img
                src="/image/icon/lightning.svg"
                alt="lightning"
                className="w-8 h-8 inline"
              />
            </span>
            <span className="text-3xl text-white">{remainedEnergy}</span> /500
          </h3>
          <ProgressBar value={remainedEnergy / 5} />
        </div>
      </div>
    </div>
  );
}

export default Home;
