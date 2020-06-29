//   function for Data plotting
function getPlot(id) {

// getting data from the json file
d3.json("../Data/samples.json").then((data) => {
    var metadata = data.metadata
  console.log(metadata);
  var jsonsample = data.samples

 // filter sample values by id 
 var samples = metadata.filter(sample1 => sample1.id == id)
 var wfreq = samples.wfreq
 var jsonsamples = jsonsample.filter(i => i.id == id)
 var result = samples[0];
 var jsonsamples = jsonsamples[0];     
 console.log(result);   

 // Get the top 10 samples
var sample_values = (jsonsamples.sample_values).slice(0, 10).reverse();

// top 10 otu ids OTU & reverse. 
var OTU_top10 = (jsonsamples.otu_labels.slice(0, 10)).reverse();
        
var OTU_id = OTU_top10.map(d => "OTU " + d)

// top 10 plot labels 
var labels = jsonsamples.otu_labels.slice(0, 10);


// creat trace variable
var trace_bar = {
    x: sample_values,
    y:OTU_id,
    text: labels,
    type: "bar",
    orientation: "h"
};
// data, layout
var data = [trace_bar];
var layout = {
  title: "OTU",
  yaxis:{
    tickmode:"linear",
  },
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 40
  }
};

// ploting
Plotly.newPlot("bar", data, layout);



// bubble plot
var layout_bubble= {
  xaxis:{title: "OTU ID"},
  height: 500,
  width: 500
};

var data1 = [{
  x: OTU_id,
  y: sample_values,
  text: labels,
  mode: "markers",
 marker: {size:sample_values, color:OTU_id, colorscale:"Earth"} 
}];
Plotly.newPlot("bubble", data1, layout_bubble); 

 
// The guage chart

// var data_g = [{
// domain: {x: [0], y: [0]},
// value:  wfreq,
// title: "Gauge",
// type: "scatter",
// mode: "gauge+number",
// gauge: { axis: { range: [null, 9] },
//          steps: [
//           { range: [0, 2], color: "yellow" },
//            { range: [2, 4], color: "cyan" },
//            { range: [4, 6], color: "teal" },
//           { range: [6, 8], color: "lime" },
//            { range: [8, 9], color: "green" },
//          ]}
    
//  }];
// var layout_g = { 
//   width: 700, 
//    height: 600, 
//   margin: { t: 20, b: 40, l:100, r:100 } 
// };
// Plotly.newPlot("gauge", data_g, layout_g);
});
}



// getting data
function getInfo(id) {

// read the json file
d3.json("samples.json").then((data)=> {

// metadata info for the demographic panel
var metadata = data.metadata;
console.log(metadata)

// filter meta data info by id
var result = metadata.filter(meta => meta.id.toString() === id)[0];

var demographicInfo = d3.select("#sample-metadata");
demographicInfo.html("");

// grab demographic data
Object.entries(result).forEach((key) => {   
      demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
});
});
}

//function for change event
function optionChanged(id) {
getPlot(id);
getInfo(id);
}

function init() {
// select dropdown menu 
var dropdown = d3.select("#selDataset");

// read the data 
d3.json("samples.json").then((data)=> {
console.log(data)

// id data for dropdwown menu
data.names.forEach(function(name) {
  dropdown.append("option").text(name).property("value");
});

// call the functions to display the data and the plots to the page
getPlot(data.names[0]);
getInfo(data.names[0]);
});
}

init();

getPlot(940)
