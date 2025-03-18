// 'use client';

// import { useUpload } from '@/hooks/useUpload';
// import { postFetcher } from '@/lib/api/swrFetcher';
// import { getCookie } from '@/utils/cookies';
// import { Button, Card, CardBody, CardHeader, Input, Text, useToast } from "@chakra-ui/react";
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import useSWRMutation from 'swr/mutation';
// import { handleErrorToast } from '../common/HandleError';

// const SubmissionForm = () => {
//   const [githubLink, setGithubLink] = useState('');
//   const [files, setFiles] = useState<File[]>([]);
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);
//   const toast = useToast()

//   const { trigger, error, isMutating } = useSWRMutation(
//     '/api/method/hackathon.API.submissions.submit_submission',
//     postFetcher
//   )
//   const { trigger: uploadCall } = useUpload();
//   const currentUser = getCookie('email')

//   useEffect(() => {
//     const urls = files.map((file) => URL.createObjectURL(file));
//     setPreviewUrls(urls);

//     return () => {
//       urls.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }, [files]);

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles(Array.from(e.target.files));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const url: string[] = [];

//     try {
//       await Promise.all(
//         files.map(async (file) => {
//           const formData = new FormData();
//           formData.append("file", file);
//           const res = await uploadCall({formData});
//           url.push(res.message.file_url);
//         })
//       );
//     } catch (err) {
//       return toast({
//         title: 'Failed to upload files', 
//         description: err instanceof Error ? err.message : 'Upload failed',
//       });
//     }


//     try {
//       await trigger({ link: githubLink, files: url, user: currentUser });
//       toast({title: 'Successfully submitted'});
//       setGithubLink('');
//       setFiles([]);
//     } catch (err) {
//       handleErrorToast(err)
//     }
//   };

//   const removeFile = (index: number) => {
//     setFiles(files.filter((_, i) => i !== index));
//   };

//   return (
//     <Card className="w-full max-w-md bg-gray-900 border-gray-800 shadow-lg">
//       <CardHeader className="border-b border-gray-800">
//           Project Submission
//       </CardHeader>
//       <CardBody className="pt-6">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-2">
//             <Text className="text-gray-300">
//               GitHub Link
//             </Text>
//             <Input
//               id="github"
//               type="url"
//               placeholder="https://github.com/username/repo"
//               value={githubLink}
//               onChange={(e) => setGithubLink(e.target.value)}
//               disabled={isMutating}
//             />
//           </div>

//           <div className="space-y-2">
//             <Text className="text-gray-300">
//               Upload Images or Videos
//             </Text>
//             <Input
//               id="media"
//               type="file"
//               accept="image/*,video/*"
//               multiple
//               onChange={handleFileChange}
//               disabled={isMutating}
//             />
//             {files.length > 0 && (
//               <p className="text-sm text-gray-400">
//                 Selected: {files.length} file(s)
//               </p>
//             )}

//             {/* Preview Section */}
//             {previewUrls.length > 0 && (
//               <div className="mt-4">
//                 <Text className="text-gray-300">Previews</Text>
//                 <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {files.map((file, index) => (
//                     <div key={index} className="flex flex-col items-center">
//                       {file.type.startsWith('image/') ? (
//                         <Image
//                           src={previewUrls[index]}
//                           alt={`Preview ${index + 1}`}
//                           className="max-w-full h-auto rounded-md border border-gray-700 shadow-md"
//                           style={{ maxHeight: '200px' }}
//                           width={150}
//                           height={150}
//                         />
//                       ) : file.type.startsWith('video/') ? (
//                         <video
//                           src={previewUrls[index]}
//                           controls
//                           className="max-w-full h-auto rounded-md border border-gray-700 shadow-md"
//                           style={{ maxHeight: '200px' }}
//                         />
//                       ) : <></>}
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         className="mt-2"
//                         onClick={() => removeFile(index)}
//                       >
//                         Remove
//                       </Button>
//                       <p className="text-xs text-gray-400 mt-1 text-center">
//                         {file.name} ({(file.size / 1024).toFixed(2)} KB)
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           <Button
//             onClick={handleSubmit}
//             disabled={isMutating || !githubLink}
//             className="w-full disabled:cursor-not-allowed"
//           >
//             {isMutating ? 'Saving...' : 'Save Submission'}
//           </Button>
//         </form>
//       </CardBody>
//     </Card>
//   );
// }

// export default SubmissionForm

'use client';

