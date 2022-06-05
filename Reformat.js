const data = [
    ["1","1","1","0"],
    ["1","0","1","1"],
    ["1","1","1","1"],
    ["1","1","0","1"],
    ["1","1","0","1"],
]

var array = []
data.map((row, i) => {
    const dict = new Object()  
    dict.id = i+1

    row.map((item, j) => {
        dict["col"+String(j+1)] = item
    })
    array.push(dict)
})

console.log(array);


const columns = [];
for (let i = 0; i < data[0].length; i++) {
    console.log(i)
    const dict = {};

    dict.name = "col" + String(i+1);
    dict.selector = row => row["col" + String(i+1)];
    dict.conditionalCellStyles = [
        {
            when: row => row["col" + String(i+1)] === "1",
            style: {
                backgroundColor: "green",
                color: "white"
            },
            when: row => row["col" + String(i+1)] === "0",
            style: {
                backgroundColor: "red",
                color: "white"
            }
        }
    ];

    columns.push(dict);

    
}
console.log(columns);