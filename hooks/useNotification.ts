import { useGlobalStore } from '@/global';

export const useNotification = () => {
  const { token } = useGlobalStore();

  async function onSendNotification(title: string, body: string, data?: any) {
    const message = {
      to: token,
      sound: 'default',
      title,
      body,
      data,
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  return { onSendNotification };
};
