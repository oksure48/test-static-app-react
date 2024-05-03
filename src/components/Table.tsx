import DataTable from "react-data-table-component";
import { useState, useEffect } from 'react';

import axios from 'axios';

function Table() {

    const columns = [
    	{
            name: "Date",
            selector: (row: { date: any; }) => row.date,
            sortable: true
        },
        {
            name: "Temp C",
            selector: (row: { temperatureC: any; }) => row.temperatureC,
            sortable: true
        },
        {
            name: "Summary",
            selector: (row: { summary: any; }) => row.summary,
            sortable: true
        },
        {
            name: "Temp F",
            selector: (row: { temperatureF: any; }) => row.temperatureF,
            sortable: true
        },
    ];

    const rows = [
      {
        "date": "2024-05-01",
        "temperatureC": "37",
        "temperatureF": "98.6",
        "summary": "pretty warm out there"
      }
    ];

    const [data, setData] = useState(rows);
    
    useEffect(() => {
      axios
        .get("https://test-web-api-1.azurewebsites.net/WeatherForecast")
        .then(response => {
          console.log("setting response data");
          setData(response.data);
        })
        .catch(error => {
          console.error('Error fetching data', error);
        });
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        let searchValue: Boolean;
        let dateValue: Boolean;
        let temperatureCValue: Boolean;
        let summaryValue: Boolean;
        let temperatureFValue: Boolean;

        const newRows = data.filter((row) => {
          dateValue = row.date
            .toString()
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
          temperatureCValue = row.temperatureC
            .toString()
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
          summaryValue = row.summary
            .toString()
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
          temperatureFValue = row.temperatureF
            .toString()
           .toLowerCase()
            .includes(e.target.value.toLowerCase());
    
          if (dateValue) {
            searchValue = dateValue;
          } else if (temperatureCValue) {
            searchValue = temperatureCValue;
          } else if (summaryValue) {
            searchValue = summaryValue;
          } else {
            searchValue = temperatureFValue;
          }
    
          return searchValue;
        });

        setData(newRows);
    };

	return (
    	<>
            <div className="container d-flex justify-content-center my-5">
                <div className="input-group">
                <input
                    type="search"
                    className="form-control-sm border ps-3"
                    placeholder="Search"
                    onChange={handleSearch}
                />
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    fixedHeader
                    title="React-Data-Table-Component Tutorial."
                    pagination
                    selectableRows
                />
            </div>
        </>
    );
}

export default Table;