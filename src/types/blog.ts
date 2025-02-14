export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  thumbnail_image: string;
  thumbnail_image_alt_description?: string;
  content: string;
}
