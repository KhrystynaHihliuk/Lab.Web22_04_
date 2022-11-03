

/*-------------------------------------------------------------------------*/


function generate_year_range(start, end) {
    var years = "";
    for (var year = start; year <= end; year++) {
        years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
}

today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");


createYear = generate_year_range(1970, 2050);
/** or
 * createYear = generate_year_range( 1970, currentYear );
 */

document.getElementById("year").innerHTML = createYear;

var calendar = document.getElementById("calendar");
var lang = calendar.getAttribute('data-lang');

var months = "";
var days = "";

var monthDefault = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var dayDefault = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

if (lang == "en") {
    months = monthDefault;
    days = dayDefault;
} else if (lang == "id") {
    months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    days = ["Ming", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
} else if (lang == "fr") {
    months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
} else {
    months = monthDefault;
    days = dayDefault;
}


var $dataHead = "<tr>";
for (dhead in days) {
    $dataHead += "<th class='data-day' data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";

//alert($dataHead);
document.getElementById("thead-month").innerHTML = $dataHead;


monthAndYear = document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);



function next() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}

function jump() {
    currentYear = parseInt(selectYear.value);
    currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

    var firstDay = ( new Date( year, month ) ).getDay();

    tbl = document.getElementById("calendar-body");


    tbl.innerHTML = "";


    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

    // creating all cells
    var date = 1;
    for ( var i = 0; i < 6; i++ ) {

        var row = document.createElement("tr");


        for ( var j = 0; j < 7; j++ ) {
            if ( i === 0 && j < firstDay ) {
                cell = document.createElement( "td" );
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                cell = document.createElement("td");
                cell.setAttribute("data-date", date);
                cell.setAttribute("data-month", month + 1);
                cell.setAttribute("data-year", year);
                cell.setAttribute("data-month_name", months[month]);
                cell.className = "date-picker";
                cell.innerHTML = "<span>" + date + "</span>";

                if ( date === today.getDate() && year === today.getFullYear() && month === today.getMonth() ) {
                    cell.className = "date-picker selected";
                }
                row.appendChild(cell);
                date++;
            }


        }

        tbl.appendChild(row);
    }

}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}


const ctx = document.getElementById('circle-chart').getContext('2d');

const gradient1 = ctx.createLinearGradient(0, 1, 1, 170);
gradient1.addColorStop(0.2, '#f83f49');
gradient1.addColorStop(0.3, '#f86623');
gradient1.addColorStop(0.75, '#ffcc00');
gradient1.addColorStop(1.0, '#f83f4a');
// gradient1.addColorStop(0.9, '#f84f3c');


// let MyChart = new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//         datasets: [{
//             cutout: '75%',
//             borderRadius:20,
//             data: [75,25],
//             backgroundColor: [
//                 gradient1,
//                 'transparent'
//             ],
//
//             hoverOffset: 4
//         }],
//         options: {
//
//             responsive: true,
//             legend: {
//                 display: false
//             },
//         }
//     },
//
// });
const data1 = {
    datasets: [{
        cutout: '75%',
            borderRadius:20,
            data: [75,25],
            backgroundColor: [
                gradient1,
                'transparent'
            ],

            hoverOffset: 4
    }]
};

//plugin block
const counter1 = {
    id: 'counter1',
    beforeDraw ( chart, args, options ) {
        const { ctx, chartArea: { top, right, bottom, left, width, height }  } = chart;
        ctx.save();
        var fontSize = (height / 70).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        var text = "75%",
        textX = Math.round((width - ctx.measureText(text).width) / 1.8),
            textY = height / 1.8;
        ctx.fillStyle = "#f85439";
        ctx.fillText(text, textX, textY);
    }
};
//options block
// const options_d = {
//     tooltips: {enabled: false},
//     hover: {mode: null},
//     events: [],
//     maintainAspectRatio: false,
// };
var chart = new Chart(document.getElementById('circle-chart'),  {
    type: 'doughnut',
    data: data1,
    options:{
        responsive: true
    },
    legend: {
        display: false
    },
    plugins: [counter1]
});
// MyChart.pluginService.register({
//     beforeDraw: function(chart) {
//         var width = chart.chart.width,
//             height = chart.chart.height,
//             ctx = chart.chart.ctx;
//
//         ctx.restore();
//         var fontSize = (height / 80).toFixed(2);
//         ctx.font = fontSize + "em Opens-serif";
//         ctx.textBaseline = "middle";
//
//         var text = "75%",
//             textX = Math.round((width - ctx.measureText(text).width) / 2),
//             textY = height / 1.9;
//         ctx.fillStyle = "#f85439";
//         ctx.fillText(text, textX, textY);
//         ctx.save();
//     }
// });
/*var chart = new Chart(document.getElementById('circle-chart'), {
    type: 'doughnut',
    data: data,

});*/



