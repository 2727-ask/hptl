<template>
  <h1 style="color: white">Hello World Demo</h1>
  <div class="hello">
    <button class="btn" v-on:click="createDoc()">DOWNLOAD DOCUMENT</button>
  </div>
  <document>Hello</document>
</template>
<script>
import { Document, Paragraph, Packer, TextRun } from "docx";
import { saveAs } from "file-saver";
// import * as fs from 'fs-web';
import * as fs from 'file-system';



export default {
  components: {
    Document,
  },

  methods: {
    createDoc() {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun("Hello World"),
                  new TextRun({
                    text: "Foo Bar",
                    bold: true,
                  }),
                  new TextRun({
                    text: "\tGithub is the best",
                    bold: true,
                  }),
                ],
              }),
            ],
          },
        ],
      });
      console.log(doc);
      fs.mkdir('/Users/ashutoshkumbhar/Desktop/').then((doc)=>{
          console.log('Done',doc)
      })

    //   this.saveDocumentToFile(doc, `vuedoc.docx`);
    },

    saveDocumentToFile(doc, fileName) {
      const mimeType =
        "application/vnd.openxmlformats officedocument.wordprocessingml.document";
      Packer.toBlob(doc).then((blob) => {
        const docblob = blob.slice(0, blob.size, mimeType);
        saveAs(docblob, fileName);
      });
    },
  },
};
</script>
