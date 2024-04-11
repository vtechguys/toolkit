import { useRef } from "react";
import { Tool } from "./tool";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "Generated by create next app",
};

export default function Page() {
  return (
    <main className="min-w-screen min-h-screen">
      <div className="w-full bg-slate-100 p-5 md:p-10 ">
        <div className="container bg-white rounded  shadow mx-auto flex flex-col justify-center items-center space-y-7 px-5 py-10 max-w-4xl">
          <h1 className="text-base text-center">RGBA to HEX Convertor</h1>
          <Tool />
        </div>
      </div>

      <div className="w-full p-5 md:p-10 ">
        <section className="container mx-auto flex flex-col justify-center items-center space-y-5 max-w-4xl">
          <h1 className="text-3xl font-normal md:text-4xl">RGBA to HEX</h1>
          <p className="text-base">
            If you need to change the format of a colour from hexadecimal to RGB
            or RGBA, you may do so easily and for free with Hex to RGBA. Anyone
            who wants to quickly change colours will find it ideal, including
            web designers, graphic artists, developers, and more.
          </p>
          <p className="text-base">
            A hash sign (#) comes before six hexadecimal digits to form a
            Hexadecimal Colour Code. A colour is represented by this code so
            that a standard name for the colour may be easily utilised. As an
            illustration, the colour #FFFFFF represents pure white, while
            #000000 represents complete black.
          </p>
          <p className="text-base">
            There are three digits and a comma that make up an RGB colour code.
            A colour is represented by this code so that a standard name for the
            colour may be easily utilised. For instance, the colour white is
            represented by the RGB code rgb(255, 255, 255).
          </p>
        </section>
      </div>
    </main>
  );
}
