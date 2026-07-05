<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $firstName = htmlspecialchars($_POST['firstName']);
    $lastName = htmlspecialchars($_POST['lastName']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $service = htmlspecialchars($_POST['service']);
    $date = htmlspecialchars($_POST['date']);
    $message = htmlspecialchars($_POST['message']);

    $to = " leratonxumalo02@gmail.com";
    $subject = "New Photography Booking";

    $body = "
    New booking enquiry

    First Name: $firstName
    Last Name: $lastName
    Email: $email
    Phone: $phone

    Type of Shoot:
    $service

    Preferred Date:
    $date

    Message:
    $message
    ";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if(mail($to, $subject, $body, $headers)){
        echo "<script>
        alert('Message sent successfully!');
        window.location.href='index.html';
        </script>";
    } else {
        echo "<script>
        alert('Failed to send message.');
        history.back();
        </script>";
    }
}

?>
