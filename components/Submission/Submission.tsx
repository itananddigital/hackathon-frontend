'use client';

import { postFetcher } from '@/lib/api/swrFetcher';
import { getCookie } from '@/utils/cookies';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { useUpload } from '@/hooks/useUpload';
import { handleErrorToast } from '../HandleError';
import { toast } from 'sonner';
import Image from 'next/image';

const SubmissionForm = () => {
  const [title, setTitle] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { trigger, isMutating } = useSWRMutation(
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          formData.append('file', file);
          const res = await uploadCall(formData);
          uploadedUrls.push(res.message.file_url);
        })
      );
    } catch (err) {
      handleErrorToast(err);
      return;
    }

    try {
      await trigger({ title, link: githubLink, files: uploadedUrls, user: currentUser, description });
      toast('Successfully submitted');
      setTitle('');
      setGithubLink('');
      setDescription('');
      setFiles([]);
    } catch (err) {
      handleErrorToast(err);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="px-4 md:px-12">
      <h1 className="text-xl font-bold">Project Submission</h1>
      <p className="mt-2">
        Submit your project for the hackathon before the deadline: <strong>March 15, 2025</strong>
      </p>
      <Card className="mt-4">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Title */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter your project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isMutating}
                required
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="github">GitHub Repository URL</Label>
              <Input
                id="github"
                type="url"
                placeholder="https://github.com/username/repository"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
                disabled={isMutating}
                required
              />
            </div>

            {/* File Upload Section */}
            <div className="grid w-full items-center gap-1.5">
              <Label>Project Files</Label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer transition"
                onClick={() => document.getElementById('media')?.click()}
              >
                <Input
                  id="media"
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleFileChange}
                  disabled={isMutating}
                  className="hidden"
                />
                <Upload className="mx-auto h-5 w-5" />
                <p className="mt-2">Drag and drop your files here, or</p>
              </div>

              {previewUrls.length > 0 && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {files.map((file, index) => (
                    <div key={index} className="flex flex-col items-center">
                      {file.type.startsWith('image/') ? (
                        <Image
                          src={previewUrls[index]}
                          alt={`Preview ${index + 1}`}
                          className="max-w-full h-auto rounded-md border shadow-md"
                          width={150}
                          height={150}
                        />
                      ) : file.type.startsWith('video/') ? (
                        <video
                          src={previewUrls[index]}
                          controls
                          className="max-w-full h-auto rounded-md border shadow-md"
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
                      <p className="text-xs mt-1 text-center">
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your project..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isMutating}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isMutating || !githubLink || !title}
            >
              {isMutating ? 'Submitting...' : 'Submit Project'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmissionForm;