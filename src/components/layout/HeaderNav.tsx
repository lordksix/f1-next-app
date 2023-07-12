import HeaderData from './HeaderData';

export const dynamic = 'force-dynamic';

type Props = {
  home?: boolean,
}

export default async function HeaderNav({ home = true }: Props) {
  return <HeaderData home={home} />;
}