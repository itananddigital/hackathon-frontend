import { toast } from 'sonner';

export const handleErrorToast = (
  err: any,
  defaultMessage = 'An error occurred'
) => {
  let title = defaultMessage;
  let description = '';

  if (err?.response?.data) {
    const responseData = err.response.data;

    let parsedData = responseData;
    if (typeof responseData === 'string') {
      try {
        parsedData = JSON.parse(responseData);
      } catch (parseError) {
        console.error('Failed to parse responseData:', parseError);
      }
    }

    if (parsedData.message) {
      title = parsedData.message;
      description = parsedData.title || parsedData.message;
    } else if (parsedData._server_messages) {
      try {
        const messages = JSON.parse(parsedData._server_messages);
        title = Array.isArray(messages) ? messages.join(', ') : messages;
        description = title;
      } catch (parseError) {
        console.error('Failed to parse _server_messages:', parseError);
        title = 'Failed to parse server error';
      }
    } else if (typeof parsedData === 'object' && parsedData !== null) {
      title = JSON.stringify(parsedData);
      description = title;
    }
  } else if (err instanceof Error) {
    title = err.message;
    description = err.message;
  }

  let finalTitle = title;
  try {
    const parseMessage = JSON.parse(title);
    finalTitle = parseMessage.message || title;
  } catch (e) {
    finalTitle = title;
  }

  toast.error(finalTitle, {
    description: 'Please try again later',
    duration: 3000,
    action: {
      label: 'Close',
      onClick: () => toast.dismiss(),
    },
  });
};