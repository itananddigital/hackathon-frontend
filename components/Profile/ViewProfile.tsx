'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpload } from '@/hooks/useUpload';
import { postFetcher } from '@/lib/api/swrFetcher';
import { getCookie } from '@/utils/cookies';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'sonner';
import { KeyedMutator } from 'swr';
import useSWRMutation from 'swr/mutation';
import { FormInput } from '../Common/FormInput';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { CONSTANTS } from '@/lib/api/app-config';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  bio: string;
}

const ViewProfile = ({
  data,
  mutate,
  className,
  ...props
}: {
  data: any;
  mutate: KeyedMutator<any>;
  className?: string;
} & React.ComponentPropsWithoutRef<"div">) => {
  const currentUser = getCookie('email');

  const methods = useForm<FormData>({
    defaultValues: {
      firstName: data.first_name || '',
      lastName: data.last_name || '',
      email: data.email || '',
      gender: data.gender || '',
      bio: data.bio || '',
    },
    mode: 'onSubmit',
    resolver: async (values) => {
      const errors: any = {};

      if (!values.firstName) {
        errors.firstName = { message: 'First name is required' };
      } else if (values.firstName.length < 2) {
        errors.firstName = { message: 'First name must be at least 2 characters' };
      }

      if (values.lastName && values.lastName.length < 2) {
        errors.lastName = { message: 'Last name must be at least 2 characters' };
      }

      if (values.bio && values.bio.length > 500) {
        errors.bio = { message: 'Bio cannot exceed 500 characters' };
      }

      return { values, errors };
    },
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { trigger, isMutating: updateDoc } = useSWRMutation(
    '/api/method/hackathon.API.user.update_user',
    postFetcher
  );
  const { trigger: uploadCall, isMutating } = useUpload();

  const avatarUrl = encodeURI(`${CONSTANTS.API_BASE_URL}/${data.user_image}`);

  const onSubmit = async (formData: FormData) => {
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
      methods.setError('root.serverError', {
        message: 'Failed to update profile',
      });
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
  const isEmpty = (obj: object) => {
    return Object.keys(obj).length === 0;
  }

  const isDirty = !isEmpty(methods.formState.dirtyFields)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="px-4 md:px-12">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="flex items-center justify-center space-y-4 md:space-y-0 md:space-x-4 pb-10">
                <div className="relative">
                  <div className="rounded-full w-32 h-32 overflow-hidden">
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
                            loading={isMutating}
                          >
                            Upload
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput name="firstName" label="First Name" isRequired>
                    <Input {...methods.register("firstName")} />
                  </FormInput>
                  <FormInput name="lastName" label="Last Name">
                    <Input {...methods.register("lastName")} />
                  </FormInput>
                  <FormInput name="email" label="Email" isRequired>
                    <Input {...methods.register("email")} readOnly />
                  </FormInput>
                  <FormInput name="gender" label="Gender">
                    <Input {...methods.register("gender")} />
                  </FormInput>
                </div>
                <FormInput name="bio" label="Bio">
                  <Textarea {...methods.register("bio")} />
                </FormInput>
                {methods.formState.errors.root?.serverError && (
                  <div className="text-red-500">
                    {methods.formState.errors.root.serverError.message}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!isDirty}
                loading={updateDoc}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ViewProfile;