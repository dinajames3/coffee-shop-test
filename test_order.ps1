$body = @{
    items = @(
        @{ id = 1; price = 24.00; quantity = 1 }
    )
    total = 24.00
    customer = @{ name = "Test User"; table = "T1" }
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost/bella-notte-api/orders.php" -Method Post -Body $body -ContentType "application/json"
$response | ConvertTo-Json
