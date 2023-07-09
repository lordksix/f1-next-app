import Image from 'next/image';

type Props = {
    src: string,
    alt: string,
    priority?: string,
    caption?: string,
}

export default function CustomImage({ src, alt, priority, caption }: Props) {
  const prty = priority ? true : false;
  return (
    <figure className="w-full h-full">
      <Image
        className="mx-auto rounded-lg"
        src={src}
        alt={alt}
        width={650}
        height={650}
        priority={prty}
      />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}