import { useUpload } from '@/hooks/useUpload';
import { postFetcher } from '@/lib/api/swrFetcher';
import { getCookie } from '@/utils/cookies';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Text,
  Textarea,
  VStack,
  Icon,
  useToast,
  Stack,
  Heading
} from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { handleErrorToast } from '../common/HandleError';
import { FaUpload } from 'react-icons/fa';

const SubmissionForm = () => {
  const [title, setTitle] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const toast = useToast();

  const { trigger, error, isMutating } = useSWRMutation(
    '/api/method/hackathon.API.submissions.submit_submission',
    postFetcher
  );
  const { trigger: uploadCall } = useUpload();
  const currentUser = getCookie('email');

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const uploadedUrls: string[] = [];

    try {
      await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          const res = await uploadCall(formData );
          uploadedUrls.push(res.message.file_url);
        })
      );
    } catch (err) {
      handleErrorToast(toast, err);
    }

    try {
      await trigger({ title, link: githubLink, files: uploadedUrls, user: currentUser, description });
      toast({ title: 'Successfully submitted' });
      setTitle('');
      setGithubLink('');
      setDescription('');
      setFiles([]);
    } catch (err) {
      handleErrorToast(toast, err);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Stack
      px={{ base: 4, md: "5rem", lg: "5rem" }}
      py={{ base: 16, md: 20 }}
    >

      <Heading className="text-white text-xl font-bold">
        Project Submission
      </Heading>
        <Text className="text-gray-400">
          Submit your project for the hackathon before the deadline: <strong>March 15, 2025</strong>
        </Text>
      <Card p={4}>
        <CardBody >

          <form onSubmit={handleSubmit}>
            {/* Project Title */}
            <Stack>
            <VStack align="start" spacing={2}>
              <Text className="text-gray-300">Project Title</Text>
              <Input
                id="title"
                type="text"
                placeholder="Enter your project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isMutating}
                required
              />
            </VStack>

            {/* GitHub Repository URL */}
            <VStack align="start" spacing={2}>
              <Text className="text-gray-300">GitHub Repository URL</Text>
              <Input
                id="github"
                type="url"
                placeholder="https://github.com/username/repository"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                disabled={isMutating}
                required
              />
            </VStack>

            {/* File Upload Section */}
           
            <VStack align="start" spacing={2}>
              <Text className="text-gray-300">Project Files</Text>

              {/* File Drop Zone */}
              <Box
                border="2px dashed"
                w={'100%'}
                borderColor="gray.600"
                borderRadius="md"
                p={4}
                textAlign="center"
                className="cursor-pointer hover:bg-gray-800 transition"
                onClick={() => document.getElementById("media")?.click()} // 👈 Fix: Trigger file input
              >
                <Input
                  id="media"
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileChange}
                  disabled={isMutating}
                  hidden
                />
                <Icon as={FaUpload} color="gray.400" size={20} /> {/* 👈 Fix: Use correct icon */}
                <Text className="text-gray-400 mt-2">Drag and drop your files here, or</Text>
              </Box>

              {/* File Previews */}
              {previewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {files.map((file, index) => (
                    <div key={index} className="flex flex-col items-center">
                      {file.type.startsWith('image/') ? (
                        <img
                          src={previewUrls[index]}
                          alt={`Preview ${index + 1}`}
                          className="max-w-full h-auto rounded-md border border-gray-700 shadow-md"
                          style={{ maxHeight: '150px' }}
                        />
                      ) : file.type.startsWith('video/') ? (
                        <video
                          src={previewUrls[index]}
                          controls
                          className="max-w-full h-auto rounded-md border border-gray-700 shadow-md"
                          style={{ maxHeight: '150px' }}
                        />
                      ) : null}
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => removeFile(index)}
                      >
                        Remove
                      </Button>
                      <p className="text-xs text-gray-400 mt-1 text-center">
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </p>
                    </div>
                  ))}
                </div>
              )}
              </VStack>

            {/* Project Description */}
            <VStack align="start" spacing={2}>
              <Text className="text-gray-300">Project Description</Text>
              <Textarea
                id="description"
                placeholder="Describe your project..."
                className="w-full bg-gray-800 border border-gray-700 text-white"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isMutating}
              />
            </VStack>

            {/* Submit Button */}
            <Button
              type="submit"
              colorScheme="blue"
              className="w-full"
              isLoading={isMutating}
              disabled={!githubLink || !title}
            >
              Submit Project
            </Button>
            </Stack>
          </form>
        </CardBody>
      </Card>
    </Stack>

  );
}

export default SubmissionForm;
