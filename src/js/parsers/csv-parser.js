export class CSVParser {
    static parseFile(fileContent, selectedExchange) {
        return new Promise((resolve, reject) => {
            let processedContent = fileContent;
            
            // Pre-procesamiento especial para Libertex
            if (selectedExchange === 'libertex') {
                processedContent = this.preprocessLibertexText(fileContent);
            }

            Papa.parse(processedContent, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const cleanData = results.data.filter(row => 
                        Object.values(row).some(val => val !== '')
                    );
                    resolve({ data: cleanData, headers: results.meta.fields });
                },
                error: (err) => reject(new Error(`Error al parsear el archivo: ${err.message}`))
            });
        });
    }

    static preprocessLibertexText(text) {
        const lines = text.split('\n');
        const processedLines = [];

        const headerLineIndex = lines.findIndex(line => 
            line.trim().startsWith('Instrumento')
        );
        
        if (headerLineIndex === -1) {
            throw new Error('No se encontró la fila de encabezado "Instrumento".');
        }
        
        const header = lines[headerLineIndex].trim().replace(/\s{2,}/g, ',');
        processedLines.push(header);

        for (let i = headerLineIndex + 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.length === 0 || line.startsWith('Total:') || 
                line.startsWith('Póngalo claro')) continue;
            
            const csvLine = line.replace(/\s{2,}/g, ',');
            processedLines.push(csvLine);
        }

        return processedLines.join('\n');
    }
}