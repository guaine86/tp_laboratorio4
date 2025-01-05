const magicNumbers = {
    pdf: '25504446',  // PDF
    jpg: 'ffd8ff',    // JPEG
    png: '89504e47',  // PNG
    doc: 'd0cf11e0',  // DOC (OLE Compound File)
    docx: '504b0304', // DOCX (ZIP based)
    odt: '504b0304'   // ODT (ZIP based)
};

// Función para verificar el número mágico
function checkMagicNumber(buffer) {
    const hexMagicNumber = buffer.toString('hex', 0, 4);
    for (const magic of Object.values(magicNumbers)) {
        if (hexMagicNumber.startsWith(magic)) {
            return true;
        }
    }
    return false;
}

module.exports = checkMagicNumber;

// import { fileTypeFromBuffer } from "file-type";
// import fs from "fs";

// export const fileFilter = async (req, file, cb) => {
 
//     const filePath = req.file.path;
//     const buffer = req.file.buffer; //fs.readFileSync(filePath); 
//     const type = await fileTypeFromBuffer(buffer);
//     const allowedTypes = ["image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.oasis.opendocument.text", "application/pdf"];
    
//     if (!type || !allowedTypes.includes(type.mime)){
//         return cb(new Error("Invalid file type"));
//     }else{
//         return cb(null, true);
//     }

//     //   if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
//     //     cb(null, true);
//     //   } else {
//     //     cb(new Error('Invalid file type, only PNG and JPEG is allowed!'), false);
//     //   }
// };

// async function fileValidation(req, res, next){
//     try {
//         const filePath = req.file.path;
//         const buffer = fs.readFileSync(filePath); //req.file.buffer;
//         const type = await fileTypeFromBuffer(buffer);
//         const allowedTypes = ["image/jpeg", "image/png", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.oasis.opendocument.text", "application/pdf"];
        
//         if (!type || !allowedTypes.includes(type.mime)){
//             return next(new Error("Invalid file type"));
//         }

//         return next();
//     } catch (error) {
//         return next(new Error("Internal server error"));
//     }
// }



// Sugerencia:
// si almacena su archivo en la memoria, en lugar de en el almacenamiento en disco, 
// puede acceder a los datos del búfer directamente desde allí 'req.file.buffer'
// en lugar de usar 'readFileSync'