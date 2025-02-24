import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full border flex items-center justify-center bg-gray-100">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Kapil Sapkota</h1>
              <p className="text-gray-600">Investor</p>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold">0</h2>
            <p className="text-gray-600">Investments</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500/90 to-gray-900 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Get insight in startup KPIs</h2>
            <p className="text-gray-200">with our Premium Subscription</p>
            <ul className="space-y-1">
              <li>✓ Startup KPI Insights</li>
              <li>✓ Geographical Investor Search</li>
              <li>✓ Whatsapp Conversations</li>
              <li>✓ and more...</li>
            </ul>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
            Show me!
          </Button>
        </div>
      </div>

      {/* Investment Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">It seems like you have no investments here.</h2>
          <p className="text-gray-600">Why dont you take a look at our open rounds?</p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg">
            Find open rounds
          </Button>
        </div>
      </div>
    </div>
  );
}
