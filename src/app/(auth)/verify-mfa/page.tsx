import { Suspense } from 'react';

import VerifyMfa from './_verifymfa';

const Page = () => (
  <Suspense>
    <VerifyMfa />;
  </Suspense>
);

export default Page;
