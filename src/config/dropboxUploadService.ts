const fs = require('fs');
const path = require('path');
const { Dropbox } = require('dropbox');
import dotenv from 'dotenv';
dotenv.config();

// Initialize Dropbox client
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

export async function uploadFileToDropbox(file: Express.Multer.File, isProduct: boolean) {
  try {
    // Get the base name of the file (e.g., 'image.jpg')
    const fileName = path.basename(file.originalname);
    const folderName = isProduct ? "ProductImages" : "UserProfileImages";
    // Full path in Dropbox
    const dropboxPath = `/${folderName}/${fileName}`;
    // Read the image file as a buffer
    const fileContent = file.buffer;

    // Upload to Dropbox
    await dbx.filesUpload({
      path: dropboxPath,
      contents: fileContent,
      mode: 'add',
      autorename: true,
      mute: true
    });
    const sharedLinkResponse = await dbx.sharingCreateSharedLinkWithSettings({
        path: `/${folderName}/${fileName}`,
    });
    const directLink = sharedLinkResponse.result.url.replace('&dl=0', '&dl=1');

    return directLink
  } catch (error) {
    console.error('Error uploading file to Dropbox:', error);
  }
}