import React from 'react';
import backgroundImage from '../img/bg1.png';
import backgroundImage2 from '../img/bg2.png';
import Papa from "papaparse";
import { useEffect, useState } from 'react';


const Leaderboard = () => {

    const [backendData, setBackendData] = React.useState([]);

    useEffect(() => {
        const fetechData = async () => {
            const result = await fetch("http://localhost:3001/player_scores")
            const jsonResult = await result.json()
            setBackendData(jsonResult)
        }
        fetechData();
    }, []);

    // const [parsedData, setParsedData] = useState([]);

    // //State to store table Column name
    // const [tableRows, setTableRows] = useState([]);

    // //State to store the values
    // const [values, setValues] = useState([]);

    // useEffect(() => {
    //     Papa.parse(csvFile, {
    //         header: true,
    //         download: true,
    //         skipEmptyLines: true,
    //         complete: function (results) {
    //             const rowsArray = [];
    //             const valuesArray = [];
    //             // Iterating data to get column name and their values
    //             results.data.map((d) => {
    //                 rowsArray.push(Object.keys(d));
    //                 valuesArray.push(Object.values(d));
    //         });
    
        
    //         // Filtered Column Names
    //         setTableRows(rowsArray[0]);
            

    //         // Filtered Values
    //         setValues(valuesArray);

    //         // Sort the values array by score in descending order
    //         valuesArray.sort((a, b) => b[1] - a[1]);

    //         // Set the sorted values array
    //         setValues(valuesArray);
    //         //console.log(valuesArray);
    //         },

            
    //     });
    // }, [csvFile]);

    backendData.sort((a, b) => b.score - a.score);
    return (
        <div style={{ 
            textAlign: 'center', 
            backgroundImage: `url(${backgroundImage})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            padding: '20px', 
            height: '100vh' }}>
            
            <h1>Top 100 Best Players Record</h1>

            <div style={{ textAlign:'center' }}>
                <table style={{ tableLayout: "fixed",width:"100%" ,maxWidth:"500px", display:"block", backgroundImage: `url(${backgroundImage2})`,margin: '0 auto', borderCollapse: 'collapse' }}>
                    <thead style={{display:"block", width:"100%"}}>
                        <tr style={{display:"block", width:"100%"}}>
                            <th style={{ padding:'10px 10px', paddingRight:"50px", height:"50px", fontSize: 'larger', color:'gold', fontWeight: 'bold'}}>Rank</th>
                            <th style={{ padding:'10px 10px', paddingRight:"125px",textAlign:"left", border: '1px solid black', height:"50px", fontSize: 'larger' , color:'gold', fontWeight: 'bold'}}>Name</th>
                            <th style={{  padding:'10px 10px',textAlign:"left", height:"50px", width: '40%',fontSize: 'larger', color:'gold', fontWeight: 'bold' }}>Score</th>
                        </tr>
                    </thead>
                    
                    <tbody style={{ display:'block', height: '600px', overflowY: 'scroll'}}>
                        {backendData.slice(0, 100).map((data, index) => (
                            <tr key={index} style={{ display:"flex", width:"100%",textAlign:'center'}}>
                                <td style={{textAlign:"left", paddingLeft:"20px", display:"flex",border: '1px solid black', fontSize: 'medium', width: '20%', height: '50px' , color: index < 10 ? 'gold' : 'white', fontWeight: index < 10 ? 'bold' : 'normal'}}>{index + 1}</td>
                                <td style={{ textAlign:"left",paddingLeft:"20px",  display:"flex",border: '1px solid black', fontSize: 'medium', width: '40%', height: '50px' , color: index < 10 ? 'gold' : 'white', fontWeight: index < 10 ? 'bold' : 'normal'}}>{data.name}</td>
                                <td style={{  textAlign:"left",paddingLeft:"20px", display:"flex",border: '1px solid black', fontSize: 'medium', width: '40%', height: '50px' , color: index < 10 ? 'gold' : 'white', fontWeight: index < 10 ? 'bold' : 'normal'}}>{data.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;