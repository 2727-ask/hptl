const fs = require('fs');
function Hello () {
    console.log(fs)
    fs.writeFileSync('Hello.docx','')
} 

export default Hello;
// Used to export the file into a .docx file
// Packer.toBuffer(doc).then((buffer) => {
//     fs.writeFileSync("My Document.docx", buffer);
// });
