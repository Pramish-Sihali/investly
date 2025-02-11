interface HeadingSectionProps {
  badge?: string;
  title: string;
  subtitle?: string;
}

const HeadingSection = ({ badge, title, subtitle }: HeadingSectionProps) => {
  return (
    <div className="max-w-3xl mx-auto mb-12 md:mb-16">
      {/* Section Header */}
      <div className="space-y-4 text-center">
        {badge && (
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full">
            {badge}
          </span>
        )}
        <h2 className="text-3xl md:text-5xl font-bold text-[#003d21]">
          {title}
          {subtitle && (
            <span className="block text-primary/80 mt-4 text-lg md:text-xl font-normal">
              {subtitle}
            </span>
          )}
        </h2>
        <div className="flex items-center justify-center gap-2 pt-4">
          <div className="w-8 md:w-12 h-1 bg-primary/20 rounded-full"></div>
          <div className="w-2 md:w-3 h-2 md:h-3 bg-primary/30 rounded-full"></div>
          <div className="w-8 md:w-12 h-1 bg-primary/20 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default HeadingSection;
