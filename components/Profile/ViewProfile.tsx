import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpload } from '@/hooks/useUpload';
import { postFetcher } from '@/lib/api/swrFetcher';
import { getCookie } from '@/utils/cookies';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { KeyedMutator } from 'swr';
import useSWRMutation from 'swr/mutation';
import { FormInput } from '../Common/FormInput';
import { Textarea } from '../ui/textarea';

const ViewProfile = ({ data, mutate }: { data: any; mutate: KeyedMutator<any> }) => {
  const currentUser = getCookie('email');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { trigger, isMutating: updateDoc } = useSWRMutation(
    '/api/method/hackathon.API.user.update_user',
    postFetcher
  );
  const { trigger: uploadCall, isMutating } = useUpload();

  const [formData, setFormData] = useState({
    firstName: data.first_name || '',
    lastName: data.last_name || '',
    email: data.email || '',
    gender: data.gender || '',
    bio: data.bio || '',
  });

  const avatarUrl = encodeURI(`${process.env.BASE_URL}/${data.user_image}`);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await trigger({
        user: currentUser,
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        bio: formData.bio,
      });
      mutate();
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile', {
        description: 'Something went wrong',
      });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile) {
      toast.error('Please select an image to upload');
      return;
    }
    let url = null;
    try {
      const formData = new FormData();
      formData.append('file', avatarFile);
      const res = await uploadCall(formData);
      url = res.message.file_url;
      setIsOpen(false);
    } catch (err) {
      toast.error('Failed to upload files', {
        description: err instanceof Error ? err.message : 'Upload failed',
      });
      return;
    }

    try {
      await trigger({
        file_url: url,
        user: currentUser,
      });
      mutate();
      toast.success('Successfully updated profile');
      setAvatarFile(null);
    } catch (err) {
      toast.error('Failed to update profile', {
        description: 'Something went wrong',
      });
    }
  };

  return (
    <div className="px-4 md:px-12 space-y-6">
      <h2 className="text-xl font-semibold">My Profile</h2>
      <div className="flex items-center justify-center space-y-4 md:space-y-0 md:space-x-4 pb-10">
        <div className="relative ">
          <div className=' rounded-full w-32 h-32  overflow-hidden'>
          <Image
            src={avatarUrl}
            alt="User avatar"
            className="object-cover w-full h-full rounded-full"
            width={128}
            height={128}
          />
          
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute -bottom-2 -right-2 rounded-full"
              >
                <Upload />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Avatar</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label>Select an image</Label>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setAvatarFile(null);
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={uploadAvatar}
                  disabled={!avatarFile || isMutating}
                >
                  {isMutating ? 'Uploading...' : 'Upload'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          </div>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormInput label="First Name">
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </FormInput>
        </div>
        <div className="space-y-2">
          <FormInput label="Last Name">
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </FormInput>
        </div>
        <div className="space-y-2">
          <FormInput label="Email">
            <Input name="email" value={formData.email} readOnly />
          </FormInput>
        </div>
        <div className="space-y-2">
          <FormInput label="Gender">
            <Input
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            />
          </FormInput>
        </div>
      </div>

      <div className="space-y-2">
        <FormInput label="Bio">
          <Textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </FormInput>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={updateDoc}>
          {updateDoc ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default ViewProfile;