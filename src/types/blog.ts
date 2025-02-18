export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  thumbnailImage: string;
  thumbnailImageAltDescription?: string;
  content: string;
}
