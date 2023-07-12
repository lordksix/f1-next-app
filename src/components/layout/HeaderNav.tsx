import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth/next';
import HeaderData from './HeaderData';

type Props = {
  home?: boolean,
}

export default async function HeaderNav({ home = true }: Props) {
  const session = await getServerSession(options);
  return <HeaderData session={session} home={home} />;
}