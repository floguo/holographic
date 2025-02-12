import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/vercel.svg"
      alt="Vercel logomark"
      height={16}
      width={56}
    />
  );
}