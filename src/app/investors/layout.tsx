import { InvestorNavbar } from '@/components/layout/navbar/investor-navbar';

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <InvestorNavbar />
      {children}
    </div>
  );
}
