export default function ContactMap() {
  return (
    <div className="w-full lg:w-1/2 hidden lg:flex justify-center animate-fade-in">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.6448900568325!2d87.2867593!3d26.467173300000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef74142c843179%3A0x9216f029e3d3b489!2sChamber%20of%20Industries%2C%20Morang!5e0!3m2!1sen!2snp!4v1742542915501!5m2!1sen!2snp"
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
