import Image from "next/image";

interface PageProps {
  params: { group: string };
}

export default async function Page({ params: { group } }: PageProps) {
  const image = await import(`@/assets/${group}.png`);

  return (
    <Image
      src={image.default}
      alt=""
      className="absolute top-0 left-0 -z-50 size-full object-contain"
    />
  );
}
