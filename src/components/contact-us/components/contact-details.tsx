import { address } from "@/@constants/address";
import { MapPin, Phone, Mail } from "lucide-react";
import ResponsiveContainer from "@/components/common/responsive-container";

export default function ContactDetails() {
  return (
    <ResponsiveContainer
      paddingX="sm"
      paddingY="xl"
      className="bg-gray-50 shadow-md rounded-lg my-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {/* Address Section */}
        <div className="flex flex-col items-center text-center group">
          <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
            <MapPin className="text-blue-500 w-10 h-10" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Address</h3>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${address.address} ${address.street}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 text-sm transition-colors"
            >
              <p>{address.address}</p>
              <p>{address.street}</p>
            </a>
          </div>
        </div>

        {/* Phone Section */}
        <div className="flex flex-col items-center text-center group">
          <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
            <Phone className="text-blue-500 w-10 h-10" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Contact Number</h3>
          <div className="space-y-1">
            {address.landline_1 && (
              <a
                href={`tel:${address.landline_1}`}
                className="block text-sm hover:text-blue-500 transition-colors"
              >
                {address.landline_1}
              </a>
            )}
           
          </div>
        </div>

        {/* Email Section */}
        <div className="flex flex-col items-center text-center group">
          <div className="bg-blue-50 p-4 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
            <Mail className="text-blue-500 w-10 h-10" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <div className="space-y-1">
              {address.email_1 && (
                <a
                  href={`mailto:${address.email_1}`}
                  className="block text-sm hover:text-blue-500 transition-colors"
                >
                  {address.email_1}
                </a>
              )}
              {address.email_2 && (
                <a
                  href={`mailto:${address.email_2}`}
                  className="block text-sm hover:text-blue-500 transition-colors"
                >
                  {address.email_2}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
}
