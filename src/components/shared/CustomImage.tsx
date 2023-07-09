import Image from 'next/image';

type Props = {
    src: string,
    alt: string,
    priority?: string,
}

export default function CustomImage({ src, alt, priority }: Props) {
  const prty = priority ? true : false;
  return (
    <div className="w-full h-full">
      <Image
        className="mx-auto rounded-lg"
        src={src}
        alt={alt}
        width={650}
        height={650}
        priority={prty}
      />
    </div>
  );
}