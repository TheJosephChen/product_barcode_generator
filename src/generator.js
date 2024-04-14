function GenerateBarcodes(e, tableState, setLotNo, setBarcode) {

    const name = e.target.elements.name.value || "";
    const internalId = e.target.elements.internalId.value || "";
    const addgeneId = e.target.elements.addgeneId.value || "";
    const isotype = e.target.elements.isotype.value || "";
    const conc = e.target.elements.conc.value || "";
    const amt = e.target.elements.amt.value || "";
    const storage = e.target.elements.storage.value || "";
    const rows = parseInt(e.target.elements.rows.value) || 0;

    const initialLotNo = parseInt(e.target.elements.lotNoStart.value);
    const initialBarcode = parseInt(e.target.elements.barNoStart.value);

    const tableArray = [...tableState];

    const newBar = initialBarcode + rows;
    const newLot = initialLotNo + 1;

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
        for (var i=initialBarcode; i < newBar; i++) {
            tableArray.push([name, 
            internalId, 
            addgeneId, 
            initialLotNo, 
            isotype, 
            conc, 
            amt, 
            storage, 
            i]);
        }
        setLotNo(newLot);
        setBarcode(newBar);
    }

    populateTableArray();
    const table = renderTable();
    return [table, tableArray, newLot, newBar]
}

export default GenerateBarcodes;