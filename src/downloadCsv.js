function DownloadCSV(tableData, productName, shipmentDate) {

    let csvContent = "data:text/csv;charset=utf-8," 
    + "Name, IPI ID, Addgene ID, Lot No, Source Species Isotype, Conc, Amt, Storage, Barcode\n"
    + tableData.map(e => e.join(",")).join("\n");

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${productName}_addgene_${shipmentDate}.csv`);
    document.body.appendChild(link); // Required for FF

    link.click();

}

export default DownloadCSV;