export default function ContactMap() {
  return (
    <div className="w-full lg:w-1/2 hidden lg:flex justify-center animate-fade-in">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1675.510141385681!2d-96.94350690674591!3d32.87118276909416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e82963efaeb91%3A0x170442ee329f0e67!2s222%20W%20Las%20Colinas%20Blvd.%20ste%201650%20e%2C%20Irving%2C%20TX%2075039%2C%20USA!5e0!3m2!1sen!2snp!4v1738738256551!5m2!1sen!2snp"
        className="w-full h-full min-h-[600px] rounded-lg"
        style={{
          border: 0,
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
