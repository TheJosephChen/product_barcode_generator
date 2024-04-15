function GenerateBarcodes(e, tableState, setLotNo, setBarcode) {

    const name = e.target.elements.name.value || "";
    const internalId = e.target.elements.internalId.value || "";
    const addgeneId = e.target.elements.addgeneId.value || "";
    const isotype = e.target.elements.isotype.value || "";
    const conc = e.target.elements.conc.value || "";
    const amt = e.target.elements.amt.value || "";
    const storage = e.target.elements.storage.value || "";
    const rows = parseInt(e.target.elements.rows.value) || 0;

    const initialLotNo = e.target.elements.lotNoStart.value || 0;
    const initialBarcode = e.target.elements.barNoStart.value || 0;

    const tableArray = [...tableState];

    const splitCode = (numberCode) => {
        const len = numberCode.length;
        var finalNonNumericIndex = -1;
        for (var i = 0; i < len; i++) {
            var char = numberCode[i];
            if (char >= '0' && char <= '9') {
                // this is a number. continue
                continue;
            } else {
                finalNonNumericIndex = i;
            }
        }
        if (finalNonNumericIndex === len - 1) {
            return ["", numberCode]
        }
        const prefix = numberCode.substring(0, finalNonNumericIndex + 1);
        const numeral = parseInt(numberCode.substring(finalNonNumericIndex + 1));
        return [prefix, numeral];
    }

    const padZeros = (numberCode, prefix, numeral) => {
        const len = numberCode.length;
        const unpaddedLen = (prefix + numeral).length;
        if (unpaddedLen < len) {
            const diff = len - unpaddedLen;
            for (var i=0; i < diff; i++) {
                prefix += "0";
            }
        }
        return prefix + numeral;

    }

    const [lotPrefix, lotNumeral] = splitCode(initialLotNo);
    const [barPrefix, barNumeral] = splitCode(initialBarcode);
    const newLot = padZeros(initialLotNo, lotPrefix, lotNumeral + 1);
    const newBar = barNumeral + rows;

    const renderTable = () => {
        return (
            <tbody>
                {tableArray.map(x => createTableRow(x))}
            </tbody>   
        )
    }
    const createTableRow = (row) => {
        return (
            <tr key={row[8]}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
                <td>{row[4]}</td>
                <td>{row[5]}</td>
                <td>{row[6]}</td>
                <td>{row[7]}</td>
                <td>{row[8]}</td>
            </tr>
        )
    }

    const populateTableArray = () => {
        for (var i=barNumeral; i < newBar; i++) {
            tableArray.push([name, 
            internalId, 
            addgeneId, 
            initialLotNo, 
            isotype, 
            conc, 
            amt, 
            storage, 
            padZeros(initialBarcode, barPrefix, i)]);
        }
    }

    populateTableArray();
    const table = renderTable();
    return [table, tableArray, newLot, padZeros(initialBarcode, barPrefix,  newBar)]
}

export default GenerateBarcodes;