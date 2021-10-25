import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'


export default function MainPage() {
    const [data, setData] = useState([])
    const [chart, setChart] = useState('')
    const [charName, setCharName] = useState([])
    const [charPrice, setCharPrice] = useState([])
    useEffect(() => {
        axios.get("https://itunes.apple.com/us/rss/toppaidapplications/limit=100/json")
            .then((response) => {
                setData(response.data.feed.entry)
                console.log(response.data.feed.entry)


            })
    }, [])
    function getCharvalues() {


        setChart("error")
        var i, j, text = [], prices = [], result;
        for (i = 0; i < data.length; i++) {
            text.push(data[i]["im:price"].attributes.amount)
        }
        for (j = 0; j < data.length; j++) {
            prices.push(data[j].title.label)
        }
        setCharPrice(text)
        setCharName(prices)

     
    }
    console.log(charPrice)

    var cPrice = document.getElementsByClassName("card-price").value
    console.log(cPrice)
    function priceSort() {
        var list, i, switching, b, a, shouldSwitch;
        list = document.querySelector("#divided");
        switching = true;

        while (switching) {
            switching = false;
            a = list.getElementsByClassName("card");
            b=list.getElementsByClassName("card-price")
            for (i = 0; i < (b.length - 1); i++) {
                shouldSwitch = false;
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                a[i].parentNode.insertBefore(a[i + 1], a[i]);
                switching = true;
            }
        }
    }
    function catSort() {
        var list, i, switching, b, a, shouldSwitch;
        list = document.querySelector("#divided");
        switching = true;

        while (switching) {
            switching = false;
            a = list.getElementsByClassName("card");
            b=list.getElementsByClassName("card-label")
            for (i = 0; i < (b.length - 1); i++) {
                shouldSwitch = false;
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                a[i].parentNode.insertBefore(a[i + 1], a[i]);
                switching = true;
            }
        }
    }
    function btnSort() {
        var list, i, switching, b, a, shouldSwitch;
        list = document.querySelector("#divided");
        switching = true;

        while (switching) {
            switching = false;
            a = list.getElementsByClassName("card");
            b=list.getElementsByClassName("card-title")
            for (i = 0; i < (b.length - 1); i++) {
                shouldSwitch = false;
                if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {
                a[i].parentNode.insertBefore(a[i + 1], a[i]);
                switching = true;
            }
        }
    }

    
    function doSearch() {
        var input, filter, found, div, element, row, i, j;
        input = document.getElementById("searchTerm");
        filter = input.value.toUpperCase();
        div = document.querySelector("#divided");
        element = div.getElementsByClassName("card");
        for (i = 0; i < element.length; i++) {
            row = element[i].getElementsByTagName("h5");
            for (j = 0; j < row.length; j++) {
                if (row[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                }
            }
            if (found) {
                element[i].style.display = "";
                setCharName(element[i])
                found = false;
            } else {
                element[i].style.display = "none";
            }
        }
        var input = document.getElementById("searchTerm");
        var  filter = input.value.toUpperCase();
         var a,b,c,d, selName=[], selectPrice=[], selectName=[], result;
         for(a=0; a<data.length; a++){
    
             if(data[a].title.label.toUpperCase()===filter){
                 selName.push(data[a].title.label)
                 setCharName(selName)
                 selectPrice.push(data[a]["im:price"].attributes.amount)
                 setCharPrice(selectPrice)
             }
            
         }
        
         console.log(charName)
    }
    console.log(charName)

    return (
        <div>
            <button className="btn-primary" data-testid="btn" onClick={getCharvalues}>View Charts</button>
            {chart ? (

                <div className="charts">

                    <Pie
                        data={{
                            labels: charName,
                            datasets: [
                                {
                                    label: 'no of apps',
                                    data: charPrice,
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },

                            ],
                        }}
                        height={400}
                        width={600}
                    />
                </div>
            ) : ""}<br></br>


            <div class="dropdown">
                <button class="dropbtn" title="drop-btn">Sort By</button>
                <div class="dropdown-content" id="sort-content">
                    <a onClick={btnSort}>Name</a>
                    <a onClick={priceSort}>Price</a>
                    <a onClick={catSort}>Category</a>

                </div>
            </div>
            <p>Search: <input type="text" id="searchTerm" onKeyPress={doSearch} /></p>

            <div id="divided">

                {
                    data.map((row) => (
                        <div key={row.title.label} className="card-main">
                            <div className="card">
                            <img className="card-img" src={row["im:image"][0].label}></img>
                                <h5 className="card-title">{row.title.label}</h5>
                                <div className="card-label">{row.category.attributes.label}</div>
                                <p className="card-price" value={row["im:price"].attributes.amount}>{row["im:price"].label}</p>
                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}