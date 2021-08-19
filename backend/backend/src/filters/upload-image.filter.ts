import { BadRequestException } from '@nestjs/common';

export const UploadImageEntityFilter = (req, file, callback) => {
    if (req.headers.uploadforentity === 'resource') {
        if (
            !file.originalname.match(
                /\.(jpeg|jpg|JPG|png|gif)$/,
            )
        ) {
            return callback(
                new BadRequestException(
                    'error.upload.file_extension_not_allowed',
                ),
                false,
            );
        }
    }
    callback(null, true);
};