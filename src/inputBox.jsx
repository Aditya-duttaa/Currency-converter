import { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
}) {
  const id = useId();

  return (
    <div className="border border-white/10 rounded-xl p-4 bg-black/20 backdrop-blur-sm">

      <div className="text-xs tracking-widest text-gray-400 mb-2">
        {label}
      </div>

      <div className="flex gap-3 items-center">

        <input
          id={id}
          type="number"
          value={amount}
          disabled={amountDisable}
          onChange={(e) => onAmountChange(Number(e.target.value))}
          className="w-1/2 bg-transparent text-2xl font-semibold outline-none"
          placeholder="0"
        />

        <select
          value={selectCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="w-1/2 bg-black/40 border border-white/10 p-2 rounded-lg outline-none"
        >
          {currencyOptions.map((cur) => (
            <option key={cur} value={cur}>
              {cur.toUpperCase()}
            </option>
          ))}
        </select>

      </div>
    </div>
  );
}

export default InputBox;