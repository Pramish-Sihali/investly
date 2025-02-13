import Image from "next/image";
import { notFound } from "next/navigation";

const blogs = [
  {
    id: 1,
    slug: "elizabeth-kleinveld-startup-matchmaker",
    image: "/blog.png",
    date: "04/02/2025",
    title: "Elizabeth Kleinveld: Startup Matchmaker & Ecosystem Builder",
    content:
      "Elizabeth Kleinveld is the host of Breaking Banks Europe, the world’s #1 FinTech podcast and radio show. She’s a startup matchmaker and ecosystem builder, especially for FinTech, Renewable Energy, and Mobility and Sustainability...",
  },
  {
    id: 2,
    slug: "10-tips-for-first-time-founders",
    image: "/blog1.png",
    date: "01/25/2025",
    title: "10 Tips for First-Time Founders to Succeed in the Startup World",
    content:
      "Starting a company can be overwhelming. From securing funding to building a team, the challenges can be daunting. Here are 10 practical tips to help first-time founders navigate the complexities of the startup world and build a strong foundation for success...",
  },
  {
    id: 3,
    slug: "future-of-fintech-trends-2025",
    image: "/blog2s.png",
    date: "12/15/2024",
    title: "The Future of FinTech: Trends to Watch in 2025",
    content:
      "As we head into 2025, FinTech continues to revolutionize how we manage money, invest, and interact with financial services. This article explores the biggest trends shaping the industry, from decentralized finance to AI-driven personalization...",
  },
];

const BlogDetailPage = ({ params }: { params: { slug: string } }) => {
  const blog = blogs.find((blog) => blog.slug === params.slug);

  if (!blog) {
    return notFound();
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-6 sm:px-8 md:px-12 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{blog.date}</p>
      <Image src={blog.image} alt={blog.title} width={800} height={400} className="rounded-lg mb-6" />
      <p className="text-gray-700 text-lg leading-relaxed">{blog.content}</p>
    </div>
  );
};

export default BlogDetailPage;