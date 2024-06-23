import { Inter, Hind } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
const hind = Hind({ weight: ["400", "700"], subsets: ["latin"] });

const DriveX = () => {
  return (
    <div className={`${inter.className}`}>
      <h1 className="text-5xl font-normal mb-4 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">
        drive<span className="font-bold -ml-1">X</span>
      </h1>
    </div>
  );
};

export default DriveX;
