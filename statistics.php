<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="css/statistics.css">
    <link href="https://cdn.datatables.net/v/dt/dt-2.0.1/r-3.0.0/datatables.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light ms-3">
    <a class="navbar-brand" href="#">WeatherCheck</a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            <a class="nav-item nav-link" href="index.php">Weather <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link active" href="#">Statistics</a>
            </div>
        </div>
    </nav>

    <div class="container">
        <h2 class='mb0'>Number of visitors: <span id='num_of_connections'></span></h2>
    </div>
    <div class="container">
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>6:00 - 15:00</th>
                    <th>15:00 - 21:00</th>
                    <th>21:00 - 24:00</th>
                    <th>24:00 - 6:00</th>
                </tr>
            </thead>
            <tbody>
                <!-- Tu môžete pridať riadky s ďalšími informáciami -->
                <tr>
                    <td><b>Visitors</b></td>
                    <td id='time_range_1'>...</td>
                    <td id='time_range_2'>...</td>
                    <td id='time_range_3'>...</td>
                    <td id='time_range_4'>...</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="container">
        <table id='destination-table'>
            <thead>
                <tr>
                    <th>Destination</th>
                    <th>Country</th>
                    <th>Number of searches</th>
                </tr>
            </thead>
            <tbody id='table_destination_body'>
                
            </tbody>
        </table>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.js"
        integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4=" crossorigin="anonymous">
        </script>
    <script src="https://cdn.datatables.net/v/dt/dt-2.0.1/r-3.0.0/datatables.min.js"></script>
    <script src='scripts/statistics.js'></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</body>
</html>