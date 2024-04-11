"use client";
import { useState } from "react";

const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  return Number(e.target.value);
};

const checkValue = (value: number, min: number, max: number) => {
  if (!Number.isNaN(value) && (value >= min || value <= max)) {
    return true;
  }
  return false;
};

const config = {
  red: {
    default: 34,
    min: 0,
    max: 255,
    step: 1,
  },
  green: {
    default: 158,
    min: 0,
    max: 255,
    step: 1,
  },
  blue: {
    default: 217,
    min: 0,
    max: 255,
    step: 1,
  },
  alpha: {
    default: 0.65,
    min: 0,
    max: 1,
    step: 0.01,
  },
};

const toHex = (red: number, green: number, blue: number, alpha: number) =>
  (blue | (green << 8) | (red << 16) | (1 << 24)).toString(16).slice(1) +
  (alpha | (1 << 8)).toString(16).slice(1);

export function Tool() {
  const [red, setRed] = useState(config.red.default);
  const [green, setGreen] = useState(config.green.default);
  const [blue, setBlue] = useState(config.blue.default);
  const [alpha, setAlpha] = useState(config.alpha.default);

  const onRedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = getValue(e);

    if (checkValue(value, config.red.min, config.red.max)) {
      setRed(value);
    }
  };

  const onGreenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = getValue(e);
    if (checkValue(value, config.green.min, config.green.max)) {
      setGreen(value);
    }
  };

  const onBlueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = getValue(e);
    if (checkValue(value, config.blue.min, config.blue.max)) {
      setBlue(value);
    }
  };

  const onAlphaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = getValue(e);
    if (checkValue(value, config.alpha.min, config.alpha.max)) {
      setAlpha(value);
    }
  };

  const onClickHex = () => {
    navigator.clipboard.writeText(`#${toHex(red, green, blue, alpha)}`);
  };

  return (
    <>
      <ul className="flex flex-col sm:flex-row gap-x-6 gap-y-2 justify-center items-center mb-6">
        <li className="flex items-center gap-x-3">
          <label className="cursor-pointer" htmlFor="input-red">
            R
          </label>
          <input
            className="w-24 bg-gray-50 border px-3 py-2 rounded focus:outline-none focus:ring"
            type="number"
            min={config.red.min}
            max={config.red.max}
            step={config.red.step}
            id="input-red"
            value={red}
            onChange={onRedChange}
          />
        </li>
        <li className="flex items-center gap-x-3">
          <label className="cursor-pointer" htmlFor="input-green">
            G
          </label>
          <input
            className="w-24 bg-gray-50 border px-3 py-2 rounded focus:outline-none focus:ring"
            type="number"
            min={config.green.min}
            max={config.green.max}
            step={config.green.step}
            id="input-green"
            value={green}
            onChange={onGreenChange}
          />
        </li>
        <li className="flex items-center gap-x-3">
          <label className="cursor-pointer" htmlFor="input-blue">
            B
          </label>
          <input
            className="w-24 bg-gray-50 border px-3 py-2 rounded focus:outline-none focus:ring"
            type="number"
            min={config.blue.min}
            max={config.blue.max}
            step={config.blue.step}
            id="input-blue"
            value={blue}
            onChange={onBlueChange}
          />
        </li>
        <li className="flex items-center gap-x-3">
          <label className="cursor-pointer" htmlFor="color-a">
            A
          </label>
          <input
            className="w-24 bg-gray-50 border px-3 py-2 rounded focus:outline-none focus:ring"
            type="number"
            min={config.alpha.min}
            max={config.alpha.max}
            step={config.alpha.step}
            id="color-a"
            value={alpha}
            onChange={onAlphaChange}
          />
        </li>
      </ul>
      <div className="w-full p-4 border border-dashed rounded flex flex-col items-center gap-y-2">
        <h3 className="text-center text-lg font-semibold uppercase tracking-wider">
          Converted
        </h3>
        <div className="flex flex-col gap-2 text-center">
          <div
            className="text-xl tracking-wider select-all cursor-pointer uppercase"
            onClick={onClickHex}
          >
            #{toHex(red, green, blue, alpha)}
          </div>
        </div>
        <hr className="border-b border-gray-100 border-dashed w-full my-2" />
        <h3 className="text-center text-lg font-semibold uppercase tracking-wider">
          Preview
        </h3>
        <div
          className="w-20 h-20 max-w-full rounded shadow"
          style={{
            backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha})`,
          }}
        />
      </div>
    </>
  );
}
