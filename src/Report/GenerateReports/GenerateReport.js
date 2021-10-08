var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');


var fs = require('fs');
var path = require('path');
class GenerateReport {
    replaceErrors(key, value) {
        if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function (error, key) {
                error[key] = value[key];
                return error;
            }, {});
        }
        return value;
    }
    errorHandler(error) {
        console.log(JSON.stringify({ error: error }, this.replaceErrors));

        if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors.map(function (error) {
                return error.properties.explanation;
            }).join("\n");
            console.log('errorMessages', errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
        }
        throw error;
    }
    generator(patientName,age,date,ReferedBy,loc) {
        console.log(date)
        console.log('Location is',loc)

        var content = fs.readFileSync(path.resolve('/Users/ashutoshkumbhar/Desktop/hptl_dr_f1/hptl/src/Report/ReportsTemplates/demoReportWord.docx'), 'binary');

        var zip = new PizZip(content);
        var doc;
        try {
            doc = new Docxtemplater(zip);
        } catch (error) {
            // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
            this.errorHandler(error);
        }

        doc.setData({
            patientName: patientName,
            age:age,
            date: date,
            ReferedBy:ReferedBy
        });
         
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render()
        }
        catch (error) {
            // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
            this.errorHandler(error);
        }
         
        var buf = doc.getZip()
                     .generate({type: 'nodebuffer'});
        ///Users/ashutoshkumbhar/Desktop/hptl_dr_f1/hptl/src/Report/generated/ 
        // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
        console.log('Location existed',loc)
        fs.writeFileSync(path.resolve(`${loc}/${patientName}.docx`), buf);
    }

    
}
export default GenerateReport;