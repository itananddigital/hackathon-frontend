
import { Card, CardBody } from "@chakra-ui/react";

export default function LoadingPage({ text = 'Loading...', ...props }: { text?: string }) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4" {...props}>
      <Card className="bg-gray-900 border-gray-800 shadow-lg">
        <CardBody className="p-6 flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-blue-600 border-gray-700 rounded-full animate-spin" />
          <p className="mt-4 text-gray-300 text-lg font-semibold">{text}</p>
        </CardBody>
      </Card>
    </div>
  );
}