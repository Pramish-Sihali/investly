import { LineText } from '@/components/line-text';

const Guest = () => (
  <div>
    <div className="flex flex-col gap-2 items-center justify-center">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
        Hello this is <LineText>Guest</LineText> page
      </h1>
    </div>
  </div>
);

export default Guest;
