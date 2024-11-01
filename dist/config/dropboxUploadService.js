"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileToDropbox = uploadFileToDropbox;
const fs = require('fs');
const path = require('path');
const { Dropbox } = require('dropbox');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize Dropbox client
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });
function uploadFileToDropbox(localFilePath, isProduct) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get the base name of the file (e.g., 'image.jpg')
            const fileName = path.basename(localFilePath);
            const folderName = isProduct ? "ProductImages" : "UserProfileImages";
            // Full path in Dropbox
            const dropboxPath = `/${folderName}/${fileName}`;
            // Read the image file as a buffer
            const fileContent = fs.readFileSync(localFilePath);
            // Upload to Dropbox
            yield dbx.filesUpload({
                path: dropboxPath,
                contents: fileContent,
                mode: 'add',
                autorename: true,
                mute: true
            });
            const sharedLinkResponse = yield dbx.sharingCreateSharedLinkWithSettings({
                path: `/${folderName}/${fileName}`,
            });
            const directLink = sharedLinkResponse.result.url.replace('&dl=0', '&dl=1');
            return directLink;
        }
        catch (error) {
            console.error('Error uploading file to Dropbox:', error);
        }
    });
}
//# sourceMappingURL=dropboxUploadService.js.map