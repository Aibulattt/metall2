<?php

ini_set('display_errors','On');
error_reporting('E_ALL');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');

try {
    //Server settings
   
    $mail->SMTPDebug = 2;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host = 'mail.spb-metall.info';                     //Set the SMTP server to send through
    $mail->SMTPAuth = true;                                   //Enable SMTP authentication
    $mail->Username = 'noreply@spb-metall.info';                     //SMTP username
    $mail->Password = 'gou8Ghuv@';                               //SMTP password
    $mail->SMTPSecure = 'startls';            //Enable implicit TLS encryption
    $mail->Port = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    $username = $_POST['name'];
    $userEmail = $_REQUEST['email'];
    $userMessage = $_POST['message'];

    //Recipients
    $mail->setFrom('noreply@spb-metall.info');
    $mail->addAddress('office@spb-metall.info');     //Add a recipient          
    $mail->addReplyTo('office@spb-metall.info', 'Information');
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Сообщение с сайта spb-metall';
    $mail->Body = "<h3>Данные пользоваетеля:</h3> <br> Имя пользователя:  $username,<br>\n email пользователя; $userEmail,<br>\n Сообщение пользователя: $userMessage";
    $mail->AltBody = 'Данные пользоваетеля: Имя пользователя:  $username,\n email пользователя; $userEmail,\n Сообщение пользователя: $userMessage';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>