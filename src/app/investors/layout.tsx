import AuthChecker from '../(auth)/authChecker';

export default function GuestLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthChecker>
      <div>{children}</div>
    </AuthChecker>
  );
}
