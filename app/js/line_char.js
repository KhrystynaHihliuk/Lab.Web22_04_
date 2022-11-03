$(document).ready(function(){
    $.getJSON("data.json", function (data){
        let data_v = '';
        $.each(data, function (key, value){
            data_v += '<div class="line-chart-block ">';
            data_v += '<div class="line-chart-block-date"> '+value.date+'';
            data_v += '</div>';
            data_v += '<div class="line-chart-block-perc">'+value.percent+'</div>';
            data_v += '</div>';
        });
        $('#line-chart-bottom').append(data_v);

    });

});
