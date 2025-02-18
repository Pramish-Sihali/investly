export type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
  profilePicture: string;
  profilePictureAltDescription: string;
  description?: string; // Optional field if available in the API
};