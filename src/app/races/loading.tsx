import { LoadingDots } from '@/components/shared/icons';

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <LoadingDots color="#808080" />
    </div>
  );
};