import { Metadata } from "next";
import WBSClient from "./WBSClient";

export const metadata: Metadata = {
  title: "Whistle Blowing System | AWS",
  description: "Kanal pelaporan pelanggaran etika dan ketidakpuasan layanan AWS yang independen, rahasia, dan terpercaya.",
};

export default function Page() {
  return <WBSClient />;
}
