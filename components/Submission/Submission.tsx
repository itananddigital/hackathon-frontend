'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpload } from '@/hooks/useUpload';
import { postFetcher } from '@/lib/api/swrFetcher';
import { getCookie } from '@/utils/cookies';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import useSWRMutation from 'swr/mutation';
import { handleErrorToast } from '../common/HandleError';

const SubmissionForm = () => {
  const [githubLink, setGithubLink] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const { trigger, error, isMutating } = useSWRMutation(
    '/api/method/hackathon.API.submissions.submit_submission',
    postFetcher
  )
  const { trigger: uploadCall } = useUpload();
  const currentUser = getCookie('email')

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

    const url: string[] = [];

    try {
      await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          const res = await uploadCall({formData});
          url.push(res.message.file_url);
        })
      );
    } catch (err) {
      return toast('Failed to upload files', {
        description: err instanceof Error ? err.message : 'Upload failed',
      });
    }


    try {
      await trigger({ link: githubLink, files: url, user: currentUser });
      toast('Successfully submitted');
      setGithubLink('');
      setFiles([]);
    } catch (err) {
      handleErrorToast(err)
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full max-w-lg bg-gray-900 border-gray-800 shadow-lg">
      <CardHeader className="border-b border-gray-800">
        <CardTitle className="text-2xl font-bold text-white">
          Project Submission
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="github" className="text-gray-300">
              GitHub Link
            </Label>
            <Input
              id="github"
              type="url"
              placeholder="https://github.com/username/repo"
              value={githubLink}
              onChange={(e) => setGithubLink(e.target.value)}
              disabled={isMutating}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="media" className="text-gray-300">
              Upload Images or Videos
            </Label>
            <Input
              id="media"
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileChange}
              disabled={isMutating}
            />
            {files.length > 0 && (
              <p className="text-sm text-gray-400">
                Selected: {files.length} file(s)
              </p>
            )}

            {/* Preview Section */}
            {previewUrls.length > 0 && (
              <div className="mt-4">
                <Label className="text-gray-300">Previews</Label>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {files.map((file, index) => (
                    <div key={index} className="flex flex-col items-center">
                      {file.type.startsWith('image/') ? (
                        <Image
                          src={previewUrls[index]}
                          alt={`Preview ${index + 1}`}
                          className="max-w-full h-auto rounded-md border border-gray-700 shadow-md"
                          style={{ maxHeight: '200px' }}
                          width={150}
                          height={150}
                        />
                      ) : file.type.startsWith('video/') ? (
                        <video
                          src={previewUrls[index]}
                          controls
                          className="max-w-full h-auto rounded-md border border-gray-700 shadow-md"
                          style={{ maxHeight: '200px' }}
                        />
                      ) : <></>}
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
              </div>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isMutating || !githubLink}
            className="w-full disabled:cursor-not-allowed"
          >
            {isMutating ? 'Saving...' : 'Save Submission'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default SubmissionForm