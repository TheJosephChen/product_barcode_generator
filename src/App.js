import './App.css';
import { useState } from 'react';
import GenerateBarcodes from './generator';
import DownloadCSV from './downloadCsv';

function App() {
  const [tableState, setTableState] = useState([]);
  const [prevTableState, setPrevTableState] = useState();
  const [showUndo, setShowUndo] = useState(false);

  const [lotNo, setLotNo] = useState();
  const [barcode, setBarcode] = useState();

  const [productName, setProductName] = useState("productName");
  const [shipmentDate, setShipmentDate] = useState("shipmentDate");

  const [tableBody, setTableBody] = useState();
  const [prevTableBody, setPrevTableBody] = useState();


  const handleSubmit = (e) => {
    
    e.preventDefault();

    const [table, tableArray, newLot, newBar] = GenerateBarcodes(e, tableState, setLotNo, setBarcode);
    setProductName(e.target.elements.product.value);
    setShipmentDate(e.target.elements.shipment.value);
    setPrevTableBody(tableBody);
    setTableBody(table);
    setPrevTableState(tableState);
    setTableState(tableArray);
    resetInputFields();
    setShowUndo(true);

    window.alert(`Initial Lot No and Barcodes have changed. Please note these for future use: \n The next unused Lot No is ${newLot}\n The next unused Barcode No is ${newBar}`);
  }

  const handleDownload = () => {
    DownloadCSV(tableState, productName, shipmentDate);
  }

  const handleUndo = () => {
    setTableState(prevTableState);
    setTableBody(prevTableBody);

    setPrevTableState();
    setPrevTableBody();
    setShowUndo(false);
  }

  const resetInputFields = () => {
    document.getElementById("name").value = "";
    document.getElementById("internalId").value = "";
    document.getElementById("addgeneId").value = "";
    document.getElementById("isotype").value = "";
    document.getElementById("conc").value = "";
    document.getElementById("amt").value = "";
    document.getElementById("storage").value = "";
    document.getElementById("rows").value = "";
 }

  return (
    <div className="App">
      <div className="appContainer">
        <form onSubmit={handleSubmit}>
          <h1>Barcode Generation Tool</h1>
          <div className="form-row">
            <div className="col">
              <label>
                Initial Lot No:
                <input
                  id="lotNoStart"
                  type="text"
                  value={lotNo}
                />
              </label>
            </div>
            <div className="col">
              <label>
                Initial Barcode No:
                <input
                  id="barNoStart"
                  type="text"
                  value={barcode}
                />
              </label>
            </div>
          </div>
          <div className='numberMessage'>
            <b>Note:</b> Initial Lot No and Initial Barcode No are automatically updated whenever you press the 'Add Product' button.
          </div>
          <div className="form-row">
            <div className="col">
              <label>
                Product Name:
                <input
                  id="name"
                  type="text"
                />
              </label>
            </div>
            <div className="col">
              <label>
                IPI ID:
                <input
                  id="internalId"
                  type="text"
                />
              </label>
            </div>
            <div className="col">
              <label>
                Addgene ID:
                <input
                  id="addgeneId"
                  type="text"
                />
              </label>
            </div>
            <div className="col">
              <label>
                Source Species Isotype:
                <input
                  id="isotype"
                  type="text"
                />
              </label>
            </div>
            <div className="col">
              <label>
                Concentration:
                <input
                  id="conc"
                  type="text"
                />
              </label>
            </div>
            <div className="col">
              <label>
                Amount:
                <input
                  id="amt"
                  type="text"
                />
              </label>
            </div>
            <div className="col">
              <label>
                Storage Temp:
                <input
                  id="storage"
                  type="text"
                />
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="col">
              <label>
                Barcodes to Generate:
                <input
                  id="rows"
                  type="number"
                />
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="col">
              <label>
                Product Name (Optional):
                <input
                  id="product"
                  type="text"
                />
              </label>
            </div>
            <div className="col">
              <label>
                Product Shipment Date (Optional):
                <input
                  id="shipment"
                  type="text"
                />
              </label>
            </div>
          </div>
          <button type="submit">Add Product</button>
          {showUndo && (
            <button onClick={handleUndo}>Undo</button>
          )}
        </form>

        {tableBody && (
          <>
            CSV Preview:
            <button onClick={handleDownload}>Download CSV</button>
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>IPI ID</th>
                    <th>Addgene ID</th>
                    <th>Lot No</th>
                    <th>Source Species Isotype</th>
                    <th>Conc</th>
                    <th>Amount</th>
                    <th>Storage</th>
                    <th>Barcode</th>
                    </tr>
                </thead>
                {tableBody}
            </table>
          </>
        )}
        
      </div>
    </div>
  );
}

export default App;
