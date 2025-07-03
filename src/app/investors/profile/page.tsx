'use client';

import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { X, User, Edit, Mail, Info, Save, Phone, Building, ExternalLink } from 'lucide-react';

// Define the UserData interface based on the provided structure
interface UserData {
  id: number;
  full_name: string;
  email: string;
  role: string;
  organization_name: string;
  contact_number: string;
  about_you: string | null;
  website_link: string;
  document: string | null;
  investmentsCount: number;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editedData, setEditedData] = useState<Partial<UserData>>({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [changedFields, setChangedFields] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      const parsedData = JSON.parse(data);
      setUserData(parsedData);
      setEditedData(parsedData);
    }
    setLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Track which fields have been changed
    setChangedFields((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const userId = userData?.id;
      const url = `https://investly.baliyoventures.com/api/users/${userId}/`;

      // Create an object with only the changed fields
      const changedData: Partial<Record<keyof UserData, string | number | undefined>> = {};
      Object.keys(changedFields).forEach((fieldName) => {
        const value = editedData[fieldName as keyof UserData];
        if (changedFields[fieldName] && value !== undefined && value !== null) {
          changedData[fieldName as keyof UserData] = value;
        }
      });

      // Only proceed if there are actual changes
      if (Object.keys(changedData).length === 0) {
        setIsEditing(false);
        toast({
          title: 'No Changes Made',
          description: 'No changes were detected in your profile.',
        });
        setIsSaving(false);
        return;
      }

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.code === 'token_not_valid') {
          toast({
            title: 'Session Expired',
            description: 'Your session has expired. Please log in again.',
            variant: 'destructive',
          });
          return;
        }
        throw new Error(`Failed to update profile: ${response.status}`);
      }

      const updatedData = await response.json();

      // Update local state with merged data (original + updates)
      const mergedData = { ...userData, ...updatedData };
      setUserData(mergedData);
      localStorage.setItem('userData', JSON.stringify(mergedData));

      setIsEditing(false);
      setChangedFields({});

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Update Failed',
        description: 'There was a problem updating your profile. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditedData(userData || {});
    setIsEditing(false);
    setChangedFields({});
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header with Edit/Save Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={cancelEdit} disabled={isSaving}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  'Saving...'
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </>
          ) : (
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full border-4 border-gray-100 bg-gray-50 flex items-center justify-center mb-4">
                <User className="w-16 h-16 text-gray-400" />
              </div>

              {isEditing ? (
                <div className="w-full space-y-4">
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
                    <Input
                      name="full_name"
                      value={editedData.full_name || ''}
                      onChange={handleInputChange}
                      className="text-center"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Role</label>
                    <Input
                      name="role"
                      value={editedData.role || ''}
                      onChange={handleInputChange}
                      className="text-center"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Organization</label>
                    <Input
                      name="organization_name"
                      value={editedData.organization_name || ''}
                      onChange={handleInputChange}
                      className="text-center"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-1">
                    {userData?.full_name || 'User Name'}
                  </h2>
                  <p className="text-gray-600 mb-1">{userData?.role || 'Role'}</p>
                  <p className="text-gray-600 font-medium">
                    {userData?.organization_name || 'Organization'}
                  </p>
                </>
              )}

              <div className="w-full border-t my-4" />

              <div className="w-full space-y-3">
                {isEditing ? (
                  <>
                    <div>
                      <label className="text-sm text-gray-500 mb-1 block flex items-center">
                        <Mail className="w-4 h-4 text-gray-500 mr-2" /> Email
                      </label>
                      <Input
                        name="email"
                        value={editedData.email || ''}
                        onChange={handleInputChange}
                        type="email"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-500 mb-1 block flex items-center">
                        <Phone className="w-4 h-4 text-gray-500 mr-2" /> Contact Number
                      </label>
                      <Input
                        name="contact_number"
                        value={editedData.contact_number || ''}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-500 mb-1 block flex items-center">
                        <ExternalLink className="w-4 h-4 text-gray-500 mr-2" /> Website
                      </label>
                      <Input
                        name="website_link"
                        value={editedData.website_link || ''}
                        onChange={handleInputChange}
                        type="url"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-500 mr-3" />
                      <span className="text-gray-700">{userData?.email || 'Email'}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-500 mr-3" />
                      <span className="text-gray-700">{userData?.contact_number || 'Phone'}</span>
                    </div>
                    <div className="flex items-center">
                      <ExternalLink className="w-4 h-4 text-gray-500 mr-3" />
                      <a
                        href={userData?.website_link}
                        className="text-blue-600 hover:underline truncate"
                      >
                        {userData?.website_link || 'Website'}
                      </a>
                    </div>
                  </>
                )}
              </div>

              <div className="w-full border-t my-4" />

              <div className="bg-blue-50 rounded-lg p-4 w-full">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Investments</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {userData?.investmentsCount || '0'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="w-5 h-5 mr-2" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  name="about_you"
                  value={editedData.about_you || ''}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                  className="min-h-32"
                />
              ) : (
                <p className="text-gray-700">
                  {userData?.about_you ||
                    "No information provided yet. Click 'Edit Profile' to add details about yourself."}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="investments">
            <TabsList className="w-full">
              <TabsTrigger value="investments" className="flex-1">
                Investments
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex-1">
                Documents
              </TabsTrigger>
            </TabsList>
            <TabsContent value="investments">
              <Card>
                <CardContent className="pt-6">
                  {userData?.investmentsCount ? (
                    <div className="space-y-4">
                      <p>Your investment portfolio will appear here.</p>
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-4">
                      <Building className="w-12 h-12 text-gray-400 mx-auto" />
                      <h3 className="text-xl font-semibold">No investments yet</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        You haven&apos;t made any investments yet. Explore open rounds to start
                        building your portfolio.
                      </p>
                      <Link href="/startups-directory">
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                          Explore Open Rounds
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="documents">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <p className="text-gray-600">No documents have been uploaded yet.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Premium Feature Card */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-gray-900 p-6 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-3">
                  <h2 className="text-xl font-semibold">Get insight in startup KPIs</h2>
                  <p className="text-gray-100">with our Premium Subscription</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm">
                    <li className="flex items-center">✓ Startup KPI Insights</li>
                    <li className="flex items-center">✓ Geographical Investor Search</li>
                    <li className="flex items-center">✓ Whatsapp Conversations</li>
                    <li className="flex items-center">✓ and more...</li>
                  </ul>
                </div>
                <Button className="bg-white text-gray-900 hover:bg-gray-100 font-medium">
                  Show me!
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
