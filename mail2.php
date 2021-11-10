<?php

define('site_key', '6Ld9iwwdAAAAADbumcO4fr1Sj1jh3C0VX-H4793V');
define('secret_key', '6Ld9iwwdAAAAAKMpftdWdSaZRtQFKIhTjhww2I7c');

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
    if ($_POST){
        function getCaptcha($secretKey) {
            $Response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".secret_key."&response={$secret_key}");
            $Return = json_decode($Response);
            return $Return;
        }
            
        $Return = getCaptcha(($_POST['g-recaptcha-response']));
        // var_dump($Return);  

        if ($Return->success == true && $Return->score > 0.5) {
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
            $mail->Body = "<h3>Данные пользоваетеля:</h3> <br> Имя пользователя:  $username,<br>\n email пользователя: $userEmail,<br>\n Сообщение пользователя: $userMessage";
            $mail->AltBody = 'Данные пользоваетеля: Имя пользователя:  $username,\n email пользователя; $userEmail,\n Сообщение пользователя: $userMessage';

            $mail->send();
            echo 'Message has been sent';
        }
        else {
            echo ('you are robot');
        }
    }
    //Server settings
   
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

?>