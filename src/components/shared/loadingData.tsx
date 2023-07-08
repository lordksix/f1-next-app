import { LoadingDots } from './icons';

export default function loadingData() {
  // Or a custom loading skeleton component
  return (
    <div className="flex items-center justify-center w-full h-full">
      <LoadingDots color="#808080" />
    </div>
  );
};