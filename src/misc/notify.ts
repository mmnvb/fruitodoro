import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';

export async function notify(title: string, body: string): Promise<void> {
  let permissionGranted = await isPermissionGranted();

  if (!permissionGranted) {
    const permission = await requestPermission();
    permissionGranted = permission === 'granted';
  }

  if (permissionGranted) {
    sendNotification({ 
      title: title,
      body: body
    });
  }
}