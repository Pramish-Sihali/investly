export default function ContactMap() {
  return (
    <div className="w-full lg:w-1/2 hidden lg:flex justify-center animate-fade-in">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d456598.83795145364!2d87.13498743277812!3d26.610727141424373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef6378445acc51%3A0x6ef846df97fb7d2c!2sMorang!5e0!3m2!1sen!2snp!4v1741517205506!5m2!1sen!2snp"
        className="w-full h-full min-h-[600px] rounded-lg"
        style={{
          border: 0,
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
