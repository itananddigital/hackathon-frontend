import { useUpload } from '@/hooks/useUpload';
import { postFetcher } from '@/lib/api/swrFetcher';
import { getCookie } from '@/utils/cookies';
import { Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from 'react';
import { KeyedMutator } from 'swr';
import useSWRMutation from 'swr/mutation';
import { FormInput } from '../common/FormInput';

const ViewProfile = ({ data, mutate }: { data: any, mutate: KeyedMutator<any> }) => {
    const currentUser = getCookie('email');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const { isOpen, onClose, onOpen } = useDisclosure()
    const toast = useToast()

    const { trigger, isMutating: updateDoc, error: updateError } = useSWRMutation(
        '/api/method/hackathon.API.user.update_user',
        postFetcher
    );

    const { trigger: uploadCall, isMutating } = useUpload();

    const [formData, setFormData] = useState({
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        gender: data.gender,
        bio: data.bio
    });


    const avatarUrl = encodeURI(`http://localhost:8002${data.user_image}`);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
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
            toast({ title: 'Profile updated successfully' });
        } catch (err) {
            toast({
                title: 'Failed to update profile',
                description: 'Something went wrong',
            });
        }
    };

    // Handle avatar file selection
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatarFile(e.target.files[0]);
        }
    };

    // Handle avatar upload
    const uploadAvatar = async () => {
        if (!avatarFile) {
            toast({ title: 'Please select an image to upload' });
            return;
        }
        let url = null;
        try {
            const formData = new FormData();
            formData.append('file', avatarFile);
            const res = await uploadCall(formData);
            url = res.message.file_url;
            onClose()
        } catch (err) {
            toast({
                title: 'Failed to upload files',
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
            toast({ title: 'Successfully updated profile' });
            setAvatarFile(null);
        } catch (err) {
            toast({
                title: 'Failed to update profile',
                description: 'Something went wrong',
            });
        }
    };

    return (
        <div className="min-h-screen  text-white flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl bg-gray-800 border-gray-700 shadow-lg rounded-lg">
                <CardHeader className="border-b border-gray-600 p-6">
                    My Profile
                </CardHeader>
                <CardBody className="p-6 space-y-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-700">
                            <img
                                src={avatarUrl}
                                alt="User avatar"
                                className="object-cover w-full h-full"
                            />
                            <button
                                onClick={onOpen}
                                className="absolute bottom-2 right-2  bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition"
                            >
                                {/* <Pencil className="w-5 h-5 text-white" /> */}
                            </button>
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
                                    <Input
                                        name="email"
                                        value={formData.email}
                                        readOnly
                                    />
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
                    </div>

                    <div className="space-y-2">
                        <FormInput label="Bio">
                            <Input
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                            />
                        </FormInput>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <Button
                            onClick={handleSave}
                            disabled={updateDoc}
                        >
                            {updateDoc ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Upload New Avatar</ModalHeader>
                    <ModalBody className="space-y-4">
                        <Text color="gray.300">Select an image</Text>
                        <Input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setAvatarFile(null);
                                onClose();
                            }}
                            mr={3}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={uploadAvatar}
                            isLoading={isMutating}
                            isDisabled={!avatarFile}
                            colorScheme="brand"
                        >
                            Upload
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ViewProfile