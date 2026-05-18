import { useState } from "react";
import InputBox from "./inputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState("");

  const currencyInfo = useCurrencyInfo(from) || {};
  const options = Object.keys(currencyInfo);

  const convert = () => {
    if (!currencyInfo[to]) return;
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-black text-white overflow-hidden relative">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-yellow-500/20 blur-[180px] top-[-200px] left-[-200px]" />
      <div className="absolute w-[500px] h-[500px] bg-red-600/20 blur-[200px] bottom-[-200px] right-[-200px]" />

      {/* ================= LEFT PANEL ================= */}
      <div className="relative z-10 flex flex-col justify-center px-6 md:px-16 py-10 border-r border-white/10">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-widest text-yellow-400">
            EXCHANGE
          </h1>
          <p className="text-white/50 text-sm mt-2">
            premium currency converter
          </p>
        </div>

        {/* FROM */}
        <InputBox
          label="FROM"
          amount={amount}
          currencyOptions={options}
          selectCurrency={from}
          onAmountChange={setAmount}
          onCurrencyChange={setFrom}
        />

        {/* SWAP BUTTON */}
        <div className="flex justify-center my-5">
          <button
            onClick={swap}
            className="w-12 h-12 rounded-full bg-yellow-500 text-black font-bold shadow-lg hover:scale-110 transition"
          >
            ⇅
          </button>
        </div>

        {/* TO */}
        <InputBox
          label="TO"
          amount={convertedAmount}
          currencyOptions={options}
          selectCurrency={to}
          amountDisable
          onCurrencyChange={setTo}
        />

        {/* CONVERT BUTTON */}
        <button
          onClick={convert}
          className="mt-8 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:scale-[1.02] transition"
        >
          CONVERT NOW
        </button>
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="relative hidden md:flex items-center justify-center z-10">

        {/* OUTER GOLD RING */}
        <div className="absolute w-[420px] h-[420px] rounded-full border border-yellow-400/30 animate-spin-slow"></div>

        {/* MIDDLE RED RING */}
        <div className="absolute w-[320px] h-[320px] rounded-full border border-red-500/30 animate-spin-reverse"></div>

        {/* INNER GLOW RING */}
        <div className="absolute w-[260px] h-[260px] rounded-full bg-gradient-to-tr from-red-600/20 to-yellow-500/10 blur-xl"></div>

        {/* MAIN CIRCLE */}
        <div className="w-[220px] h-[220px] rounded-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 shadow-2xl relative overflow-hidden">

          {/* shine effect */}
          <div className="absolute inset-0 bg-white/10 rotate-12 blur-2xl" />

          <p className="text-black/70 text-xs tracking-widest z-10">
            CONVERTED VALUE
          </p>

          <h1 className="text-4xl font-extrabold text-black z-10">
            {convertedAmount || "0.00"}
          </h1>

          <p className="text-black/70 font-semibold z-10">
            {to.toUpperCase()}
          </p>
        </div>
      </div>

      {/* ================= ANIMATIONS ================= */}
      <style>{`
        .animate-spin-slow {
          animation: spin 18s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin 25s linear infinite reverse;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}

export default App;