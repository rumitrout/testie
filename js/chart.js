$(function() {
    var mpn_alnum = $('#mpn_alnum').val();
    var url="/api/seller_part/get_chart";
    var data = { 
                    
                "mpn_alnum" : mpn_alnum
                    
          };
        $.post(url, data)
              .done(function(response) {
                  if(response && response.status) {
                      if(response.status == 'success') {
                          var time = response.time;
                          var quantity = response.quantity;
                         
                            new Chart(document.getElementById("chart"), {
                            type: 'line',
                            data: {
                              labels: time,
                              datasets: [{ 
                                  data: quantity,
                                  label: "Quantity",
                                  borderColor: "#3e95cd",
                                  fill: false
                                }
                              ]
                            },
                            options: {

                              title: {
                                display: true,
                                text: 'Quantity(Authorised) per Month'
                              },
                              scales: {
                                  xAxes: [{
                                      type: 'time',
                                      time: {
                                          unit: 'month',
                                          unitStepSize: 1,
                                          displayFormats:{
                                            'week': 'MMM YY'
                                          },
                                          tooltipFormat: 'DD MMM YYYY'
                                      }
                                  }]
                              },
                               tooltips: {
                                  custom: function(tooltip) {
                                    if (!tooltip) return;
                                    // disable displaying the color box;
                                    tooltip.displayColors = false;
                                  }
                              }
                              
                            }
                          });      
                      }
                      else{
                         $('.chart-container').html('- No Data -');
                      }
                      
                  }
                 
        });

       
});

    