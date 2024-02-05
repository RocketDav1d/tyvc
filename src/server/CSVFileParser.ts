import fs from 'fs';

import formidable from 'formidable';
import type { NextApiRequest } from 'next';
import Papa from 'papaparse';

export class CSVFileParser {
  req: NextApiRequest;

  constructor(req: NextApiRequest) {
    this.req = req;
  }

  public async parseCSVFile(): Promise<{ data: any[]; errors: string[] }> {
    return new Promise((resolve) => {
      const form = new formidable.IncomingForm({
        encoding: 'utf-8',
      });

      form.parse(this.req, async function (err, fields, files) {
        let _items: any[] = [];
        let _errors: string[] = [];

        const f = files.file![0] as formidable.File;
        const filecontent = fs.createReadStream(f.filepath);
        filecontent.setEncoding('utf8');

        Papa.parse(filecontent, {
          delimiter: ';',
          encoding: 'utf-8',
          header: true,
          transformHeader: (header) => header.trim(),
          complete: async function (results, file) {
            _items = results.data as any[];
            if (results.errors.length > 0) {
              results.errors.forEach((error) => {
                _errors.push(
                  `Error in row ${error.row}, column "${error.code}": ${error.message}`
                );
              });
            }
            resolve({ data: _items, errors: _errors });
          },
          error: function (error, file) {
            _errors.push(`Error while parsing CSV: ${error.message}`);
            resolve({ data: _items, errors: _errors });
          },
        });
      });
    });
  }
}
