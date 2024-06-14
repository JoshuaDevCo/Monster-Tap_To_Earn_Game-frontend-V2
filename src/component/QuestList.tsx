import { useEffect, useState } from "react";
import { dispatch, useSelector } from "../store";
import { updateBalance, addFriend } from "../store/reducers/wallet";
export default function QuestList() {
  const user_id_state = useSelector((state) => state.wallet.user?.user_id);
  const balance_state = useSelector((state) => state.wallet.user?.balance);
  const [user_id, setUser_Id] = useState<string>(user_id_state);
  const [balance, setBalance] = useState<number>(balance_state);
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    setUser_Id(user_id_state);
    setBalance(balance_state);
  }, [user_id_state, balance_state]);
  const handleInvite = () => {
    dispatch(addFriend("394867234", username)).then(() => {
      dispatch(updateBalance(user_id, balance + 200));
    });
  };
  return (
    <div className="max-h-[75vh] max-sm:max-h-[75vh] overflow-auto">
      <div className="flex items-center h-36 max-sm:h-24 justify-between px-3 py-2 my-4 bg-[#363636] rounded-lg">
        <div className="flex justify-start items-center">
          <img src="image/bonus.png" alt="" className=" w-14 h-14" />
          <div className=" flex flex-col justify-center items-center">
            <div className="flex justify-start items-start text-white font-bold">
              Invite a friend
            </div>
            <div className="flex justify-start ml-2">
              <img src="image/dollar.png" alt="" className=" w-5 h-5" />
              <span className=" text-amber-400">+200</span>
              <span>&nbsp;&nbsp;&nbsp;for you and your friend</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center h-36 max-sm:h-24 justify-between px-3 py-2 my-4 bg-[#363636] rounded-lg">
        <div className="flex justify-start items-center">
          <img src="image/bonus.png" alt="" className=" w-14 h-14" />
          <div className=" flex flex-col justify-center items-center">
            <div className="flex justify-start items-start text-white font-bold">
              Invite a friend with Telegram premium
            </div>
            <div className="flex justify-start ml-2">
              <img src="image/dollar.png" alt="" className=" w-5 h-5" />
              <span className=" text-amber-400">+500</span>
              <span>&nbsp;&nbsp;&nbsp;for you and your friend</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start">
        <h2 className="text-white text-sm">List of your friends</h2>
        <div className=" rounded-[20px] bg-[#525252] w-full h-16 flex justify-center items-center">
          <input
            type="text"
            placeholder="You haven't invited anyone yet"
            className=" border-none bg-[#525252] text-sm w-[100%] mx-9 focus:border-none"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full h-24 bg-indigo-600 text-white rounded-[20px] flex justify-center items-center mt-8 hover:bg-indigo-400" onClick={handleInvite}>
        <span className="flex justify-center items-center">
          Invite a friend
        </span>
        <img src="image/user.png" alt="" className=" w-4 h-4 bg-white" />
      </div>
    </div>
  );
}
